# 複合インデックスを理解する

## 課題1
**結論**
複合インデックスとは、電話帳の順序付けと似ています。 2列からなるインデックスの順序付けは、最初に姓で並べ替え、さらに名前で並べ替えるということをしています。名前だけで電話帳を引くことはできないように、2列のインデックスは、2番目の列だけでの検索はできません。
「姓」だけでは同じデータが重なってしまう場合に「姓」と「名前」の両方を１つのインデクスにしてしまうことにより、効率よく検索できることを狙っています。

**実行**
```sql
CREATE INDEX employees_name ON 
    employees (last_name, first_name)
```
重要なポイント:  
- 複合インデックスを定義する際に考えるべき最も重要なのは、そのインデックスを使えるSQL文ができるだけ多くなるように、列の順番を決めることです。
- 単独で検索条件に利用されるカラムを先頭にする
- 選択性に優れているカラムから順に指定する
- 検索とソートが関係する複合インデックスは『検索のカラム、ソートのカラム』の順にする

> **フルテーブルスキャンとは?**  
> 全表スキャン（フルテーブルスキャン）は、SQLで指定された表の全てのデータにアクセスして、検索条件を満たす行を1行ずつチェックする方法です。 

- 参考文献  
  [複合インデックスについて](https://use-the-index-luke.com/ja/sql/where-clause/the-equals-operator/concatenated-keys)

## 課題2
```shell
mysql> select * from employees where first_name ='Satoru' and last_name ='Fujisaki';
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 203250 | 1954-07-22 | Satoru     | Fujisaki  | M      | 1989-06-27 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.09 sec)


```

```shell
mysql> CREATE INDEX employee_name ON employees (first_name, last_name);
Query OK, 0 rows affected (1.20 sec)
Records: 0  Duplicates: 0  Warnings: 0
```

#### 検索速度
**複合インデックスを使う前:**  
```shell
1 row in set (0.09 sec)
```

**複合インデックスを使った後:**  
```shell
1 row in set (0.00 sec)
```

```shell
mysql> select * from employees where first_name ='Satoru' and last_name ='Fujisaki';
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
| 203250 | 1954-07-22 | Satoru     | Fujisaki  | M      | 1989-06-27 |
+--------+------------+------------+-----------+--------+------------+
1 row in set (0.00 sec)
```

## 課題3