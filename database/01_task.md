# SQL10本ノック

### 96年に3回以上注文した（Ordersが3つ以上紐づいている）Customerのidと、注文回数

```sql
SELECT CustomerID, COUNT(CustomerID) AS number_of_orders 
  FROM [Orders]
 WHERE OrderDate BETWEEN '1996-01-01' AND '1996-12-31'
       GROUP BY CustomerID
       HAVING number_of_orders >= 3
       ORDER BY number_of_orders DESC
```

### 過去、最も多くのOrderDetailが紐づいたOrderを取得してください。何個OrderDetailが紐づいていたでしょうか？

```sql
SELECT
  Temp.OrderID
  , MAX(Temp.numberOfOrderDetail) AS OrderDetailCount
FROM
  (SELECT
    O.OrderID,
    COUNT(D.OrderDetailID) AS numberOfOrderDetail
  FROM
    [Orders] AS O
    LEFT JOIN OrderDetails AS D
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