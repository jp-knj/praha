# データベース設計のアンチパターンを学ぶ9

## 課題1
A1. 使うべきではない

Check制約が「疑わしきは罰せず」の原則を採用しており、NULLを許可している列に対する条件を書きやすくするため。

使うべき場合: Check制約の実力は、他の行や他のテーブル、あるいは他の制約との関係を検証するために複雑な式を記述される場合に発揮される。
Check制約の内容:いかなる国も１０本以上の作品は輸出できないというルールがある
Check制約の注意点:何が悪くてエラーになったのかを明確に切り分けられるようにするには、単純な制約を複数記述する方が良い！
### 構文
```
CRAETE TABLE ExportMovies
(movie_title CHAR(25) NOT NULL,
country_code CHAR(2), NOT NULL,
sales_amt    DECIMAL(12, 5) NOT NULL,
    PRIMARY KEY (movie_title, country_code)
    CONSTRAINT National_Quota
        CHECK(
            10 > ALL (SELECT COUNT(movie_title)
                        FROM Exported_Moviews AS E1
                       GROUP BY E1.country_code))
```


> **CHECK制約について**  
> CHECK制約はテーブルの値が論理式を満たすかテストする.
> 検索条件がFALSEを返すような行を拒否する。(unknownやtrueの場合は、、行を受け付ける)
> 
> CHECK 制約は、INSERT, UPDATE, REPLACE, LOAD DATA および LOAD XML ステートメントに対して評価され、制約が FALSE と評価されるとエラーが発生します。 エラーが発生した場合、すでに適用されている変更の処理は、厳密な SQL モード で説明されているように、トランザクションストレージエンジンと非トランザクションストレージエンジンで異なり、厳密な SQL モードが有効になっているかどうかによっても異なります。
> 参考: [MySQLの公式ドキュメント](https://dev.mysql.com/doc/refman/8.0/ja/create-table-check-constraints.html)

A.2 はい
参照整合制約に対して、トリガーを使用する利点は参照整合制約ではできないようなことも自在にできるため。

もし、`trigger`を使う時には、コードを注意深くチェックしてパフォーマンスが悪化しないようになるべく単純なコードに留めること

> **Triggerについて**
> CREATE TRIGGERは新しいトリガを作成します。 作成したトリガは指定したテーブル、ビューまたは外部テーブルと関連付けられ、特定のイベントが発生した時に指定した関数function_nameを実行します。
> トリガでは、起動のタイミングとして、行への操作が開始される前（制約条件のチェックとINSERT、UPDATEまたはDELETEが行われる前）、操作が完了した後（制約条件がチェックされ、INSERT、UPDATEまたはDELETEが完了した後）、操作の代わり（ビューにおける挿入、更新、削除の場合）のいずれかを指定することができます。 イベントの前または代わりにトリガが起動する場合、そのトリガは対象行に対する操作を省略したり、（INSERTとUPDATEの操作時のみ）挿入する行を変更したりすることができます。
参考: [Postgresqlの公式ドキュメント](https://www.postgresql.jp/document/9.4/html/sql-createtrigger.html)

A.3 使うべきではない

A.4 同一のCheck制約が複数のカラムに使われている場合、Domainを使った方が良い。
ドメインはスキーマ内で一箇所にしか存在しないため、このドメインから列を定義する場合はいつでも、正しいデータの範囲が設定されていることになるため。

CREATE DOMAIN を使用する場合は E-mailアドレスを格納する列が複数のテーブルで使用されていて、アドレス構文の検証のためすべてが同一のCHECK制約を必要としているような場合など
参考: [Postgresqlの公式ドキュメント](https://www.postgresql.jp/document/9.2/html/sql-createdomain.html)
### 構文
```
<domain definition> ::=
    CREATE DOMAIN <domain name> [AS] <data type>
    [default clause]
    [default constraint]
    [collate clause]
    
<domain constraint> ::=
    [<constraint name definition>]
    <check constraint definition>[<constraint attributes>]
```

## 課題2
アプリケーションではバリデーションやエラーの表示処理を行い、チェックが漏れた場合もデータ不整合を防ぐ保険として制約を追加するのが良さそう。
制約はテーブル単位に設定ができる反面、制約違反時はエラーとして返すためアプリケーション側で適切なエラーメッセージを表示したい場合はエラーコードによってエラーメッセージを制御する必要があるため。

制約のデメリットとして、「データの一時的なメンテナンスがしづらくなる」という点があります。特に外部キー制約を作成すると、いったんテーブルを全削除したいといった場合もエラーとなってしまう

## 課題3
