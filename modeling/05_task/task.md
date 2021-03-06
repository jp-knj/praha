# データベース設計のアンチパターンを学ぶ５

## 課題1


## 課題2

**履歴データの何が問題になるのか？**
- データの関係性と時間軸の直交性  
  時間によってクエリの実行結果が変わる。同じデータ、同じクエリであっても、時間が違うだけで結果が異なるという点が問題です。
- NULLの可能性
  開始日と終了日を記載することになると予想されるが、設計者の選択では、代わりにNULLになる場合もある。そうすると、先ほどのクエリの検索条件は、「IS NULL」を使ったものに変更しなければいけない・
- 特定の行だけ意味が違う
  end_date がなく、start_date だけしか存在しない場合もあるでしょう。つまり、日付が未来でないもののうち、一番新しい値という場合です。

**履歴データに対する解決策**
- リレーションを分割する
  - 外部キーが使用できない
    - 外部キーは、あるテーブルに行が含まれるを保証する制約ですが、対象となるテーブルは１つではなければならない。
  - ２つのテーブルの整合性
  - 重複した行を許容しなければならない 
- 代理キーを使用する(マスターテーブルを作成)
