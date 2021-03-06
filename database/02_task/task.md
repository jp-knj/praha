# インデックスを理解する
## 課題１
### インデックスとは？  
インデックスとは、データの検索速度を向上させるために、どの行がどこにあるかを示した索引のことです。  
データを検索するときに、目的のデータが見つかるまですべての行を一行ずつ調べていくよりも、索引を利用して目的の行の場所を見つけてからその行のデータを読み取る方が効率的だという考えにより、非常によく用いられる方法です。

特に大きなテーブルでは、インデックスを用いることにより、大幅にそのパフォーマンスが改善されます。  

**参考文献**
- [B木について](https://qiita.com/kiyodori/items/f66a545a47dc59dd8839)

<details><summary>インデックスの補足説明</summary>

**インデックスの補足説明**  
インデックスには２種類ほどある
- 主インデックス
- 二次インデックス

主キー制約や一意制約を作ると暗黙にインデックスは生成される場合がある。  
二次インデックスは、パフォーマンス改善のために任意の列に付与されるインデックスのこと。

**正規化とインデックス**  
インデックスを効果的に使用するには、DB設計が肝要

***
**カラム数を絞る（正規化)**  
- 最悪のインデックス設計は、1つのテーブルに対して数十の二次インデックスがあること。　　
- インデックスは多ければ、多いほど更新性能が悪化する。さらにディスクスペースも多くなる

**NULLとインデックス**
- NULLの値を検索するのは、物理的には連続した領域をスキャンすることに他ならないため。
- NULLの値を検索するという前提で、NULLの比率が多い場合はそのインデックスを用いた検索は非常に非効率的になる。　　
***
</details>

### slow query log を調べる理由とは
テーブルにインデックスをベタベタと貼りすぎると、挿入、更新、削除といった操作が遅くなる。
これは基底テーブルが変更されたらインデックスも変更しなければならないため、オーバーヘッドになるから。

インデックスが多すぎるとオプティマイザが混乱して、どれを選べばいいのか分からなくなってしまうという弊害がある。

<details><summary>slow query logとは？</summary>

> スロークエリログ (Slow query log) は、MySQL で出力できるログの種類の1つです。 SQL の実行時間が指定した時間よりもかかってしまった SQL を全て出力することができます。 これにより、アプリケーション構築時や本番運用時にパフォーマンスのボトルネックとなっている SQL を発見するのに大いに役に立ちます。

**参考文献**
- [スロークエリログについて](https://dev.mysql.com/doc/refman/5.6/ja/slow-query-log.html)
</details>

### カーディナリティー について
カーディナリティとは、テーブルにカラムがあるとして、カラムに格納されているデータの種類がどのくらいあるのか(カラムの値の種類の絶対値)を、カーディナリティという。

カーディナリティ度が低いとは、カラムの値の種類がレコード数に比べて少ないことをあらわす。

例えば、子供から大人までの場合、性別や血液型などはカーディナリティ度が低い

身長や体重はカーディナリティ度が高い。同じ長さでも、靴のサイズなどはカーディナリティ度が低いといえる。

複数の検索条件に対して最大公約数的に、カーディナリティが高いカラムだけおを含んだインデックスを作る。

### カバリングインデックスとは？
クエリの実行に必要なカラムがあるインデックスにすべて含まれていれば、テーブル本体にアクセスせず、インデックスだけにアクセスすることでクエリを解決することがある。 （インデックスのリーフだけでデータを取得)

<details><summary>調べたこと</summary>

### インデックスが使用される構文
どのようなSQLの構文においてインデックスが利用可能であるかを知っておく必要がある。

***
**WHERE句**  
カラムが等号や不等号で比較されていれば、インデックスで高速化できる可能性がある。

**JOIN句**  
内部表（結合されるほうのテーブル）へのアクセスには、インデックスが使用される。このときの重要なことがJOINの結合条件以外の検索条件です。

**相関サブクエリ**  
JOINの場合と同様で、WHERE句の条件と、サブクエリの双方を考慮したインデックス設計が求められます。
***
</details>

