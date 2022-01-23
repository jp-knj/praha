# 任意課題

####  ドイツ(Germany)の人口(population)を表示するように修正する。
```sql
SELECT population FROM world
  WHERE name = 'Germany'
```

#### Sweden と Norway と Denmark の国名 name と人口 population を表示する

```sql
SELECT name, population FROM world
  WHERE name IN ('Sweden', 'Norway', 'Denmark');
```

#### 面積が 200,000 ～ 250,000 の国の国名と面積を表示するように修正。
```sql
SELECT name, area FROM world
  WHERE area BETWEEN 200000 AND 250000
```

#### Y で始まる国名を見つける 
```sql
SELECT name FROM world
  WHERE name LIKE 'Y%'
```
#### y で終わる国名を見つける
```sql
SELECT name FROM world
  WHERE name LIKE '%y'
```

#### x を含む国名を見つける
```sql
SELECT name FROM world
  WHERE name LIKE '%x%'
```

#### land で終わる国名を検索する。
```sql
SELECT name FROM world
  WHERE name LIKE '%land'
```

#### C で始まり ia で終わる国を見つける
```sql
SELECT name FROM world
  WHERE name LIKE 'C%ia'
```

#### oo を名前に含む国を見つける
```sql
SELECT name FROM world
  WHERE name LIKE '%oo%'
```

#### a を３つ以上含む国名を見つける
```sql
SELECT name FROM world
  WHERE name LIKE '%a%a%a%'
```

#### "t" を第２文字目に持つ国名を見つける
```sql
SELECT name FROM world
 WHERE name LIKE '_t%'
ORDER BY name
```

#### 複数の"o"が他の２文字で隔てられている国名を見つける
```sql
SELECT name FROM world
 WHERE name LIKE '%o__o%'
```

#### ちょうど４文字の国名を見つける
```sql
SELECT name FROM world
 WHERE name LIKE '____'
```

#### 首都と国名が同じ国を見つける
```sql
SELECT name
FROM world
WHERE name LIKE capital
```

#### 国名 ＋ "City" が首都の国を見つける。
> **concat 関数（結合関数）**  
concat 関数は結合（concatenate）を短縮した関数名です。この関数で２個以上の文字列を結合できます。
```sql
SELECT name
  FROM world
 WHERE capital LIKE '%_City'
```