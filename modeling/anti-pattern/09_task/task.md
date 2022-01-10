# データベース設計のアンチパターンを学ぶ9

## 課題1
A1. はい
もし、E-mailアドレスを格納する列が複数のテーブルで使用されていて、アドレス構文の検証のためすべてが同一のCHECK制約を必要としているような場合は、Create Domainを使用するとよい。

参考: [Postgresqlの公式ドキュメント](https://www.postgresql.jp/document/9.2/html/sql-createdomain.html)

> **CHECK制約について**  
> CHECK制約はテーブルの値が論理式を満たすかテストする.
> 検索条件がFALSEを返すような行を拒否する。(unknownやtrueの場合は、、行を受け付ける)
> 
> CHECK 制約は、INSERT, UPDATE, REPLACE, LOAD DATA および LOAD XML ステートメントに対して評価され、制約が FALSE と評価されるとエラーが発生します。 エラーが発生した場合、すでに適用されている変更の処理は、厳密な SQL モード で説明されているように、トランザクションストレージエンジンと非トランザクションストレージエンジンで異なり、厳密な SQL モードが有効になっているかどうかによっても異なります。
> 参考: [MySQLの公式ドキュメント](https://dev.mysql.com/doc/refman/8.0/ja/create-table-check-constraints.html)

A.2 はい

> **Triggerについて**
> CREATE TRIGGERは新しいトリガを作成します。 作成したトリガは指定したテーブル、ビューまたは外部テーブルと関連付けられ、特定のイベントが発生した時に指定した関数function_nameを実行します。
> トリガでは、起動のタイミングとして、行への操作が開始される前（制約条件のチェックとINSERT、UPDATEまたはDELETEが行われる前）、操作が完了した後（制約条件がチェックされ、INSERT、UPDATEまたはDELETEが完了した後）、操作の代わり（ビューにおける挿入、更新、削除の場合）のいずれかを指定することができます。 イベントの前または代わりにトリガが起動する場合、そのトリガは対象行に対する操作を省略したり、（INSERTとUPDATEの操作時のみ）挿入する行を変更したりすることができます。
参考: [Postgresqlの公式ドキュメント](https://www.postgresql.jp/document/9.4/html/sql-createtrigger.html)

A.3 使うべきではない

A.4 使うべきではない

## 課題2

## 課題3
