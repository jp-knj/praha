# SQL10本ノック

## 課題1
### 96年に3回以上注文した（Ordersが3つ以上紐づいている）Customerのidと、注文回数

```sql
SELECT 
    CustomerID, 
    COUNT(CustomerID) AS number_of_orders 
FROM [Orders]
 WHERE OrderDate BETWEEN '1996-01-01' AND '1996-12-31'
       GROUP BY CustomerID
       HAVING number_of_orders >= 3
       ORDER BY number_of_orders DESC
```

### 過去、最も多くのOrderDetailが紐づいたOrderを取得してください。何個OrderDetailが紐づいていたでしょうか？

```sql
SELECT
  Temp.OrderID, 
  MAX(Temp.numberOfOrderDetail) AS OrderDetailCount
FROM
  (SELECT
    O.OrderID,
    COUNT(D.OrderDetailID) AS numberOfOrderDetail
  FROM
    [Orders] AS O
    JOIN OrderDetails AS D
      ON O.OrderID = D.OrderID
  GROUP BY O.OrderID) AS Temp;
```

### 「一番お世話になっている運送会社を教えて欲しい」と頼まれました。過去最も多くのOrderが紐づいたShipperを特定してみてください

```sql
SELECT ShipperID, COUNT(ShipperID) AS ShippingCount
FROM [Orders]
GROUP BY ShipperID 
ORDER BY ShippingCount DESC;
```

### 「重要な市場を把握したい」と頼まれました。売上が高い順番にCountryを並べてみましょう

```sql
SELECT
	ROUND(SUM(OD.Quantity * P.Price)) AS Sales
  , C.Country
FROM
  [Orders] AS O
    JOIN Customers AS C
      ON O.CustomerID = C.CustomerID
    JOIN OrderDetails AS OD
      ON O.OrderID = OD.OrderID
    JOIN Products AS P
      ON OD.ProductID = P.ProductID
GROUP BY C.Country
ORDER BY Sales DESC;
```

### 国ごとの売上を年毎に（1月1日~12月31日の間隔で）集計してください
```sql
SELECT
	ROUND(SUM(OD.Quantity * P.Price)) AS Sales,
    strftime('%Y', O.OrderDate) AS OrderYear,
    C.Country
FROM
	[Orders] AS O
    JOIN Customers AS C
    	ON O.CustomerID = C.CustomerID
    JOIN OrderDetails AS OD
    	ON O.OrderID = OD.OrderID
    JOIN Products AS P
    	ON OD.ProductID = P.ProductID
    GROUP BY C.Country
    ORDER BY C.Country ASC;
```

> `strftime関数` は日付のフォーマットを指定することができます。
> フォーマットの指定は任意の文字と下記の特殊な文字を組み合わせて指定します。  
> **e.g**   
> date(...)        strftime('%Y-%m-%d', ...)  
> time(...)        strftime('%H:%M:%S', ...)  
> datetime(...)    strftime('%Y-%m-%d %H:%M:%S', ...)  
> julianday(...)   strftime('%J', ...)

### 「社内の福利厚生の規定が変わったので、年齢が一定以下の社員には、それとわかるようにフラグを立てて欲しい」と頼まれました
- Employeeテーブルに「Junior（若手）」カラム（boolean）を追加して、若手に分類されるEmployeeレコードの場合はtrueにしてください
- Juniorの定義：誕生日が1960年より後のEmployeeの場合は値をTRUEにする更新クエリを作成してください
```sql
ALTER TABLE Employees ADD Junior Boolean DEFAULT false NOT NULL;
```

```sql
UPDATE Employees SET Junior = 1 WHERE BirthDate > '1960-01-01';
```

```sql
SELECT * FROM Employees
```


### 「長くお世話になった運送会社には運送コストを多く払うことになったので、たくさん運送をお願いしている業者を特定して欲しい」と頼まれました
「long_relation」カラム（boolean）をShipperテーブルに追加してください
long_relationがtrueになるべきShipperレコードを特定して、long_relationをtrueにしてください
long_relationの定義：これまでに70回以上、Orderに関わったShipper（つまり発注を受けて運搬作業を実施した運送会社）

```sql
ALTER TABLE Employees ADD Junior Boolean DEFAULT false NOT NULL;
```

```sql
UPDATE Shipper SET LongRelation = true
WHERE 
    ShipperID
(SELECT
  ShipperID
  , COUNT(ShipperID) AS ShippingCount
FROM
  Orders
GROUP BY ShipperID
HAVING ShippingCount >= 70);
```



### 「それぞれのEmployeeが最後に担当したOrderと、その日付を取得してほしい」と頼まれました
- OrderID, EmployeeID, 最も新しいOrderDate
- 上記のような情報が得られるクエリを描いてください
ヒント：何らかのaggregate function（集約関数）を使う必要があるでしょう

```sql
SELECT 
    EmployeeID, 
    MAX(OrderDate) AS LatestOrderDate
FROM [Orders]
GROUP BY EmployeeID 
ORDER BY EmployeeID ASC;
```

### Customerテーブルで任意の１レコードのCustomerNameをNULLにしてください
- Customerテーブルで任意の１レコードのCustomerNameをNULLにしてください
```sql
    UPDATE Customers SET CustomerName = null WHERE CustomerID = 1;
    SELECT * FROM Customers
```

- CustomerNameが存在するユーザを取得するクエリを作成してください
```sql
    SELECT * FROM Customers WHERE CustomerName IS NOT NULL;
```

- CustomerNameが存在しない（NULLの）ユーザを取得するクエリを変えてください
```sql
    SELECT * FROM Customers WHERE CustomerName IS NULL; 
```

- これでは期待した結果は得られません。なぜでしょうか？
```sql
    SELECT * FROM Customers WHERE CustomerName = NULL;
```
式が NULL か 非NULLかを調べるゆういつの方法が`IS NULL`という述語のため

### EmployeeId=1の従業員のレコードを、Employeeテーブルから削除してください
- EmployeeId = 1 の従業員のレコードを、Employee テーブルから削除する。
```sql
    DELETE FROM Employees WHERE EmployeeID = 1;
```

- （削除された）EmloyeeId=1が担当したOrdersを表示しないクエリを書いてください
```sql
SELECT
  O.OrderID, 
  O.CustomerID,
  O.EmployeeID,
  O.OrderDate,
  O.ShipperID
FROM
  Orders AS O
    INNER JOIN Employees AS E
      ON O.EmployeeID = E.EmployeeID;
```

- (削除された)EmloyeeId=1 が担当した Orders を表示する版
```sql
SELECT
  O.OrderID, 
  O.CustomerID,
  E.EmployeeID,
  O.OrderDate,
  O.ShipperID
FROM
  Orders AS O
    LEFT JOIN Employees AS E
      ON O.EmployeeID = E.EmployeeID
WHERE
  E.EmployeeID IS NULL;
```

## 課題2


## 課題3
