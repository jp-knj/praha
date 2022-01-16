# データベース設計のアンチパターンを学ぶ4
## 課題1
### デメリット
1. クエリ(SQL)の対象は、ツリー中の階層のみ
SQLを書く際には、JOINの数を固定しなければならない
もし、JOINの数が増えれば列の数も増えることになる

| id | parent_message_id | text           |
|------------|-----------|----------------|
| 1          | null      | type something |
| 2          | 1         | type something |
| 3          | 1         | type something |
| 4          | 3         | type something |
| 5          | 4         | type something |
| 6          | 5         | type something |

**comment_id=1に関係するコメントを全て取得したいとき、2階層目までのクエリ文**
```sql
SELECT
     c1.*, c2.*
FROM
     Comments c1
     LEFT OUTER JOIN Comments c2
     ON c2.parent_id = c1.comment_id    
```


**comment_id=1に関係するコメントを全て取得したいとき、３階層目までのクエリ文**
```sql
SELECT
     c1.*, c2.*, c3.*
FROM
     Comments c1

     LEFT OUTER JOIN Comments c2
     ON c2.parent_id = c1.comment_id    

     LEFT OUTER JOIN Comments c3
     ON c3.parent_id = c2.comment_id  
```

2. 集約関数クエリを利用することができない (COUNT/SUM)
3. ノードの削除が複雑になりがちである 
   - 多くのSQL文を書かなくてはならない
   - 子孫ツリーを削除するためのステップ
     - 全ての子孫を特定するために、複数回クエリを実行する
     - 外部キーの整合性制約を合わせるために、最下層から順番に子孫を削除する必要がある

### ON DELETE CASCADE について
> CASCADE: 親テーブルの行を削除または更新し、子テーブル内の一致する行を自動的に削除または更新します。ON DELETE CASCADE と ON UPDATE CASCADE の両方がサポートされています。2 つのテーブル間で、親テーブルまたは子テーブル内の同じカラムに対して機能する複数の ON UPDATE CASCADE 句を定義しないでください  
参考記事 : [ON DELETE CASCADE について](https://dev.mysql.com/doc/refman/5.6/ja/create-table-foreign-keys.html)
 
## 課題2
### 経路列挙(Path Enumeration)
課題のテーブルでは先祖ノード取得の効率が悪いため、`path列`にツリーの上から下の順番で現在の行まで並べたUNIXパスのような文字列を追加する  
./task_01.puml

| id | path   | text           |
|------------|--------|----------------|
| 1          | 1/     | type something |
| 2          | 1/2/   | type something |
| 3          | 1/2/3/ | type something |
| 4          | 1/4/   | type something |
| 5          | 1/4/5  | type something |
| 6          | 1/4/6/ | type something |

**e.g** :`path`が `1/4/6/7/` message6の先祖を取得するには
```sql
SELECT *
FROM Messages AS m
WHERE '1/4/6/' LIKE m.path || '%';
```
#### 経路列挙のデメリット
- VARCHAR列の長さ制限が存在すること
- `path文字列`のメンテナンスに時間がかかる

### 入れ子集合(Neted Set)
サブツリーに対する迅速かつ容易なクエリ実行が重要な場合  
ツリーの検索にむいている

./task_02.puml

| id  | nsleft | nsright | text           |
|-----|--------|---------|----------------|
| 1   | 1      | 14      |type something |
| 2   | 2      | 5       |type something |
| 3   | 3      | 4       |type something |
| 4   | 6      | 13      |type something |
| 5   | 7      | 8       |type something |
| 6   | 9      | 12      |type something |
| 7   | 10     | 11      |type something |

```sql
SELECT m2.*
FROM Messages AS m1
  INNER JOIN Messages as m2
    ON m2.nsleft BETWEEN m1.nsleft AND m1.nsright
WHERE m1.id = 4
```

#### 入れ子集合のデメリット
ノードの挿入が頻繁に求められるツリーでは、入れ子集合向いてない

### 閉包テーブル(Closure Table)
多くの行数が必要になり、計算が楽になる分、スペースが消費される

## 課題3
