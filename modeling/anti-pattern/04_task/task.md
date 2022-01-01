# データベース設計のアンチパターンを学ぶ4
## 課題1
### デメリット
1. クエリ(SQL)の対象は、ツリー中の階層のみ
SQLを書く際には、JOINの数を固定しなければならない
もし、JOINの数が増えれば列の数も増えることになる

| comment_id | parent_id |
|------------|-----------|
| 1          | null      |
| 2          | 1         |
| 3          | 1         |
| 4          | 3         |
| 5          | 4         |
| 6          | 5         |

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

## 課題3
