# インデックスを理解する

## 課題１

**インデックスについての説明**
インデックスとは索引のことで、データの検索速度を向上するために、どの行がどこにあるかを示した仕組みのこと。
本に例えると、しおりのような役割をしてくれます。

### slow query log を調べる理由とは
テーブルにインデックスをベタベタと貼りすぎると、挿入、更新、削除といった操作が遅くなる。
これは基底テーブルが変更されたらインデックスも変更しなければならないため、オーバーヘッドになるため。

インデックスが多すぎるとオプティマイザが混乱して、どれを選べばいいのか分からなくなってしまうという弊害がある。

> **slow query log** とは？
> 
> スロークエリログ (Slow query log) は、MySQL で出力できるログの種類の1つです。 SQL の実行時間が指定した時間よりもかかってしまった SQL を全て出力することができます。 これにより、アプリケーション構築時や本番運用時にパフォーマンスのボトルネックとなっている SQL を発見するのに大いに役に立ちます。

### カーディナリティー について
カーディナリティとは、テーブルにカラムがあるとして、カラムに格納されているデータの種類がどのくらいあるのか(カラムの値の種類の絶対値)を、カーディナリティという。

カーディナリティ度が低いとは、カラムの値の種類がレコード数に比べて少ないことをあらわす。

例えば、子供から大人までの場合、性別や血液型などはカーディナリティ度が低い

身長や体重はカーディナリティ度が高い。同じ長さでも、靴のサイズなどはカーディナリティ度が低いといえる。