**参考文献**
- [カバリングインデックスについて](https://dev.mysql.com/doc/refman/5.6/ja/optimizing-innodb-queries.html)
## 課題２

<details><summary>実行時間の取得方法</summary>

```shell
-- 履歴を取得
SELECT 
    sql_text, 
    TRUNCATE(timer_wait/1000000000000, 6) as time 
FROM 
    performance_schema.events_statements_history`
;
```

```shell
-- 履歴の最新10件を取得
SELECT 
    event_id, 
    sql_text, 
    TRUNCATE(timer_wait/1000000000000, 6) as time 
FROM performance_schema.events_statements_history 
  ORDERBY event_id 
    DESC limit 10;
```

```shell
-- 履歴を削除 
TRUNCATE TABLE performance_schema.events_statements_history_long;
```

**参考文献**
- [performance schemaについて](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-query-profiling.html)
- [performance shemaの履歴取得について](https://dev.mysql.com/doc/refman/8.0/en/performance-schema-event-tables.html)
- [TRUNCATE TABLE 構文について](https://dev.mysql.com/doc/refman/5.6/ja/truncate-table.html)

</details>

### WHERE句を1つだけ含むSELECTクエリを3つほど列挙する
**クエリ１**
```shell
-- first_nameがXから始まる従業員
SELECT * 
FROM employees 
    WHERE first_name like 'X%';
```

**クエリ2**
```shell
-- last_nameがYから始まる従業員
SELECT * 
FROM employees 
    WHERE last_name like 'Y%';
```

**クエリ3**
```shell
SELECT * 
FROM employees 
  WHERE hire_date = '1997-02-14';
```

###　取得時間の計測
**クエリ１**  

```shell
-- first_name のインデックスを付与
CREATE INDEX first_name_idx ON 
    employees (first_name)
```
<details>
    <summary>インデックスの付与前の実行結果</summary>

```shell
+----------+----------------------------------------------------+----------+
| event_id | sql_text                                           | time     |
+----------+----------------------------------------------------+----------+
|       68 | select * from employees where first_name like 'X%' | 0.095434 |
|       67 | select * from employees where first_name like 'X%' | 0.083297 |
|       66 | select * from employees where first_name like 'X%' | 0.109143 |
+----------+----------------------------------------------------+----------+
```

</details>

<details>
    <summary>インデックスの付与後の実行結果</summary>

```shell
+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+
| event_id | sql_text                                                                                                                                                   | time     |
+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+
|       59 | select * from employees where first_name like 'X%'                                                                                                         | 0.008920 |
|       58 | select * from employees where first_name like 'X%'                                                                                                         | 0.016106 |
|       57 | select * from employees where first_name like 'X%'                                                                                                         | 0.010801 |
+----------+------------------------------------------------------------------------------------------------------------------------------------------------------------+----------+
```

</details>

**結果**  
付与前と付与後を比較した時に、取得時間に**7倍**差がある

<details>
    <summary>EXPAINを使用した結果</summary>

```shell
+----+-------------+-----------+------------+-------+----------------+----------------+---------+------+------+----------+-----------------------+
| id | select_type | table     | partitions | type  | possible_keys  | key            | key_len | ref  | rows | filtered | Extra                 |
+----+-------------+-----------+------------+-------+----------------+----------------+---------+------+------+----------+-----------------------+
|  1 | SIMPLE      | employees | NULL       | range | first_name_idx | first_name_idx | 16      | NULL | 4687 |   100.00 | Using index condition |
+----+-------------+-----------+------------+-------+----------------+----------------+---------+------+------+----------+-----------------------+

```
</details>

**クエリ2**

```shell
-- last_name_idx のインデックスを付与
CREATE INDEX last_name_idx ON 
    employees (last_name)
```
<details>
    <summary>インデックスの付与前の実行結果</summary>

```shell
+----------+---------------------------------------------------+----------+
| event_id | sql_text                                          | time     |
+----------+---------------------------------------------------+----------+
|       73 | select * from employees where last_name like 'Y%' | 0.080488 |
|       72 | select * from employees where last_name like 'Y%' | 0.095190 |
|       71 | select * from employees where last_name like 'Y%' | 0.089395 |
+----------+---------------------------------------------------+----------+

```
</details>

<details>
    <summary>インデックスの付与後の実行結果</summary>

```shell
+----------+---------------------------------------------------+----------+
| event_id | sql_text                                          | time     |
+----------+---------------------------------------------------+----------+
|       80 | select * from employees where last_name like 'Y%' | 0.008937 |
|       79 | select * from employees where last_name like 'Y%' | 0.008336 |
|       78 | select * from employees where last_name like 'Y%' | 0.009638 |
+----------+---------------------------------------------------+----------+

```

</details>

**結果**  
付与前と付与後を比較した時に、取得時間に**10倍**差がある

<details>
    <summary>EXPAINを使用した結果</summary>

```shell
+----+-------------+-----------+------------+-------+---------------+---------------+---------+------+------+----------+-----------------------+
| id | select_type | table     | partitions | type  | possible_keys | key           | key_len | ref  | rows | filtered | Extra                 |
+----+-------------+-----------+------------+-------+---------------+---------------+---------+------+------+----------+-----------------------+
|  1 | SIMPLE      | employees | NULL       | range | last_name_idx | last_name_idx | 18      | NULL | 1782 |   100.00 | Using index condition |
+----+-------------+-----------+------------+-------+---------------+---------------+---------+------+------+----------+-----------------------+

```
</details>

**クエリ3**

```shell
-- hire_date のインデックスを付与
CREATE INDEX hire_date_idx ON 
    employees (hire_date)
```
<details>
    <summary>インデックスの付与前の実行結果</summary>

```shell
+----------+--------------------------------------------------------+----------+
| event_id | sql_text                                               | time     |
+----------+--------------------------------------------------------+----------+
|       89 | select * from employees where hire_date = '1997-02-14' | 0.097270 |
|       88 | select * from employees where hire_date = '1997-02-14' | 0.096131 |
|       87 | select * from employees where hire_date = '1997-02-14' | 0.096195 |
+----------+--------------------------------------------------------+----------+

```
</details>

<details>
    <summary>インデックスの付与後の実行結果</summary>

```shell
+----------+--------------------------------------------------------+----------+
| event_id | sql_text                                               | time     |
+----------+--------------------------------------------------------+----------+
|       94 | select * from employees where hire_date = '1997-02-14' | 0.002089 |
|       93 | select * from employees where hire_date = '1997-02-14' | 0.000993 |
|       92 | select * from employees where hire_date = '1997-02-14' | 0.002603 |
+----------+--------------------------------------------------------+----------+
```

</details>

**結果**  
付与前と付与後を比較した時に、取得時間に**22倍**差がある

<details>
    <summary>EXPAINを使用した結果</summary>

```shell
+----+-------------+-----------+------------+------+---------------+---------------+---------+-------+------+----------+-------+
| id | select_type | table     | partitions | type | possible_keys | key           | key_len | ref   | rows | filtered | Extra |
+----+-------------+-----------+------------+------+---------------+---------------+---------+-------+------+----------+-------+
|  1 | SIMPLE      | employees | NULL       | ref  | hire_date_idx | hire_date_idx | 3       | const |   20 |   100.00 | NULL  |
+----+-------------+-----------+------------+------+---------------+---------------+---------+-------+------+----------+-------+

```
</details>

> **EXPLAIN とは**  
> EXPLAIN ステートメントは、MySQL がステートメントをどのように実行するかに関する情報を提供します。
参考文献
- [explain について](https://dev.mysql.com/doc/refman/8.0/ja/explain.html)

### Insert の処理速度を測定する

<detail>
    <summary>テーブルにインデックスを付与</summary>

```shell
-- 全てのカラムにインデックスを付与
mysql> SHOW KEYS FROM employees;
+-----------+------------+----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table     | Non_unique | Key_name       | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+-----------+------------+----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| employees |          0 | PRIMARY        |            1 | emp_no      | A         |      299512 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | last_name_idx  |            1 | last_name   | A         |        1635 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | hire_date_idx  |            1 | hire_date   | A         |        6075 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | first_name_idx |            1 | first_name  | A         |        1205 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | birth_date_idx |            1 | birth_date  | A         |        4735 |     NULL | NULL   |      | BTREE      |         |               |
+-----------+------------+----------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+

```
</detail>


```shell
-- データを挿入
mysql> INSERT INTO employees (emp_no, first_name, last_name, birth_date, hire_date) VALUES (500002, 'kenji','tomita', '1915-11-30', '1958-05-01');
Query OK, 1 row affected (0.20 sec)
```

```shell
-- インデックス付与後
+----------+--------------------------------------------------------------------------------------------------------------------------------------------+----------+
| event_id | sql_text                                                                                                                                   | time     |
+----------+--------------------------------------------------------------------------------------------------------------------------------------------+----------+
|      114 | INSERT INTO employees (emp_no, first_name, last_name, birth_date, hire_date) VALUES (500002, 'kenji','tomita', '1915-11-30', '1958-05-01') | 0.017870 |
+----------+--------------------------------------------------------------------------------------------------------------------------------------------+----------+

```
```shell
-- インデックス付与前
+----------+--------------------------------------------------------------------------------------------------------------------------------------------+----------+
| event_id | sql_text                                                                                                                                   | time     |
+----------+--------------------------------------------------------------------------------------------------------------------------------------------+----------+
|      123 | INSERT INTO employees (emp_no, first_name, last_name, birth_date, hire_date) VALUES (500003, 'kenji','tomita', '1915-11-30', '1958-05-01') | 0.004350 |
+----------+--------------------------------------------------------------------------------------------------------------------------------------------+----------+

```

**結果**  
付与前と付与後を比較した時に、取得時間に約**4倍**差がある

インデックスを作れば作るほど、INSERTが遅くなる
1つインデックスを作るだけで、非常に大きな違いが生まれます。  
insertのパフォーマンスを最適化するには、 インデックスの数を小さく保つ事が非常に重要です。  
インデックスは注意深くかつ慎重に使い、 かつ、可能な限り冗長なインデックスは使わないようにしましょう。これは、delete文やupdate文を使う際にも同じ事が言えます。  

**理由:**  
1行でもターゲットテーブルの制約に違反すれば、INSERT全体が失敗しロールバックされる。行をターゲットテーブルに挿入する一方で、ワークテーブルの方がトランザクション全体が妥当とみなされるまで、未コミット状態に保っておきます。  
INSERTがコミットされると、ターゲットテーブルの全インデックスが再構築されるため。

**結果**  
処理速度に関しては、DELETE文にも同様
インデックスがないと、データベースは削除すべき行を見つけるのにフルテーブルスキャンを 実行しなくてはなりません。つまり、行の削除自体は高速ですが、削除すべき行を見つけるのは非常に遅いという状況になってしまいます。

### 結論 
インデックスは、データ検索のパフォーマンスを改善するために利用されるモノです。　　
その利用方法が悪い場合、パフォーマンスを悪化させてしまいます。  

**インデックスを使用する時の注意点**
- パフォーマンスの向上
  - テーブルの結合条件に使用される列に対してインデックスを作成するとパフォーマンスが向上する。
  - 異なる値が多い列に対して、インデックスを作成するとパフォーマンスが向上する。

- パフォーマンス低下
  - 異なる値が少ない列に対して、インデックスを作成するとパフォーマンスは低下する。
  - テーブルを更新すると、インデックスも更新される。テーブルが頻繁に更新されるような場合にインデックスを使用するとパフォーマンスは低下する。.

- その他
  - インデックスは表のデータとは別の領域に保存されるので、データベース設計時にはインデックスの領域も見込まなければならない。  
  - インデックスは表のデータに対して作成するモノで、ビューのデータに対しては作成できない。.
  - ビューに対してデータの検索を行う場合は、元のテーブルに作成されたインデックスが利用される。　　


参考文献
- [show indexについて](https://dev.mysql.com/doc/refman/5.6/ja/show-index.html)
- [drop indexについて](https://dev.mysql.com/doc/refman/5.6/ja/drop-index.html)
- [insert, deleteについて](https://use-the-index-luke.com/ja/sql/dml/insert)
- [インデックスについて](https://www.techscore.com/tech/sql/15_01)
- [create indexについて](https://dev.mysql.com/doc/refman/5.6/ja/create-index.html)
- ----
## 課題3 
- もらった合計給与額が最も高い従業員の氏名と合計額を知りたい。
- 給与が平均以上の社員情報を10件取得
- 20代の従業員の男性と女性人の割合

----
<detail>
    <summary>課題外</summary>

### ディスクにおいては、基本的なデータへのアクセス方法がある。

- シーケンシャルアクセス
- ツリーインデックス

**シーケンシャルアクセス**  
テーブルスキャンはテーブルの全データを物理的な格納順序でシーケンシャルに読みだす。
削除された行を物理的にも削除するには、データベースのユーティリティやコマンドを実行するか、定期実行するよう設定する必要がある。  
そのようなデータベースの再構成を行うとフルスキャンの性能が良くなる。

**ツリーインデックス**  
テーブルサイズが大きくなるにつれて、インデックスの木も深くなり、目的のデータを見つけるのに時間がかかるようになる。.

</detail>