# 複合インデックスを理解する

## 課題1
複合インデックスとは、電話帳の順序付けと似ています。
2列からなるインデックスの順序付けは、最初に姓で並べ替え、さらに名前で並べ替えるということをしています。  
名前だけで電話帳を引くことはできないように、2列のインデックスは、2番目の列だけでの検索はできません。  
「姓」だけでは同じデータが重なってしまう場合に「姓」と「名前」の両方を１つのインデクスにしてしまうことにより、効率よく検索できることを狙っています。  

**実行**¥
```sql
CREATE INDEX employees_name ON 
    employees (last_name, first_name)
```
**結論** 
複合インデックスを定義する際に考えるべき最も重要なのは、そのインデックスを使えるSQL文ができるだけ多くなるように、列の順番を決めることです。
> **フルテーブルスキャンとは?**  
> 全表スキャン（フルテーブルスキャン）は、SQLで指定された表の全てのデータにアクセスして、検索条件を満たす行を1行ずつチェックする方法です。 

参考文献  
- [複合インデックスについて](https://use-the-index-luke.com/ja/sql/where-clause/the-equals-operator/concatenated-keys)

## 課題2

#### WHERE句を2つ含むSELECTクエリを3つほど列挙する

```shell
select * from employees 
where (first_name, last_name) in (('Georgi','Peris'), ('Mary','Sluis'));

+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
|  10011 | 1953-11-07 | Mary       | Sluis     | F      | 1990-01-22 |
|  16672 | 1955-04-25 | Georgi     | Peris     | M      | 1986-03-13 |
+--------+------------+------------+-----------+--------+------------+
2 rows in set (0.12 sec)

```

```shell
mysql> select emp_no, first_name, last_name from employees where first_name='Georgi' or first_name='Mary' ;

477 rows in set (0.09 sec)
```

```shell
SELECT * 
  FROM employees 
  WHERE first_name 
    IN (
      SELECT last_name 
        FROM employees 
        WHERE first_name = 'Georgi'
      );

1167 rows in set (0.23 sec)
```
**実行結果**
```shell
1167 rows in set (0.20 sec)
```

**EXPLAIN**
```shell
+----+--------------+-------------+------------+--------+----------------+----------------+---------+--------------------------------+--------+----------+--------------------------+
| id | select_type  | table       | partitions | type   | possible_keys  | key            | key_len | ref                            | rows   | filtered | Extra                    |
+----+--------------+-------------+------------+--------+----------------+----------------+---------+--------------------------------+--------+----------+--------------------------+
|  1 | SIMPLE       | employees   | NULL       | ALL    | NULL           | NULL           | NULL    | NULL                           | 299513 |   100.00 | Using where              |
|  1 | SIMPLE       | <subquery2> | NULL       | eq_ref | <auto_key>     | <auto_key>     | 18      | employees.employees.first_name |      1 |   100.00 | Using where              |
|  2 | MATERIALIZED | employees   | NULL       | index  | employees_name | employees_name | 34      | NULL                           | 299513 |    10.00 | Using where; Using index |
+----+--------------+-------------+------------+--------+----------------+----------------+---------+--------------------------------+--------+----------+--------------------------+
3 rows in set, 1 warning (0.01 sec)

```
## 課題3
1997年までの最高給与額と従業員の名前と姓



