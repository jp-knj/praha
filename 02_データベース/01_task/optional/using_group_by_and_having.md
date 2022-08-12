# SUM and COUNT
参考 : [リンク](https://sqlzoo.net/wiki/SUM_and_COUNT/ja)

#### 世界の総人口を表示
```sql
SELECT SUM(population)
FROM world
```

#### 大陸名を重複しないように表示
```sql
SELECT DISTINCT continent 
FROM world
```

#### アフリカAfrica の各国のgdpの合計を求める
```sql
SELECT SUM(gdp)
FROM world
WHERE continent = 'Africa'
```

#### 面積が少なくとも 1000000　以上の国の数を求める
```sql
SELECT COUNT(name)
FROM world
WHERE area >= 1000000
```

#### Estonia', 'Latvia', 'Lithuania' の人口合計を求める 
```sql
SELECT SUM(population)
FROM world
WHERE name = 'Estonia' OR name = 'Latvia' OR name = 'Lithuania'
```

#### 各大陸continentごとに大陸名continentとそこの国の数を表示する
##### GROUP BY と HAVING
`GROUP BY 節`で `SUM` や `COUNT` のような集計関数を使うと、それぞれのグループに共通の値になる。 `GROUP BY continent` を指定すると、異なる値の`continent`が1行づつ表示される。 continent以外のすべての列（フィールド）は `SUM` や `COUNT` などの集計関数で1行にまとめる必要がある。  

`HAVING 節`（の条件）は表示するグループを取り除く。  
`WHERE 節`（の条件）は行（レコード）を集計する前に取り除く。  
`HAVING 節`は集計後（の結果を使って）、取り除く。  
`ORDER BY 節`がある場合、該当する場所の列（フィールド）を参照して並べ替える。

```sql
SELECT continent, COUNT(continent)
  FROM world
 GROUP BY continent
```

#### 各大陸の人口が10000000人以上の国を数え、大陸名とその数を表示する
```sql
SELECT continent, COUNT(continent)
 FROM world
 WHERE population> 10000000
 GROUP BY continent
```

