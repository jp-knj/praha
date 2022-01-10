# データベース設計のアンチパターンを学ぶ5

## 課題1
|       | type    | description   |
|-------|---------|---------------|
| id    | varchar | |
| called | boolean | 電話をかけたらTRUEになる。FALSEの人には電話をかけなければいけない |
| callNote | varchar |電話をかけた時に交わした内容のメモ  |
| metOnce      | boolean | アポで面談したらTRUEになる|
| metAt      | date    |  面談をした日付が入る |
| closed      | boolean       |成約した |
| closedAt      | boolean |成約した日付が入る |

### Q.例えば商談の数が増えたらどうなるでしょうか？
A.NULL値のカラムが非常に増える

### Q.仮に面談を3回実施して、1回目の面談日時を知りたい時はどうすれば良いのでしょうか？
A.metAtに対して,複数列属性をする.
→ 水平パーティショニング

### Q.例えば一度成約した後に解約し、後にまた同じ人が成約したらどうなるでしょうか？ 
A.データの更新をしなければならず、SQL文やアプリケーション側での手間が増える

## 課題2
task.puml
```sql
CREATE TABLE CustomerMeet {
  + id [PK]
  --
  # customer_id [FK]
  meet_at
} PARTITION BY HASH (YEAR(meet_at))
```

## 課題3
- ECサイトを開発していると仮定する
    - 商品に対して発売された年を保持しておきたい