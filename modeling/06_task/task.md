## 答案1
全ての外部キーが文字列連結されて１つのフィールドに格納されていると、クエリを作ることが難しい。
SQL文にパターンマッチが必要する。
式の書き方によっては意図しない一致結果が返される可能性ある。
結合するのに手間がかかる。
集約クエリで開発に時間がかかる。
デバック難しい

## 答案2
交差テーブルを作成する
```
entity "post" as post{ 
 +id : number, 
 title: text, 
 contents: text,
}
```

```
entity "post_tag" as post_tag {
 +id : number,
--
 #post_id: number,
 #tag_id: number,
}
```

```
entity "tag" as tag { 
 +id : number, 
 name: text,
}
```

## 答案3
どんなサービスを開発している時に上記のようなアンチパターンに陥りそうでしょうか？
例：CMSを開発していると仮定する
- 多対多の関係性をがあった場合、発生しそう
// @Todo add example