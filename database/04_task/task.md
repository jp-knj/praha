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

## 課題3

## 課題4

## 課題5

## 課題6
