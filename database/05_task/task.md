# ビューを使いこなす
## 課題1
### Viewについて
テーブルの特定部分や複数テーブルを結合し、ユーザに必要な部分だけをあたかも一つのテーブルであるかのように見せるための、仮想的なテーブルの概念。

CREATE TABLE文で作成する物理的なテーブルとは異なる、「仮想的なテーブル」のこと。

#### Viewについての用途
ビューの実体は SELECT 文によるクエリを定義。  
ビューにアクセスすると、定義されたクエリが実行され、実テーブルから必要なデータ。  
また、ビューからビューを定義することも可能です。

メリットとして、 あらかじめ毎回入力するのが面倒な複雑なクエリを一度ビューとして定義しておけば、ユーザやプログラムは単純なクエリを実行するだけで良くなる。

このような開発労力の軽減という観点以外に、セキュリティについてもメリットもあります。たとえば、実テーブルのデータの中に一般ユーザには見せたくないものがある場合、実テーブルへのアクセス権限を一般ユーザには与えることはできません。しかし、見せたくないデータを除いたビューを定義することにより、一般ユーザでも実テーブルのデータを利用できるようになります。

**追加・更新・削除できないビューの条件** 
- ビューの定義に集約関数を含む。（集約値なので直接変更できない）
- ビューの定義にGROUP BY句、HAVING句を含む。（同上）
- 複数の表を結合している。（複数表の結合なので直接変更はできない）
- 副問合せで同一の表を参照している。（変更する行を特定できない）
- DISTINCTを利用している。（変更する行を特定できない）
- ビュー定義時にWITH READ ONLYの指定をしている。（読み取り専用

#### マテリアライズド・ビューについて
クエリの結果を事前に計算して保存しておく機能のこと。　　
クエリを再計算することなく、結果にアクセスすることができる。同じクエリを繰り返し計算するよりも高速になる。

簡潔に要約すると、「SQLの実行結果をテーブルのように保持する仕組み」
ビューは参照のたびにSQLの結果を返却するため、複雑な集計処理に関してはマテリアライズド・ビューが圧倒的なパフォーマンスを発揮する。

#### なぜ、マテリアライズドビューか？
集計結果を保持するためのテーブルを作成して、バッチで集計すれば良いのではないでしょうか？

マテリアライズド・ビューは変化点のみの更新だということです。(バッチでも可能ではありますが、過多な判定処理が入ってしまいます。)  

変化点のみに着目した更新が可能になるため、例えば大量のデータの集計処理であっても集計結果を高速に算出できますね。

**参考文献**
- [ビューについて](https://www.techscore.com/tech/sql/SQL9/)
- [マテリアライズド・ビューについて](https://docs.oracle.com/cd/E57425_01/121/REPLN/repmview.htm#BABIIDJC)
- [マテリアライズド・ビューの作成方法について](https://docs.oracle.com/cd/E57425_01/121/SQLRF/statements_6002.htm)

----
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