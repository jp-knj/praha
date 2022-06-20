# 基本的な設計原則 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/rec4LYaRJr7WFOSrA?blocks=hide)

## 課題１
### SOLID原則のメリットを説明してください
#### 単一責任の原則 / Single Responsibility Principle
一つのクラスは一つの仕事だけをする。  
なので、このクラスを変更しようとするならば、一つの理由がある。  
複数の理由で変更しているなら、このクラスは複数の仕事を担当していることが分かると。

この原則は凝集性の高いプログラムを書くことに役立つ。  
一つのクラスにあるメソッドは、お互いに関連しあい、一つの目的達成のために集められている。
ある意味で、データベース設計時の正規化（normalization）とも共通していて、無関連のデータを別々のテーブルに分け、一つのテーブルにあるコラムは一つのオブジェクトのみと関わる。

Robert C. Martin氏がクラシックの著作Clean Codeで強調していたように、関数もできるだけ小さく、一つの仕事だけをすること。 

**参考文献**    
[プログラマが知るべきのこと・単一責任原則について](https://xn--97-273ae6a4irb6e2hsoiozc2g4b8082p.com/%E3%82%A8%E3%83%83%E3%82%BB%E3%82%A4/%E5%8D%98%E4%B8%80%E8%B2%AC%E4%BB%BB%E5%8E%9F%E5%89%87/)

#### オープン・クローズドの原則 / Open Closed Principle
クラスの現在の動作を変更すると、そのクラスを使用するすべてのシステムに影響を与えます。
クラスでより多くの関数を実行したい時、理想的な方法は、既存の関数に追加することであり、変更しないことです。

#### リスコフの置換原則 / Liskov Substitution Principle
このイラストでは、親クラスがコーヒーを提供しています（コーヒーの種類は問いません）。子クラスがカプチーノを提供することは、カプチーノがコーヒーの一種なので許容されますが、水を提供することは許容されません。
子クラスがこれらの要件を満たさない場合、子クラスが大きく変更され、この原則に違反することになったということです。
この原則は、親クラスやその子クラスがエラーなしで同じ方法で使用できるように、一貫性を保つことを目的とする。

#### インタフェース分離の原則 / Interface Segregation Principle
インターフェイスを作る際に、できるだけ小さくした方（メソッドを少なくないし1つのみ）が良い。
- 再利用の向上
- 高い凝集度

メソッドの間の関連度に関わるが、メソッドが多いインターフェースになると、仮に継承先が全てのメソッドを使わなくても、実装しなければなりません。

インターフェースを変更するには、もし関連度が低いないし直交になってしまうと、二つ以上の理由でこのインターフェイスを変更することになります。  

#### 依存関係逆転の原則 / Dependency Inversation Principle
依存性逆転の原則とは、あるモジュールが別のモジュールを利用するとき、モジュールはお互いに直接依存すべきではなく、どちらのモジュールも、共有された抽象（インターフェイスや抽象クラスなど）に依存すべきであるという原則。
たとえば、関数Aが処理の内部で関数Bを直接読み込んで利用している場合、関数Aは関数Bの実装に依存。  
現象を防ぐために、依存性を逆転する。

#### SOLID原則のメリット
- 変更に強いこと
- 理解しやすいこと
- コンポーネントの基盤として、多くのソフトウェアシステムで利用できること

### 単一責任の原則とファイルを分割の相違はなんでしょうか。
関連性での分割

ファイルを分割すると関連性は下がります。
各ファイルやモジュールの関連性は低い方がいいと言われるが、必ずしも適切ではない。  
関連性が低いと開発効率や実行速度の点で悪影響。  
関連性の強さは階層的であり、機能が近ければ強く、遠ければ弱くする。
- 関数による分割
- クラスによる分割
- ライブラリによる分割
- 実行ファイルによる分割

など様々な分割階層が存在。  
細かい階層なら関連性は強く、荒い階層なら関連性は弱くなる。これらも機能面からの分割が必要。

**参考文献**    
[関連性について](http://tasakawa.lolipop.jp/softtech/module.html)
### OCPの原則に沿ったサンプルコードの実装
ユースケースごとにコンポーネントを分割し、`Titleコンポーネント`に `children` として渡すように修正しました。  
こうすることで、例えば、先程の「ツールチップをタイトルの横に付ける追加修正」に対応する場合も、`TitleWithTooltipコンポーネント`にツールチップを表示するコンポーネントを描画。
他の`TitleWithButton`や`TitleWithLinkコンポーネント`に一切影響を与えない。

このリファクタリングによって、Titleコンポーネントは、拡張に対して開いていて、変更に対しては閉じており、OCP に準拠している設計。
```tsx
import { VFC, FC } from "react";

type TitleProps = {
  title: string;
};

export const Title: FC<TitleProps> = ({ title, children }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

type TitleWithLinkProps = {
  title: string;
  href: string;
  buttonText: string;
};

export const TitleWithLink: VFC<TitleWithLinkProps> = ({
  title,
  href,
  buttonText,
}) => {
  return (
    <Title title={title}>
      <button>
        <a href={href}>{buttonText}</a>
      </button>
    </Title>
  );
};

type TitleWithButtonProps = {
  title: string;
  buttonText: string;
  onClick: () => void;
};

export const TitleWithButtonProps: VFC<TitleWithButtonProps> = ({
  title,
  buttonText,
  onClick,
}) => {
  return (
    <Title title={title}>
      <button onClick={onClick}>{buttonText}</button>
    </Title>
  );
};
```
### リスコフの置換原則に違反した場合、どのような不都合が生じるでしょうか？
スーパータイプとサブタイプの関係を置換可能なものにしていない場合、ソフトウェアの拡張性というオブジェクト指向設計の大きなメリットを享受できなくなってしまいます。  
置換可能でないスーパークラスとサブクラスの関係を作ってしまったことによりバグが生まれる可能性がある。

[リスコフの置換原則について](https://note.com/erukiti/n/n88b8ed99f1e1)

### インターフェースを用いる事で、設計上どのようなメリットがあるでしょうか？
・同じinterfaceを実装しているクラスは、同じメンバーが必ず存在することが保証。
・関数の引数がオブジェクトの際に型を定義するのに便利。
・コンパイルの支援の為に存在する為、コンパイル後のソースには影響しない。

### どんな時に依存性の逆転を用いる必要が生じるのでしょうか？
DIPは抽象に依存することで、
- オブジェクトの再利用
- 保守性の向上
- 柔軟性の向上

たとえばデータベースを扱うモジュールをテストしたい場合を考えます。  
依存性逆転の原則を適用せずにそのままモジュールを使用するような形にしてしまった場合、テストをするときに毎回データベースを立ち上げて接続して、という操作をせねばならず、テストを書くのが大変になる & テストの実行が遅くなります。
テストのときはモックのデータベースを使うように工夫すれば、データベースの立ち上げも接続も不要で、テストが書ける。

### デメテルの法則とは何でしょうか？
コードの結合度を最小化すること。
- 不要な情報は他のモジュールに公開しない。
- 他のモジュールの実装を当てしない。

#### 以下のコードの保守性に対して効果が無いことを説明してあげてください
[新人1年性が提出したサンプルコード](https://bit.ly/38AXxZN)

`public宣言`されているため、誰でも照会し、更新できるフィールドを保持したコンテナになっている。
提出されたコードでは、どこかのコードでフィールドを変更されているかもしれないため、保守しづらい

<details>
    <summary>Tell, Don't Askとは？</summary>
    オブジェクトの内部状態に基づく意思決定をし、その結果で該当オブジェクトを更新してはならない。

    問題を認識するための単なるパターンになる。
</details>

## 課題２
`purchase関数`から下記の関数を外部へ移動する
```typescript
const allPurchases = this.paymentRecordRepo.getPurchasesBy(userId)
const pastPurchase = allPurchases.find((p) => p.productId === productId && p.transaction.succeeded)
```
```typescript
interface Purchase {
  userId: string
  productId: string
  transaction: {
    succeeded: true
    completedAt: Date
  }
}

interface PaymentRecordRepo {
  getPurchasesBy: (userId: string) => Purchase[]
}

const assertIsPurchased: <Purchase>(val: Purchase) => asserts val is NonNullable<Purchase> = val => {
  if (val === undefined || val === null) {
    throw new Error('この商品はおひとりさま一品限定です！')
  }
}

class PurchaseService {
  public constructor(private paymentRecordRepo: PaymentRecordRepo) {}
  public getPurchaseHistories(userId: string){
    return this.paymentRecordRepo.getPurchasesBy(userId)
  }
  public hasPastPurchase(listOfPurchaseHistories: Purchase[], productId:string):Purchase {
    const result = listOfPurchaseHistories.find((p) => p.productId === productId && p.transaction.succeeded)
    assertIsPurchased(result)
    return result
  }
  public purchase() {
    // 購入手続きに進む
  }
}

```
**Playground**  
[修正後のコーディング](https://bit.ly/3JLj3rG)

## 課題３
- フィールド変数を「private」にして隠す。（他のクラスから利用できないようにする）
- 読み取り専用に書き換える

### カプセル化のメリット・デメリット
#### メリット
- private修飾子を利用して外部からの、直接アクセスでメンバ変数の変更を防ぐことができる。
- 専用のアクセサメソッドを利用することで、外部からの間違ったアクセスを未然に防ぐことができる。
- 使用者が内部構造を理解していなくても使用できる。
#### デメリット
- ソースコードの記述量が増える。
- 内部構造を知っていないと修正が難しくなる。

<details>
    <summary>カプセル化とは？</summary>
オブジェクト指向プログラミングにおいて、互いに関連するデータの集合とそれらに対する操作をオブジェクトとして一つの単位にまとめ、外部に対して必要な情報や手続きのみを提供すること。 外から直に参照や操作をする必要のない内部の状態や構造は秘匿。  

**参考文献**
[カプセル化について](https://bit.ly/3Oev7VV)
</details>

### 任意課題
アーキテクトがモジュール性を把握するのに役立つキーとなる考え方に焦点を当てる。

- 凝集度
- 結合度
- コナーセンス

#### 凝集度
モジュールの要素がどの程度、そのモジュールに収まっているかの具合を表す。

- モジュール内の要素同士の関連度を示す座標
凝集度の高いモジュールを分割しようとしても、結合度が増えて可読性が低下

<details>
    <summary>機能的凝集/ Functional Cohesion</summary>
    関連する要素だけでもモジュールが構成され、モジュールが機能するために必要不可欠なものがすべて含まれている
</details>

<details>
    <summary>逐次的凝集/ Sequential Cohesion</summary>
    一方が出力したデータを、もう一方が入力とする形で、２つのモジュールが相互に作用している。
</details>

<details>
    <summary>通信的凝集度/ Communicational Cohesion</summary>
    ２つのモジュールが通信の連鎖を形成し、それぞれの情報を操作したり、何らかの出力に貢献したりする。たとえば、データベースにレコードを追加し、その情報に基づいて電子メールを生成するといった具合
</details>

<details>
    <summary>手続き型凝集度/ Procedural Cohesion</summary>
    ２つのモジュールが通信の連鎖を形成し、それぞれの情報を操作したり、何らかの出力に貢献したりする。たとえば、データベースにレコードを追加し、その情報に基づいて電子メールを生成するといった具合
</details>

<details>
    <summary>時間的凝集度/ Temporal Cohesion</summary>
    モジュール間に時間的な依存関係がある、たとえば、多くのシステムにはシステム起動時に初期化しなければならない一見無関係な処理群が存在している。これらの異なる処理には時間的な凝集があるといえる。
</details>

<details>
    <summary>論理的凝集度/ Logical Cohesion</summary>
    モジュール内のデータは論理的に関連しているものの、機能的には関連していない。たとえば、テキストやシリアライズされたオブジェクト、またはストリームを情報へ変換するモジュールを考える。
    この場合、これらは操作の上では関連があるものの、機能は全く異なる。
</details>

<details>
    <summary>偶発的凝集度/ Coincidental Cohesion</summary>
    モジュール内の要素は同じソースファイル内にある以外には関連性がない。これは最悪な形での凝集を表している。
</details>

#### 結合度
- 求心性結合
コードアーティファクト（コンポーネント、クラス、関数など）に外部から入力される接続数を計測
- 遠心性結合
他のコードアーティファクト（コンポーネント、クラス、関数など）に外部から出力する接続数を計測
<details>
    <summary>内容結合</summary>
    <ul>
        <li>あるモジュールが他のモジュールと一部を共有するようなモジュールの結合。</li>
        <li>他モジュール内の外部宣言していないデータを直接参照したり、命令の一部を共有したりする場合が内部結合にあたる。</li>
        <li>一方のモジュール変更が他のモジュールに変更を及ぼす問題がある。</li>
    </ul>
</details>

<details>
    <summary>共通結合</summary>
    <p>共通域に定義したデータ(グローバル変数)をいくつかのモジュールが共同使用するような結合。</p>
    <ul>
        <li>共通域に定義したデータ(グローバル変数)をいくつかのモジュールが共同使用するような結合。</li>
            <ul>
                <li>共通域のデータはモジュール間のインターフェース上に現れないのでコードの解読を非常に難しい。</li>
                <li>共通域のデータは、コードの安定性が低い。</li>
                <li>共通結合しているモジュールは共通域のデータを通じて色々なモジュールとつながっているため再利用性が阻害。</li>
            </ul>
    </ul>
</details>

<details>
    <summary>外部結合</summary>
    - 外部宣言したデータ(public宣言された変数)を共有したモジュール間の結合形式。
    - データの共有という意味では共通結合と似ているが、必要なデータだけを外部に宣言するので不必要なデータまで共有しない。
</details>

<details>
    <summary>制御結合</summary>
    <ul>
        <li>呼び出し側のモジュールが呼び出しされるモジュールの制御を指示するデータをパラメータとして渡す結合</li>
        <li>制御結合ではパラメータの1つとしてスイッチ変数を渡して呼び出されるモジュールがそのときに行う機能を指示</li>
        <li>呼び出し側は呼び出すモジュールの論理を知っている必要があるので、相手をブラックボックス扱いできず結合度が強い。</li>
        <li>呼び出されるモジュールの凝集度は論理的な強度になってしまうデメリットはあるが、データの共有ということはないので共通結合や外部結合と比べて結合度は弱い。</li>
    </ul>
</details>

<details>
    <summary>スタンプ結合</summary>
    <ul>
        <li>共通域にないデータ構造を2つのモジュールで受け渡すような結合。</li>
        <li>データ構造の受け渡しは、パラメータを介して行われる。</li>
        <li>スタンプ結合では受け渡すデータ構造の一部を使用しないことがあり不必要なデータまで受け渡しする点が結合度を少し強めてしまう。</li>
    </ul>
</details>

<details>
    <summary>データ結合</summary>
    <ul>
        <li>モジュールを介してデータを共有する</li>
        <li>例えば、引数。 各データは基本部分であり、これらは単純なデータの受け渡しのみを行う（例えば、数値を渡してその平方根を返す）</li>
    </ul>
</details>

<details>
    <summary>メッセージ結合</summary>
    最も結合度が低い結合の種類である。（引数のない）メソッドの呼び出し。
</details>