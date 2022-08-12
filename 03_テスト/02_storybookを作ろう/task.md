# storybookを作ろう
## 課題1
[チュートリアル](https://reactjs.org/tutorial/tutorial.html)

## 課題2
[実装内容](https://github.com/jp-knj/praha/tree/main/test/02_storybook%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86/implementation)
## 課題3
### Storybookとは？
Storybookは UI開発者がコンポーネントのカタログを作成するためのツール

#### 3つのメリット
- フロントエンドとバックエンドの分離
- デザインとフロントエンドエンジニアとの共闘
- `Atomic Design`とコンポーネントの再利用性を推進

#### 3つのデメリット
- デザイナーや他フロントエンドエンジニアの理解が必要
- デザインの構築・管理・運用に工数が必要
- Storybook,Webpack,CSSの設定に手間がかかる

**Storybookを使用する前は**  
バックエンドエンジニアが`JSON`や`API`を構築した後に、フロントエンドでUIを実装する。
なので、バックエンドの実装が滞れば、フロントエンドの実装も滞る。

**Storybookを使用すれば**  
フロントエンドとバックエンドの作業を切り離すことができる。
エンジニアは設計要件が明確になった時点で、フロントエンドのUIを実装することができます。
バックエンドの実装が完了すると、コンポーネントは`API`や`JSON`を受け取る。


**参考文献**  
[component libraryについて](https://wunder.io/wunderpedia/technology/component-library-storybook/)

## 課題4
- Component Story Format (CSF) とは、どんなことができる仕組みなのでしょうか？

Component Story Formatは推奨されているstoryの書き方。  
ESmoduleをベースとして記述している書き方でstory fileは`default export`か
`named export`から構成される。

- Storybookはエッジケースを検証するためにありますが、エッジケースとはなんでしょうか？
- chromaticというテストツールがありますが、どんなテストのためにあるのでしょうか？

[CSFについて](https://storybook.js.org/docs/react/api/csf)