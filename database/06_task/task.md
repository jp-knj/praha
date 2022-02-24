# トランザクションについて理解する
## 課題1
### デッドロックとは？  
両方のトランザクションがお互いにロックし合う状態になり、どちらのトランザクションも先に進めず行き詰まってしまいます。
***
**具体例** 
- トランザクション１
  - 口座Xをロック
  - 残高Xを読み取る（1,000,000円) 
  - 振り込む金額を引く(1,000,000円 - 100,000円　= 900,000円)
  - 残高Xを記録(900,000円)
- トランザクション２
  - 口座Yをロック
  - 残高Yを読み取る（1,000,000円)
  - 振り込む金額を引く(1,000,000円 - 100,000円　= 900,000円)
  - 残高Yを記録(900,000円)

トランザクション１が口座Xをロックし、次いで、トランザクション２が口座Yをロックしています、その状態でトランザクション１が口座Yをロックしようとすると、既にトランザクション２によってロックされているため、トランザクション１はブロックされますね。今度はトランザクション２が口座Xのロックを試みますが、こちらもすでにロックされているためトランザクション２はブロックされてしまいます。

結果として、両方のトランザクションがお互いにロックし合う状態にあり、どちらのトランザクションも先に進めず行き詰まってしまいます。
***
### デッドロックの解決方法とは？  
デッドロックを検知できれば、両方ともロールバックするのか、片方だけロールバックをするのであれば、どのような基準でロールバックするほうを決定するのか、でしょうか

### トランザクションの分離レベル(ISOLATION LEVEL)とは？
トランザクションがどれだけ互いに独立しているかを示す概念として、トランザクションの分離レベルがある。

| 分離レベル           | 分離性  | ダーティリード | インコンシステントリード | ロストアップデート | 　ファントムリード　 |
|-----------------|------|:-------:|:------------:|:---------:|:----------:| 
| READ-UNCOMMITED | 低い   |    ◯    |      ◯       |     ◯     |     ◯      |
| READ-COMMITTED  | やや低い |    ×    |      ◯       |     ◯     |     ◯      |
| REPEATABLE-READ | やや高い |    ×    |      ×       |     ◯     |     ◯      |
| SERIALIZABLE    | 高い   |    ×    |      ×       |     ×     |     ×      |

***
**ダーティリードとは？**  
まだコミットしていないデータを読み取ることによっては起きる異常

**インコンシステントリードとは?**  
あるトランザクションの実行結果が、別のトランザクションの実行結果に影響を与えてしまうと、トランザクションが読み取ったデータの整合性が取れていない（Inconsistent)状態になること。　　

**ロストアップデートとは？**  
あるトランザクション１が書いたデータと、同じものを別のトランザクション２が更新する場合、トランザクション２はトランザクション１が書いた結果をみて、実行結果が決まります。　　
もしトランザクション２がトランザクション１が更新する前のデータを元に、同じデータを更新すると、トランザクション１によって行われた更新は、消失(lost)してしまうこと。  

**ファントムリードとは？**  
SQLのように範囲検索があるシステムで主に起きる問題
***

### 行レベルのロック、テーブルレベルのロックの相違  

**行レベルロックの利点:**
- 異なるセッションが異なる行にアクセスする場合、ロックの競合は少なくなります。  
- ロールバックする変更が少なくなります。  
- 1つの行を長時間ロックできます。   
***

<details>
    <summary>行レベルロックについて</summary>
行レベルでデータをロックします。行レベルでロックすると、複数のユーザーが同一の表の別の行に同時にアクセスできます。その結果、パフォーマンスが大幅に向上します。  
</details>


**テーブルレベルロックの利点:**
- 必要なメモリーが比較的少なくなります。
- 単一のロックだけが必要であるため、テーブルの大部分に対して使用する場合に高速です。
- データの大部分に対して GROUP BY 操作を頻繁に実行する場合や、テーブル全体を頻繁にスキャンする必要がある場合に高速です。
***
<details>
    <summary>テーブルロックについて</summary>
    ロックされたテーブルは、トランザクションをコミットするか、全体をロールバックするか、またはテーブルをロックする前のセーブポイントにロールバックするまでロックされる。
</details>

