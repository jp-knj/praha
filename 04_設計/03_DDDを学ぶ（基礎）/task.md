# DDDを学ぶ（基礎） 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/rec7UTLVNAdjzu2sQ?blocks=hide)

## 課題１
<details>
    <summary>エンティティとは？</summary>
    <p>エンティティとは、データベースに格納されるデータのことです。</p>
    <p>エンティティ」とは一意なものを表現する概念。一意であるため、長期にわたって変化できるオブジェクトとなります。</p>
    <p>エンティティの例として「社員」というモデルを挙げる。</p>
    <p>社員の「山田」は識別子（社員番号）は`123` だとする。同じ名前である社員「山田」が入社しても、識別子(社員番号)が異なっていたら全くの別の人物になる。</p>
</details>

<details>
    <summary>値オブジェクト（バリューオブジェクト）とは？</summary>
    <p>値オブジェクトとは、エンティティに格納される値のことです。</p>
    <p>「値オブジェクト」は何かを計測したり、定量化したりして説明する際に使用するオブジェクト。</p>
    <p>数字／文字列／日付をはじめ、姓／名／金額／色といった「ユビキタス言語」を表現するために活用します。例えば、電話番号を数値型（Int型）ではなくPhoneNumber型を作ることで、ドメインの業務をプログラムでわかりやすく示すことができます。</p>
    <p>「エンティティ」とは対照的に「一意に識別して変更を管理する必要がないモノ」を値オブジェクトとします。適切に設計していれば、値を想定外に書き換えられてしまうリスクが無いため安心して開発できます。そのため、使いやすくテストしやすいメリットがあります。保守性や可読性に優れているため、DDDでは積極的に使用することが推奨</p>
    <ul>
        <h3>値オブジェクトの特徴</h3>
        <li>1.計測／定量化／説明:ドメイン内の何かを計測したり定量化したり説明</li>
        <li>2.不変性:状態を不変に保つことができる</li>
        <li>3.概念的な統一体:関連する属性を不可欠な単位として組み合わせることで、概念的な統一体を形成する</li>
        <li>4.交換可能性:計測値や説明が変わったときには、全体を完全に置き換えられる</li>
        <li>5.等価性:値が等しいかどうかを、他と比較できる</li>
        <li>6.副作用のない振る舞い:協力関係にあるその他の概念に「副作用のない振る舞い」を提供する</li>
    </ul>
</details>

<details>
    <summary>集約とは？</summary>
    <p>集約とは、エンティティに格納される値を集約したもののこと。もしくは「必ず守りたい強い整合性を持ったオブジェクトのまとまり」のこと</p>
    <p>集約（Aggregates）とは、オブジェクトのまとまりを表し、整合性を保ちながらデータを更新する単位となります。通常はオブジェクトの集まりの「境界線」の意味で使われ、オブジェクト群の生成／読み込み／変更／保存といったライフサイクル管理が行われます。</p>
</details>

<details>
    <summary>ユビキタス言語とは？</summary>
    <p>「ユビキタス言語」とはドメインエキスパートや開発者を含めたチーム全体で作り上げる共有言語</p>
</details>

<details>
    <summary>境界づけられたコンテキストとは？</summary>
    <p>ドメインの課題を解決する部分を「境界づけられたコンテキスト」と呼びます。IDDDでは、1つの「コアドメイン（もしくはサブドメイン）」に、1つの「境界づけられたコンテキスト」が対応している状態が最適だとされている。</p>
    <ul>
        <li>ドメインに登場する用語について名称とアクションを記載する（正式なUMLにこだわると議論が進まなくなるのでフリーフォーマットで記載する）。</li>
        <li>ユビキタス言語選定のために「用語集」を作成する。用語の候補と採用／却下理由を記載する。さらに用語の定義を書くことで、ドメインに関連する用語を見つけられる。</li>
        <li>用語集の作成が困難な場合は、すでに存在しているドキュメントを集めてきて、重要な用語やフレーズを取り出す。</li>
    </ul>
</details>

<details>
    <summary>ドメインとは？</summary>
    広義のドメインには「分析対象となる問題領域」と「事業課題の改善に取り組む解決領域」が含まれています。そして、分析対象となる問題領域が「ドメイン」です。
</details>

