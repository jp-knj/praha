# データベースにおけるNULLの扱い

## 課題1
概念的には、NULL は「存在しない不明な値」

> =、<、または <> などの算術比較演算子を使用して NULL をテストすることはできません。
> MySQL では、0 や NULL は false を意味し、それ以外はすべて true を意味します。ブール演算のデフォルトの真理値は 1 です。
> NULL は「値がない」ことを意味します。このことは、次に示すように IS [NOT] NULL を使用してとても簡単にテストできます。

参照 sql.png
[NULL 値の操作](https://dev.mysql.com/doc/refman/5.6/ja/working-with-null.html)

## 課題2

## 課題３
MySQLでORDER BY を実行する場合、NULL値の順序はどうなるでしょうか？