**参考文献**  
- [行レベルロックについて](https://docs.oracle.com/cd/E57425_01/121/ZZPRE/GUID-8DC1ED54-9922-416D-9D9C-BF7232973FA4.htm)
- [内部ロックについて](https://dev.mysql.com/doc/refman/5.6/ja/internal-locking.html)  
- [テーブルロックについて](https://docs.oracle.com/cd/E16338_01/server.112/b56299/statements_9015.htm)

### 悲観ロックと楽観ロックの相違
トランザクション処理に密接にかかわってくるのが、「排他制御」という概念です。
共有可能なリソースの整合性を確保するためには、複数からのアクセスがあった場合、1つのアクセスに独占させてほかからは利用できないようにする必要があります。
データベースを例にすると、レコードの参照・挿入・更新・削除処理に際してロックを取り、ほかのプロセスからの参照・変更を防ぐということです。

**楽観ロックについて**  
あるプロセスがデータを更新している間に、ほかのプロセスからも処理が可能です。
しかし、ほかのプロセスからの更新処理は失敗します。このロックは更新処理をする段階で取得されます。  

楽観ロックの場合、複数のユーザーが同じデータを見ることができます。しかし、ほかのユーザーが情報を更新した場合、更新したという通知を受けることはありません。つまり、現在見ているデータが最新であるかどうかは分からないということです。

**悲観ロックについて**  
あるプロセスのデータを更新が終了するまで、ほかのプロセスは処理ができない。
このロックはデータを参照した時点から始まります。　　

悲観ロックの場合、あるユーザーが参照・更新処理を行っている間は、ほかのユーザーは参照も更新もできません。これであれば、いま見ているデータが最新であることは保証されます。しかし、次に処理を行いたい人は先にロックを取得したユーザーの処理が終了するまで待たされることになります。

データベースにおけるロックは、行に対する悲観ロックが初期状態です。
ですが、多人数がアクセスすることが前提の場合、運用が成り立たないことが出てきます。
楽観ロックの場合は、データに対して何かを行うわけではなく、アプリケーションのようなフレームワークでの制御で保証されるものです。

**参考文献**
- [排他制御について](https://atmarkit.itmedia.co.jp/ait/articles/1004/22/news102.html)


## 課題2

### DieryReadを再現するクエリを実装

1. ユーザAの分離レベルを READ UNCOMMITTEDに更新
```shell
mysql> set session transaction isolation level read uncommitted;
Query OK, 0 rows affected (0.00 sec)
```

2. ユーザAの分離レベルが READ COMMITTEDだと確認
```shell
mysql> SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
+-----------------------+------------------+
| @@GLOBAL.tx_isolation | @@tx_isolation   |
+-----------------------+------------------+
| REPEATABLE-READ       | READ-UNCOMMITTED |
+-----------------------+------------------+

1 row in set, 2 warnings (0.00 sec)
```

3. ユーザAで変更されるデータを確認
```shell
mysql> SELECT CONCAT(first_name, '', last_name) as full_name FROM employees WHERE emp_no = 15000;
+--------------+
| full_name    |
+--------------+
| ThanasisBahi |
+--------------+
1 row in set (0.00 sec)

```
4. ユーザBでトランザクションクエリをたたく
`start transaction`を叩くが、`commit`を叩かない
```shell
mysql> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)
```
```shell
mysql> UPDATE employees set first_name = 'Updated', last_name = 'Name'  WHERE emp_no = 15000;
Query OK, 1 row affected (0.02 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

5.ユーザAでデータを確認
ユーザBで`commit`を叩いてはないが、データが更新されるのを確認(Dirty Readを再現)
```shell
mysql> SELECT CONCAT(first_name, '', last_name) as full_name FROM employees WHERE emp_no = 15000;
+-------------+
| full_name   |
+-------------+
| UpdatedName |
+-------------+
1 row in set (0.00 sec)
```

<details>
    <summary>Dirty Readについて</summary>
あるトランザクションによって変更されているコミットを終えていないデータが、他のトランザクションによって読み込まれている状態のこと。
SQL標準で4段階あるトランザクションの分離レベルを最も低い「READ UNCOMMITTED」に設定すると発生する可能性がある。
</details>

### Non-repeatableReadを再現するクエリを実装

1. ユーザAの分離レベルをREAD COMMITTEDに更新 
```shell
mysql> SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
Query OK, 0 rows affected (0.00 sec)

``` 
2. ユーザAの分離レベルが READ COMMITTEDだと確認
```shell
mysql> SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
+-----------------------+----------------+
| @@GLOBAL.tx_isolation | @@tx_isolation |
+-----------------------+----------------+
| REPEATABLE-READ       | READ-COMMITTED |
+-----------------------+----------------+
1 row in set, 2 warnings (0.00 sec)
```

3. ユーザBでトランザクションクエリをたたく  
`start transaction`を叩くが、`commit`を叩かない
```shell
mysql> START TRANSACTION;
Query OK, 0 rows affected (0.00 sec)
```
```shell
mysql> UPDATE employees SET first_name = 'Update', last_name = 'Name' WHERE emp_no = 15002;
Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0
```

4. ユーザAでDirty Readが発生しないことを確認 
```shell
mysql> SELECT CONCAT(first_name, ' ', last_name) as full_name FROM employees WHERE emp_no = 15002;
+---------------+
| full_name     |
+---------------+
| Kristen Rosch |
+---------------+
1 row in set (0.00 sec)

```

5. ユーザBで`COMMIT`をたたく
```shell
mysql> COMMIT;
Query OK, 0 rows affected (0.01 sec)

```

6. ユーザAでデータを確認  
ユーザAで`COMMIT`していないのに、データが更新されているのを確認(Non-repeatable Readを再現)

```shell
mysql> SELECT CONCAT(first_name, ' ', last_name) as full_name FROM employees WHERE emp_no = 15002;
+-------------+
| full_name   |
+-------------+
| Update Name |
+-------------+
1 row in set (0.00 sec)

```
<details>
    <summary>Non repeatable readについて</summary>
同一のトランザクション内で値を複数回読み取ったときに、その結果が異なってしまう現象のことです。
トランザクション分離レベルを Repeatable Read に変更すると、トランザクションが終了するまで共有ロックを取得するため、別のトランザクションは値を更新できなくなります。

ただし、このようにして一貫性についての解決はできるのですが、
同一トランザクション内で同じ値を複数回読み取るのは無駄に通信を発生させているともいえます。
同じ値を読み取るのが 1 回だけになるように設計するのが望ましいでしょう。
そうすれば Repeatable Read を使う必要もなく、Read Committed で十分となります。
</details>

### Phantom Readを再現するクエリを実装
1. ユーザAの分離レベルをREAD COMMITTEDに更新
```shell
mysql> SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
Query OK, 0 rows affected (0.00 sec)
```
2. ユーザAの分離レベルが READ COMMITTEDだと確認
```shell
mysql> SELECT @@GLOBAL.tx_isolation, @@tx_isolation;
+-----------------------+----------------+
| @@GLOBAL.tx_isolation | @@tx_isolation |
+-----------------------+----------------+
| REPEATABLE-READ       | READ-COMMITTED |
+-----------------------+----------------+
1 row in set, 2 warnings (0.00 sec)
```
3. ユーザAで行を追加し、`COMMIT`
```shell
mysql> START TRANSACTION; 
Query OK, 0 rows affected (0.00 sec)
```
```shell
mysql> INSERT employees VALUE(999999, '9999-12-31', 'testFirstName', 'testLastName', 'M', '9999-12-31');

Query OK, 1 row affected (0.00 sec)
```
```shell
mysql> COMMIT; 
Query OK, 0 rows affected (0.00 sec)
```

4. ユーザBでデータの更新があるかを確認（ユーザAのCOMMIT前）
```shell
mysql> SELECT count(*) FROM employees;
+----------+
| count(*) |
+----------+
|   300028 |
+----------+
1 row in set (0.23 sec)
```

5. ユーザBでユーザAが追加した行を読み込まれていることを確認（ファントムリードを再現）
```shell
mysql> SELECT count(*) FROM employees;
+----------+
| count(*) |
+----------+
|   300029 |
+----------+
1 row in set (0.06 sec)
```
<details>
        <summary>Phantom Readについて</summary>
あるトランザクションが読み出しを複数回行うと、その間に他のトランザクションが追加したデータが増えてしまう状態のこと。
トランザクション分離レベルとして最も高い “SERIALIZABLE”（直列化可能）を指定する必要があるが、その分だけ性能は低くなるため、処理の特性やコストなどとの兼ね合いで完全に防ぐ必要があるか判断することになる。
</details>


**参考文献**
- [ファントムリードについて](https://e-words.jp/w/%E3%83%95%E3%82%A1%E3%83%B3%E3%83%88%E3%83%A0%E3%83%AA%E3%83%BC%E3%83%89.html)
- [SET TRANSACTIONについて](https://dev.mysql.com/doc/refman/5.6/ja/set-transaction.html)