### カバリングインデックスとは？
クエリが必要とするカラムが全てインデックスに含まれている場合、インデックスだけを読めば良い
(カバリングインデックスの参考Docs)[https://dev.mysql.com/doc/refman/5.6/ja/optimizing-innodb-queries.html]

## 課題２

### 対象のテーブル
```shell
+------------+---------------+------+-----+---------+-------+  
| Field      | Type          | Null | Key | Default | Extra |  
+------------+---------------+------+-----+---------+-------+  
| emp_no     | int(11)       | NO   | PRI | NULL    |       |  
| birth_date | date          | NO   |     | NULL    |       |  
| first_name | varchar(14)   | NO   |     | NULL    |       |  
| last_name  | varchar(16)   | NO   |     | NULL    |       |  
| gender     | enum('M','F') | NO   |     | NULL    |       |  
| hire_date  | date          | NO   |     | NULL    |       |  
+------------+---------------+------+-----+---------+-------+   
```
#### WHERE句を1つだけ含むSELECTクエリを3つほど列挙する
```sql
SELECT * FROM employees WHERE last_name = 'masaki';
```
> 184 rows in set (0.09 sec)

```sql
SELECT * FROM employees WHERE first_name = 'satoru';
```
> 236 rows in set (0.09 sec)

```sql
SELECT * FROM employees WHERE hire_date = 1998-03-13;
```
> Empty set, 1 warning (0.09 sec)

#### クエリを実行して、取得に要した時間を測定する
```sql
SHOW VARIABLES LIKE 'performance_schema';
```

```shell
+--------------------+-------+
| Variable_name      | Value |
+--------------------+-------+
| performance_schema | ON    |
+--------------------+-------+
1 row in set (0.00 sec)
```

> **パフォーマンススキーマ (performance_schema)** とは？
> サーバーパフォーマンスに与える影響を最小にしながら、サーバー実行に関する有益な情報へのアクセスを提供することを目的としています。
参考文献
 - [Mysql](https://dev.mysql.com/doc/refman/5.6/ja/performance-schema.html#:~:text=%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%E3%81%AF%E3%80%81%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%83%91%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%B3%E3%82%B9,%E3%81%AF%E5%A4%89%E6%9B%B4%E3%81%95%E3%82%8C%E3%81%BE%E3%81%9B%E3%82%93%E3%80%82)

#### 高速化するインデックスを作成
```sql
CREATE INDEX employees_name ON 
    employees (last_name, first_name)
```

**実行クエリ**
```sql
SELECT * FROM employees WHERE last_name = 'masaki';
```

**実行結果**
```shell
184 rows in set (0.01 sec)
```

#### EXPLAIN を使用する
```shell
mysql> EXPLAIN SELECT * FROM employees WHERE last_name = 'masaki';
+----+-------------+-----------+------------+------+----------------+----------------+---------+-------+------+----------+-------+
| id | select_type | table     | partitions | type | possible_keys  | key            | key_len | ref   | rows | filtered | Extra |
+----+-------------+-----------+------------+------+----------------+----------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | employees | NULL       | ref  | employees_name | employees_name | 18      | const |  184 |   100.00 | NULL  |
+----+-------------+-----------+------------+------+----------------+----------------+---------+-------+------+----------+-------+
1 row in set, 1 warning (0.00 sec)

```

> **EXPLAIN とは**  
> EXPLAIN ステートメントは、MySQL がステートメントをどのように実行するかに関する情報を提供します。
参考文献
- [Mysql](https://dev.mysql.com/doc/refman/8.0/ja/explain.html)
- 

#### Insert の処理速度を測定する
```shell
mysql> INSERT INTO employees (emp_no, first_name, last_name, birth_date, hire_date) VALUES (500000, 'kenji','tomita', '1915-11-30', '1958-05-01');
Query OK, 1 row affected (0.20 sec)
```

```shell
mysql> show index from employees;
+-----------+------------+----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table     | Non_unique | Key_name       | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+-----------+------------+----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| employees |          0 | PRIMARY        |            1 | emp_no      | A         |      299513 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | employees_name |            1 | last_name   | A         |        1518 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | employees_name |            2 | first_name  | A         |      279014 |     NULL | NULL   |      | BTREE      |         |               |
+-----------+------------+----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
3 rows in set (0.00 sec)
```

```shell
mysql> DROP INDEX `employees_name` ON employees;
Query OK, 0 rows affected (0.07 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

```shell
mysql> INSERT INTO employees (emp_no, first_name, last_name, birth_date, hire_date) VALUES (500001, 'kenji','tomita', '1915-11-30', '1958-05-01');
Query OK, 1 row affected (0.00 sec)
```

**結論**
インデックスを作れば作るほど、INSERTが遅くなる
1つインデックスを作るだけで、非常に大きな違いが生まれます。  
insertのパフォーマンスを最適化するには、 インデックスの数を小さく保つ事が非常に重要です。  
インデックスは注意深くかつ慎重に使い、 かつ、可能な限り冗長なインデックスは使わないようにしましょう。これは、delete文やupdate文を使う際にも同じ事が言えます。  

**理由:** 
1行でもターゲットテーブルの制約に違反すれば、INSERT全体が失敗しロールバックされる。行をターゲットテーブルに挿入する一方で、ワークテーブルの方がトランザクション全体が妥当とみなされるまで、未コミット状態に保っておきます。  
INSERTがコミットされると、ターゲットテーブルの全インデックスが再構築されるため。

**結論**
処理速度に関しては、DELETE文にも同様
インデックスがないと、データベースは削除すべき行を見つけるのにフルテーブルスキャンを 実行しなくてはなりません。つまり、行の削除自体は高速ですが、削除すべき行を見つけるのは非常に遅いという状況になってしまいます。

参考文献
- [show indexについて](https://dev.mysql.com/doc/refman/5.6/ja/show-index.html)
- [drop indexについて](https://dev.mysql.com/doc/refman/5.6/ja/drop-index.html)
- [insert, deleteについて](https://use-the-index-luke.com/ja/sql/dml/insert)

### 課題3 
- 1997年に入社した従業員数
- 1997年に入社した従業員の男女比率
- 20代の従業員の男性の割合

- 給与が平均以上の社員情報を10件取得
```shell
mysql> select employees.emp_no, first_name, last_name, salary from employees
    -> left join salaries on employees.emp_no = salaries.emp_no and to_date='9999-01-01'
    -> where salary >= ( select avg(salary) from salaries )
    -> limit 10;
```

```shell
mysql> select count(case when gender = 'M' THEN 'M' ELSE null END ) as man, count(case when gender = 'F' THEN 'F' ELSE null END ) as woman from employees;
+--------+--------+
| man    | woman  |
+--------+--------+
| 179975 | 120051 |
+--------+--------+
1 row in set, 65535 warnings (0.18 sec)
```