# フロントエンドのレンダリングパターンを学ぶ 
[課題内容](https://airtable.com/appPxhCPFYGqqN9YU/tblVlFr2q4lIqDKYc/viwX8r6DpCRp80swL/recSzfRld0OfLXrDl?blocks=hide)

## 課題1
Q.SSR, CSR, SSG の違いをペアに説明してください。

- SSR とは
  - Server Side Rendering は クライアントサイドのアプリケーションをサーバ上でHTMLにレンダリングすること
- CSR とは
  - Client Side Rendering は　ブラウザでアプリをレンダリングすることで、DOMを使用する
- SSG とは
  - Static Site Generation は　クライアントサイドのアプリケーションをビルド時に実行して、その初期状態を `static site` としてレンダリングすること

- Rehydration について
  - server でレンダリングされたHTMLのDOMツリーとデータを再利用するように、クライアントでJavaScriptによる機能を付与すること

各レンダリングパターンを下記のパフォーマンス観点で説明する
- TTFB: 
  - Time to First Byte
  - link をクリックしてから、最初のコンテンツが表示されるまでの時間のこと。
- FP 
  - First Paint（ファーストペイント） 
  - ピクセルがユーザーに見えるようになる最初の時間のこと。
- FCP: 
  - First Contentful Paint 
  - 要求されたコンテンツ（記事本文など）が見えるようになるまでの時間のこと。
- TTI: 
  - Time To Interactive 
  - ページがインタラクティブになる時間のこと

### より詳細に Server Side Rendering を説明する
Server side rendering は、サーバー上にページの HTML を生成します。
ブラウザが応答を取得する前に処理されるため、クライアントでのデータ取得やテンプレート作成のため round trip の回避することができます。
SSR は一般に、First Paint と First Contentful Paint を高速に実行します。
ページ処理 とレンダリングをサーバーで実行すると、クライアントに大量の JavaScript を送信する必要がなくなるため、Time to Interactive（TTI）が高速になります。
SSR では、ユーザーのブラウザにテキストとリンクを送信するだけなので、合理的です。
この方法は、さまざまなデバイスやネットワークの条件に対して有効であり、`streaming document parsing` 、ブラウザの最適化の可能性を広げることになります。

SSR を使用すれば、ユーザーがサイトを利用する前に、CPU に負荷のかかる JavaScript の処理を待つことはありません。
外部JavaScript が避けられない場合でも、SSR を使用して 開発者が実装した JavaScript を削減すれば、他JavaScript のための「performance budget」を確保することができます。
サーバーでページを生成するため時間がかかり、その結果、Time to First Byte（TTFB）が遅くなることがよくあります。
SSR がアプリケーションにとって十分かどうかは、どのようなUXを考慮するかに大きく依存します。
SSR と CSR の正しい適用方法については、長年にわたって議論が行われていますが、あるページには SSR 使用し、別のページには使用しないという選択は大いに重要です。
SSR と CSR を共存するハイブリッドレンダリング技術を採用してUXを高めているWebアプリは多く存在します。
Netflix では、比較的静的な LP を SSR し、インタラクションの多いページの JavaScript を Prefetch して、 CSR の重いページをより速くロードできるようにしています。

最近のフレームワーク、ライブラリの多くは、クライアントとサーバーの両方で同じアプリケーションをレンダリングすることを可能にしています。
これらの技術は SSR に使用できますが、サーバーとクライアントの両方でレンダリングが行われるアーキテクチャは、非常に異なるパフォーマンス特性とトレードオフを持つ固有の解決策になることを頭の片隅に入れておかなければなりません。
React を利用する開発者は、SSR に`renderToString()`またはNext.jsのようなReactを基礎にした解決策を使用します。
Vue を利用する開発者は、Vueのサーバーレンダリングガイドを読んだり、Nuxtで解決します。 また Angular には`Universal`があります。
SSR は一般的には何らかの形で`hydration`を採用しているので、ライブラリやフレームワークを選択する前に、使用されている手法に注意してください。

#### performance budget ついて
チームが超過することを許されないページに対する制限のことです。
- JavaScriptの最大バンドルサイズ
- 画像の総重量、
- 特定のロード時間（例：3G/4Gで5秒以内のTime-to-Interactive）

▼ 参考
[round trip](https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A6%E3%83%B3%E3%83%89%E3%83%88%E3%83%AA%E3%83%83%E3%83%97%E3%82%BF%E3%82%A4%E3%83%A0)

### より詳細に Site Generation(Prerender) を説明する
SSR はビルド時に実行され、クライアントサイドJavaScript の bundle size が制限されている場合は、最初の描画、最初のコンテンツ付きペイント、Time To Interactive が高速に実行されます。
SSR とは異なり、ページの HTML をその場で生成する必要がないため、Time To First Byte を常に高速にすることもできます。
一般に、SG とは、各URL に対して個別の HTMLファイル を事前に生成することを意味します。
HTMLレスポンスが事前に生成されるため、SG を複数のCDNにデプロイしてエッジキャッシュを活用することができます。

SG のための解決策は、あらゆる形や大きさで提供されています。
`Gatsby` のようなツールは、開発者が自分のアプリケーションがビルドステップとして生成されるのではなく、動的にレンダリングされているように設計されています。
`Jekyll`や`Metalsmith`のような他のツールは、その静的な性質を受け入れ、よりテンプレート駆動型の手法を提供します。
SG の欠点は、個々の HTMLファイル を個々の URL に対して生成する必要があることです。
これは、URL が事前に予測できない場合や、固有のページが多数あるサイトでは、困難または実装不可能な場合があります。
Reactを使用する開発者は、`Gatsby`、`Next.js static export`、`Navi`になじみがあるかもしれませんが、これらはすべてコンポーネントを使って `Authoring` するのに便利です。

SG と `prerendering`の違いを理解することが重要です。
SG のページは、クライアントサイドJavaScript をあまり実行する必要がなくインタラクティブですが、`prerendering`は、ページを本当にインタラクティブにするためにクライアントで起動しなければならない SPA の First Paint または First Contentful Paint を向上させます。
ある解決策が SG か `prerendering` かわからない場合は、JavaScript を無効にして、作成したウェブページを読み込むというテストをしてみてください。
SG のページでは、JavaScriptを有効にしなくてもほとんどの機能が存在します。
`prerendering`されたページでは、リンクなどの基本的な機能は残っていますが、ページの大部分は不活性な状態になっています。
また、Chrome DevTools を使ってネットワークを slow down させ、ページがインタラクティブになるまでにどれだけの JavaScript がダウンロードされたかを観察するのも有効なテストです。
一般的な`prerendering`では、インタラクティブにするために多くの JavaScript が必要であり、その JavaScript は、SG 使用される `Progressive Enhancement` の手法よりも複雑になる傾向があります。

#### プログレッシブエンハンスメントとは
古いブラウザでも基本となる機能が動作するようにWebサイトやアプリケーションを開発し、新しいブラウザでは高度な装飾wお追加して開発する手法

▼　プログレッシブエンハンスメント
[mdn](https://developer.mozilla.org/ja/docs/Glossary/Progressive_Enhancement)

### SSR と　SG の違いとはなんだろうか？
SSR は銀の弾丸はありません。
その動的な性質により、オーバヘッドになる可能性があります。
多くの SSR は早期にフラッシュせず、Time to First Byte を遅らせたり、送信されるデータを 2倍にしたりします
具体例を挙げると クライアントJavaScript など。
React では、`renderToString()` は と同期処理やシングルスレッドであるため、遅くなることがあります。
SSR を「正しく」行うには、コンポーネントのキャッシュ、メモリ消費量の管理、メモ化技術の適用、その他多くの懸念事項に対する解決策を見つけたり構築したりすることが必要です。
一般に、同じアプリケーションをクライアントとサーバーで何度も処理したり再構築したりすることになります。
SSR によって何かが早く表示されるようになったからといって、やるべきことが急に少なくなるわけではありません。
SSR は、各URL に対して動的に HTML を生成しますが、SG のコンテンツを提供するよりも時間がかかる場合があります。
追加の作業を行うことができれば、SSR と HTMLキャッシュによって、SSR の時間を大幅に短縮することができます。
SSR の利点は、SG よりも多くのデータを取得し、よりリクエスト セットにレスポンスできることです。
パーソナライズを必要とするページは、SG はうまく機能しないタイプのリクエストの具体例です。
SSR は、PWA を構築する際にも興味深い決定をもたらすことがある。
全ページの Service Worker キャッシュ使用するのがよいのか、それとも個々のコンテンツをSSRするだけでよいのか？を考えていきましょう

▼ 参考
[コンポーネントのキャッシュ](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1)
[メモ化記述](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization)
[HTMLキャッシュ](https://freecontent.manning.com/caching-in-react/)
[PWA](https://web.dev/progressive-web-apps/)
[Service Worker](https://developer.chrome.com/docs/workbox/service-worker-overview/)

### より詳細に　Client Side Rendering を説明する
CSRとは、JavaScriptを使用してブラウザで直接ページをレンダリングすることです。
すべてのロジック、データ取得、テンプレート、ルーティングは、サーバーではなくクライアントで処理されます。
CSR は、モバイル向けに高速化するのが難しい場合があります。最小限の作業を行い、JavaScript の performance budget を抑え、できるだけ少ない RTT で価値を提供すれば、純粋な SSR の性能に近づくことができます。
重要な script やデータは、`<link rel=preload>` を使用してより早く配信することができ、parser をより早く動作させることができます。
PRPL のようなパターンは、初期および後続のナビゲーションを即座に感じるようにするために、評価する価値があります。

CSR の主な欠点は、アプリケーションが大きくなると、必要な JavaScript の量が増加する傾向があることです。
これは、新しい JavaScriptライブラリ、ポリフィル、および外部コードが追加された場合により増加します。
これらのコードは処理能力を競い、ページのコンテンツをレンダリングする前に処理しなければならないことがよくあります。
大規模な JavaScriptバンドル に依存する CSR で構築された体験は、積極的なコード分割を検討し、JavaScriptを遅延ロードすること、つまり「必要なときに、必要なものだけを提供する」ことを心がける必要があります。
インタラクティブ性がほとんどない体験では、SSR がこれらの問題に対するよりスケーラブルな解決策になります。

▼ 参考
[RTT](https://developer.mozilla.org/ja/docs/Glossary/Round_Trip_Time_(RTT))
[積極的なコード分割](https://web.dev/reduce-javascript-payloads-with-code-splitting/)
[PRPLパターン](https://web.dev/apply-instant-loading-with-prpl/)

### SSR と CSR との共存
CSR と SSR の両方を行うことで、トレードオフを滑らかにしようとするものです。
フルページロードやリロードなどのナビゲーション要求は、アプリケーションを HTML にレンダリングするサーバーによって処理され、レンダリングに使用する JavaScript とデータは、結果のドキュメントに埋め込まれます。
慎重に実装すれば、SSR のように高速な First Contentful Paint を実現し、その後、hydration という技術を使ってクライアントで再度レンダリングすることで「持ち直す」ことができるのです。
これは斬新な解決策ですが、パフォーマンス面でかなりの欠点があります。

SSRと rehydration の主な欠点は、First Paint 改善されても、Time To Interactive に大きな悪影響を及ぼす可能性があることです。
SSR を適用したページは、見た目には負荷がかかっていてインタラクティブに見えますが、実際には クライアントJavaScript が実行され、イベントハンドラがアタッチされるまで入力に応答することができないことがよくあります。
これは、モバイルでは数秒から数分かかることもあります。
ページを読み込んだように見えても、クリックやタップをしても何も反応がないという経験はありませんか？
なぜ何も起こらないのか？なぜスクロールできないのでしょうか？

#### Rehydration の問題 
JSによるインタラクティビティの遅延よりも深刻な場合があります。
クライアントサイドのJavaScriptが、サーバーがHTMLを表示するために使用したすべてのデータを再要求することなく、サーバーが去った場所を正確に「拾う」ことができるように、現在のSSRソリューションは一般的にUIのデータ依存からの応答をスクリプトタグとして文書内にシリアライズします。
その結果、HTML文書には高いレベルの重複が含まれます。 ご覧のように、サーバーはナビゲーション要求に応じてアプリケーションの UI の説明を返しますが、その UI を構成するために使用されるソースデータ、およびクライアントで起動する UI の実装の完全なコピーも返しています。
bundle.jsの読み込みと実行が終了して初めて、このUIはインタラクティブになります。
SSR rehydrationを使用している実際のウェブサイトから収集したパフォーマンスメトリクスは、その使用を大幅に控えるべきであると示しています。
最終的に、その理由はユーザーエクスペリエンスに帰結します。ユーザーを「不気味の谷」に置き去りにすることになりがちだからです。
しかし、rehydration を伴うSSRには希望があります。短期的には、キャッシュ性の高いコンテンツにSSRを使用するだけで、TTFB遅延を低減し、プリレンダリングと同様の結果を得ることができます。
段階的、漸進的、または部分的に水分を補給することが、将来的にこの技術をより実用的なものにする鍵になるかもしれません。