# スロークエリを理解する

## 課題1
**スロークエリの有効化**
```shell
mysql> show variables like 'slow%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_launch_time    | 2                                    |
| slow_query_log      | OFF                                  |
| slow_query_log_file | /var/lib/mysql/eb345bc8ec33-slow.log |
+---------------------+--------------------------------------+
3 rows in set (0.03 sec)
``` 

```shell
mysql> set global slow_query_log = ON;
Query OK, 0 rows affected (0.07 sec)
```

```shell
mysql> show variables like 'slow%';
+---------------------+--------------------------------------+
| Variable_name       | Value                                |
+---------------------+--------------------------------------+
| slow_launch_time    | 2                                    |
| slow_query_log      | ON                                   |
| slow_query_log_file | /var/lib/mysql/eb345bc8ec33-slow.log |
+---------------------+--------------------------------------+
3 rows in set (0.00 sec)
```


```shell
mysql> show variables like 'long%';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+
1 row in set (0.01 sec)

mysql> set global long_query_time = 0.1;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like 'long%';
+-----------------+-----------+
| Variable_name   | Value     |
+-----------------+-----------+
| long_query_time | 10.000000 |
+-----------------+-----------+
1 row in set (0.01 sec)


```

**スロークエリのログ**
```shell
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
# Time: 2022-02-12T07:20:59.085352Z
# User@Host: root[root] @ localhost []  Id:    14
# Query_time: 0.148537  Lock_time: 0.003579 Rows_sent: 1  Rows_examined: 300039
use employees;
SET timestamp=1644650459;
SELECT DATE_FORMAT(hire_date, '%M') AS month, COUNT(*) AS total_hires
FROM employees
GROUP BY month
ORDER BY total_hires DESC
LIMIT 1;
# Time: 2022-02-12T07:21:15.930603Z
# User@Host: root[root] @ localhost []  Id:    14
# Query_time: 0.147523  Lock_time: 0.000268 Rows_sent: 1  Rows_examined: 300039

SET timestamp=1644650475;
SELECT DATE_FORMAT(hire_date, '%M') AS month, COUNT(*) AS total_hires FROM employees GROUP BY month ORDER BY total_hires DESC LIMIT 1;
# Time: 2022-02-12T07:21:17.084699Z
# User@Host: root[root] @ localhost []  Id:    14
# Query_time: 0.146814  Lock_time: 0.000172 Rows_sent: 1  Rows_examined: 300039
SET timestamp=1644650477;
SELECT DATE_FORMAT(hire_date, '%M') AS month, COUNT(*) AS total_hires FROM employees GROUP BY month ORDER BY total_hires DESC LIMIT 1;
```
参考文献
- [long_query_timerについて](https://dev.mysql.com/doc/refman/5.6/ja/server-system-variables.html#sysvar_long_query_time)
## 課題2

```shell
mysqldumpslow -s ct // 最も頻度高くスロークエリに現れるクエリ

mysqldumpslow -s t // 実行時間が最も長いクエリ

mysqldumpslow -s lt // ロック時間が最も長いクエリ
```

参考文献
- [mysqldumpslowについて](https://dev.mysql.com/doc/refman/8.0/en/mysqldumpslow.html)
- [オプションについて(-t, -s)](https://dev.mysql.com/doc/refman/8.0/en/mysqldumpslow.html#option_mysqldumpslow_sort)
## 課題3

## 課題4
**limitについて**
```shell
mysql> select * from hoge order by id desc limit 100, 10;
```
「データを100から10個だけ取得」ではなく「110個データを取得してから先頭から100個を捨てる」という処理が行われるため。

もしかしたらら、Where句で`between`を使用して実行すると処理速度が上がるかも？

**ONとJOINについて**
結論から、全て同じ結果が表示される

JOIN する前に、データ取得するのが、ON 
JOIN　した後に、データ取得するのが　WHERE になる。

SQL言語によって依存されるため、実際に実行して書き換えて方が良い。
```shell
SELECT *
FROM facebook
JOIN linkedin
ON facebook.name = linkedin.name
```
```shell
SELECT *
FROM facebook
JOIN linkedin
WHERE facebook.name = linkedin.name
```
```shell
SELECT *
FROM facebook, linkedin
WHERE facebook.name = linkedin.name
```

**left outter joinの場合の ON vs WHERE**
1. documents

| id  | name      |     
|:----|:----------|
| 1   | Document1 |  
| 2   | Document2 |  
| 3   | Document3 |  
| 4   | Document4 |  
| 5   | Document5 |  

2. downloads

| id  | document_id | username   |   
|:----|:------------|:-----------|
| 1   | 1           | sandeep    | 
| 2   | 1           | simi       | 
| 3   | 2           | sandeep    | 
| 4   | 2           | reya       | 
| 5   | 3           | simi       | 

- WHEREを使用した場合: (JOINした後、Recordをフィルタリングする)
```shell
   SELECT documents.name, downloads.id
     FROM documents
     LEFT OUTER JOIN downloads
       ON documents.id = downloads.document_id
     WHERE username = 'sandeep'
```

JOINされたテーブル

| id(from documents) | name      | id(from downloads) | document_id | username |   
|:-------------------|:----------|:-------------------|:------------|:---------|
| 1                  | Document1 | 1                  | 1           | sandeep  |
| 1                  | Document1 | 2                  | 1           | simi     |
| 2                  | Document2 | 3                  | 2           | sandeep  |
| 2                  | Document2 | 4                  | 2           | reya     |
| 3                  | Document3 | 5                  | 3           | simi     |
| 4                  | Document4 | NULL               | NULL        | NULL     |
| 5                  | Document5 | NULL               | NULL        | NULL     |

**実行結果:**

| name      | id  |    
|:----------|:----|
| Document1 | 1   |
| Document2 | 3   |

- ONを使用した場合: (JOINする前、Recordをフィルタリングする)
```shell
  SELECT documents.name, downloads.id
   FROM documents
     LEFT OUTER JOIN downloads
       ON documents.id = downloads.document_id
         AND username = 'sandeep'
```

JOINされたテーブル

| id(from documents) | name      | id(from downloads) | document_id | username |   
|:-------------------|:----------|:-------------------|:------------|:---------|
| 1                  | Document1 | 1                  | 1           | sandeep  |
| 2                  | Document2 | 3                  | 2           | sandeep  |
| 3                  | Document3 | NULL               | 2           | sandeep  |
| 4                  | Document4 | NULL               | 2           | sandeep  |
| 5                  | Document5 | NULL               | 2           | sandeep  |

**実行結果:**

| name      | id   |    
|:----------|:-----|
| Document1 | 1    |
| Document2 | 3    |
| Document3 | NULL |
| Document4 | NULL |
| Document5 | NULL |

**参考文献**
- [JOIN WHERE VS JOIN ON](https://stackoverflo~.com/questions/354070/sql-join-~here-clause-vs-on-clause)
## 課題5
**offsetとlimit**

> **オフセット**とは？
> 検索エンジンでも、大きな結果セットに対して大きなオフセットを指定することは、かなりリソースを消費するクエリとなる。したがって、「最後のページへ」のようなページネーションは避けた方が良い。

offset	何件目から取得するか?
page	何ページ目から取得するか?　(offsetと排他的)
limit	何件取得するか?

検索エンジンでも、大きな結果セットに対して大きなオフセットを指定することは、かなりリソースを消費するクエリとなる。したがって、「最後のページへ」のようなページネーションは避けた方が良い。
```shell
SELECT * FROM employees LIMIT 10 OFFSET 100
```
基本はオフセットベースで実装することになるが、カーソルベースの方が性能的には有利なので、カーソルベースページネーションにできないかは常に検討する。


TwitterやFacebookのような更新データの多いタイムライン表示で、オフセットベースだとページ切り替えのときに検索結果が変わってしまうものに関しては、カーソルベースのページネーションがよく使われる。無限スクロール(infinite scroll)との相性もよい。

**ただし、以下の制限がある**
- 特定のページ番号へのダイレクトリンクはできない。
- 「前へ」「次へ」のリンクのみ
- カーソルの指し示すデータが削除されると、ページングはできなくなる(カーソルがWHERE句に入るため)。

> **カーソルベースとは？**  
> 時系列など、一定の軸でソート可能なIDを発行したデータについて、そのIDをキーとして検索する。


**参考文献**
- [オフセットについて](https://use-the-index-luke.com/no-offset)
- [ページネーションのクエリ](https://www.citusdata.com/blog/2016/03/30/five-ways-to-paginate/)
- [ページネーションについて](https://scrapbox.io/kawasima/%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

## 課題6
