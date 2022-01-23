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

```