<details>
    <summary>ドメインサービスとは？</summary>
    <p>エンティティや値オブジェクトの責務ではないドメインモデルのロジック</p>
    <p>ドメインモデルが扱う「粒度の細かい処理」を担うものです。その処理がエンティティ（5章）／値オブジェクト（6章）／集約（10章）でもない場合に、ドメインサービスとして実装します。そのため、ドメインサービスはユビキタス言語として表現されます。</p>
</details>

<details>
    <summary>リポジトリとは？</summary>
    <p>「リポジトリ」とはデータの「保管庫」を表します。</p>
    <p>エンティティや値オブジェクトから構成される集約の格納と取得を担当します。リポジトリは、クライアントへ集約を提供し、背後のデータベースとのやり取りを隠ぺい</p>
</details>

<details>
    <summary>アプリケーションとは？</summary>
    <p>「アプリケーション」とは、広義の意味では「システム」全体のこと</p>
    <p>ドメインモデルを使用するクライアントである「ユーザーインターフェイス層」「アプリケーション層」についてのこと</p>
    <p>アプリケーションサービスの責務は、タスクの調整であり、ユースケースのイベントフローごとにメソッドを提供します。アプリケーションサービスはあくまで調整役のため、薄い処理を行うだけのレイヤーとなります。</p>
</details>

<details>
    <summary>CQS/CQRSとは？</summary>
    <p>CQRS(Command Query Responsibility Segregation: コマンドクエリ責務分離) とは、「参照に使用するモデルと更新に使用するモデルを 分離する」というアーキテクチャのこと</p>
    
</details>

<details>
    <summary>DTOとは？</summary>
    <p>DTO(Data Transfer Object: データ転送オブジェクト) とは、複数の集約データを取得して詰め替えた値を持つ入れ物のこと</p>
</details>

## 課題２
### 境界づけられたコンテキストの実例
 ECサイトで商品を販売するシステムを考えてみる。
- 販売コンテキスト （エンジニアと販売部）の場合
  - 商品
    - 商品名
    - 売値
    - 在庫数
- 配送コンテキスト （エンジニアと配送部）の場合
  - 商品
    - 商品名
    - 配送先
    - 配送状況

各境界づけられたコンテキスト内では、関係者の中で
「商品」は必ず同じモデル、用語で統一されている。

### 「Human」エンティティを作成
- id
- 血液型
- 生年月日
- 名前

### 「Human」エンティティの値オブジェクトを作成
`/human/ValueObjects/BloodType.ts`
```typescript
export interface BloodTypeProps {
    value: string;
}

export class BloodType extends ValueObject<BloodTypeProps> {
  get value(): string {
    return this.props.value;
  }
  
  private constructor(props: BloodTypeProps) {
    super(props);
  }
  
  private static isValid(value: string): boolean {
    return value === 'A' || value === 'B' || value === 'AB' || value === 'O';
  }
  
  private static create(value: string): BloodType {
    if (!BloodType.isValid(value)) {
      throw new Error(`Invalid BloodType: ${value}`);
    }
    return new BloodType({ value });
  }
}
```
`/human/ValueObjects/BirthDate.ts`
```typescript
interface BirthDate {
    year: number;
    month: number;
    day: number;
}
export interface BirthDateProps {
  value: BirthDate;
}

export class BirthDate extends ValueObject<BirthDateProps> {
    get value(): Date {
        return this.props.value;
    }
    
    private constructor(props: BirthDateProps) {
        super(props);
    }
    
    private static isValid(value: Date): boolean {
      
    }
    
    public static create(date: Date): Result<BirthDate> {
      if (!BirthDate.isValid(date)) {
        return Result.failure(`Invalid BirthDate: ${date}`);
      }
        return Result.success(new BirthDate({ value: date }));
    }
}
```
`/human/ValueObjects/Name.ts`
```typescript
export interface NameProps {
    value: string;
}

export class Name extends ValueObject<NameProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: NameProps) {
    super(props);
  }

  private static isValid(value: string): boolean {
    return value.length <= 20;
  }

  public static create(name: string): Result<UserName> {
    if (!this.isValidName(name)) {
      return Result.fail<UserName>(`Invalid Argument - userName:[${name}]`)
    }
    return Result.ok<UserName>(
      new UserName({ value: name })
    )
  }
}
```

### DDDに関するクイズ
- 集約の境界づけの決め方は、どのような点を考慮したほうが良いのでしょうか
- ユビキタス言語の管理方法はどのように保守されるものでしょうか
- ドメインモデル貧血症とは何でしょうか