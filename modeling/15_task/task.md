# データベースにおけるNULLの扱い

## 課題1
```
NULL = 0        // 実行できない
NULL = NULL     // 実行できない
NULL <> NULL    // 実行できない
NULL AND TRUE   // 実行できない
NULL AND FALSE  // 実行できない
NULL OR TRUE    // 実行できる
```
> =、<、または <> などの算術比較演算子を使用して NULL をテストすることはできません。
> MySQL では、0 や NULL は false を意味し、それ以外はすべて true を意味します。ブール演算のデフォルトの真理値は 1 です。
> NULL は「値がない」ことを意味します。このことは、次に示すように IS [NOT] NULL を使用してとても簡単にテストできます。

参照 sql.png
[NULL 値の操作](https://dev.mysql.com/doc/refman/5.6/ja/working-with-null.html)

## 課題2
詳細: task.png

NULLの一般的な使用法は、現時点で不明な値を表現すること。(将来的には値が判明し、きちんとした値で置き換えられるということ)
NULLはいかなるデータ型にも属さないが、すべてのデータ型の値を置換できるが、NULLに対する算術の基本ルールが伝播する。
NULLが演算の中に含まれると問答無用で結果がNULLになるという原則。

## 課題３
MySQLでORDER BY を実行する場合、NULL値の順序はどうなるでしょうか？