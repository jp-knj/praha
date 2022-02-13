# ビューを使いこなす
## 課題1

**ビュー** とは、テーブルの特定部分や複数テーブルを結合し、ユーザに必要な部分だけをあたかも一つのテーブルであるかのように見せるための、仮想的なテーブルの概念です。ビューの実体はデータを持たないSQL文であり、CREATE TABLE文で作成する物理的なテーブルとは異なっている。


**用途:** 
ビューには、アクセス権限を付与・管理することで、ユーザがアクセス可能なデータを一元管理するという、セキュリティ上の目的がある。
**メリット** 
ビューからデータを追加・更新・削除する場合、あたかもテーブルのデータを操作するように記述することができる。

#### 追加・更新・削除できないビューの条件
- ビューの定義に集約関数を含む。（集約値なので直接変更できない）
- ビューの定義にGROUP BY句、HAVING句を含む。（同上）
- 複数の表を結合している。（複数表の結合なので直接変更はできない）
- 副問合せで同一の表を参照している。（変更する行を特定できない）
- DISTINCTを利用している。（変更する行を特定できない）
- ビュー定義時にWITH READ ONLYの指定をしている。（読み取り専用

#### マテリアライズド・ビューとは何か?
マテリアライズド・ビューとは、リレーショナルデータベースで、テーブルからの検索結果であるビューにある程度の永続性を持たせ、参照するごとに再検索しなくてもいいようにしたもの。
あるビューを頻繁に参照する場合に、毎回検索処理を実行しなくて良くなるため性能が向上する。

簡潔に要約すると、「;SQLの実行結果をテーブルのように保持する仕組み」
ビューは参照のたびにSQLの結果を返却するため、複雑な集計処理に関してはマテリアライズド・ビューが圧倒的なパフォーマンスを発揮する。

#### なぜ、マテリアライズドビューか？
集計結果を保持するためのテーブルを作成して、バッチで集計すれば良いのではないでしょうか？

マテリアライズド・ビューは変化点のみの更新だということです。(バッチでも可能ではありますが、過多な判定処理が入ってしまいます。)  

変化点のみに着目した更新が可能になるため、例えば大量のデータの集計処理であっても集計結果を高速に算出できますね。

**参考文献**
- [マテリアライズド・ビューについて](https://docs.oracle.com/cd/E57425_01/121/REPLN/repmview.htm#BABIIDJC)
- [マテリアライズド・ビューの作成方法について](https://docs.oracle.com/cd/E57425_01/121/SQLRF/statements_6002.htm)

## 課題2

#### ビューの作成
```shell
CREATE VIEW employee_salary 
  AS SELECT employees.emp_no, first_name, last_name, salary 
  FROM employees 
    LEFT JOIN salaries on employees.emp_no = salaries.emp_no 
    AND to_date='9999-01-01' 
    WHERE salary >= ( select avg(salary) from salaries ) limit 10;

Query OK, 0 rows affected (0.28 sec)
```
**ビューへの参照結果**
- 1回目
```shell
mysql> SELECT * FROM employee_salary;
+--------+------------+-------------+--------+
| emp_no | first_name | last_name   | salary |
+--------+------------+-------------+--------+
|  10001 | Georgi     | Facello     |  88958 |
|  10002 | Bezalel    | Simmel      |  72527 |
|  10004 | Chirstian  | Koblick     |  74057 |
|  10005 | Kyoichi    | Maliniak    |  94692 |
|  10007 | Tzvetan    | Zielinski   |  88070 |
|  10009 | Sumant     | Peac        |  94409 |
|  10010 | Duangkaew  | Piveteau    |  80324 |
|  10013 | Eberhardt  | Terkki      |  68901 |
|  10016 | Kazuhito   | Cappelletti |  77935 |
|  10017 | Cristinel  | Bouloucos   |  99651 |
+--------+------------+-------------+--------+
10 rows in set (6.08 sec)
```

- 2回目
```shell
mysql> SELECT * FROM employee_salary;                                                                                                                                       
+--------+------------+-------------+--------+
| emp_no | first_name | last_name   | salary |
+--------+------------+-------------+--------+
|  10001 | Georgi     | Facello     |  88958 |
|  10002 | Bezalel    | Simmel      |  72527 |
|  10004 | Chirstian  | Koblick     |  74057 |
|  10005 | Kyoichi    | Maliniak    |  94692 |
|  10007 | Tzvetan    | Zielinski   |  88070 |
|  10009 | Sumant     | Peac        |  94409 |
|  10010 | Duangkaew  | Piveteau    |  80324 |
|  10013 | Eberhardt  | Terkki      |  68901 |
|  10016 | Kazuhito   | Cappelletti |  77935 |
|  10017 | Cristinel  | Bouloucos   |  99651 |
+--------+------------+-------------+--------+
10 rows in set (2.71 sec)
```

**ビューを使用しなかった場合の参照結果**
```shell
mysql> SELECT employees.emp_no, first_name, last_name, salary from employees left join salaries on employees.emp_no = salaries.emp_no and to_date='9999-01-01' where salary >= ( select avg(salary) from salaries ) limit 10;
+--------+------------+-------------+--------+
| emp_no | first_name | last_name   | salary |
+--------+------------+-------------+--------+
|  10001 | Georgi     | Facello     |  88958 |
|  10002 | Bezalel    | Simmel      |  72527 |
|  10004 | Chirstian  | Koblick     |  74057 |
|  10005 | Kyoichi    | Maliniak    |  94692 |
|  10007 | Tzvetan    | Zielinski   |  88070 |
|  10009 | Sumant     | Peac        |  94409 |
|  10010 | Duangkaew  | Piveteau    |  80324 |
|  10013 | Eberhardt  | Terkki      |  68901 |
|  10016 | Kazuhito   | Cappelletti |  77935 |
|  10017 | Cristinel  | Bouloucos   |  99651 |
+--------+------------+-------------+--------+
10 rows in set (3.09 sec)
```

**参考文献**
- [CREATE VIEWについて](https://www.postgresql.jp/document/7.2/reference/sql-createview.html)