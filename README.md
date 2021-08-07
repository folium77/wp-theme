# コーディング補助

## タスクランナー（npm-scripts）

|Module|Description|
|:---|:---|
|browser-sync|ブラウザシンク|
|concat|複数のファイルを結合|
|imagemin|画像の圧縮|
|EJS|テンプレートエンジン|
|node-sass|Sass|
|postcss|Autoprefixer|
|npm-run-all|複数の npm-scripts を実行|
|watch|ファイルの更新を監視|

### 利用開始

```
$npm run watch
```

### imagemin

```
/src/assets/images
```

に画像を入れると、

```
/public/assets/images
```

に圧縮された画像が書き出されます。  
※メインビジュアル等は画質が荒れるようであれば、圧縮を利用しない。

### EJS

HTMLは全てejsを利用して構築しています。  
ヘッダー・フッター等共通パーツのインクルードや、for などの繰り返し処理、if文などが利用できます。  
その他の機能については下記を参照。

テンプレートエンジンEJSで使える便利な構文まとめ  
https://qiita.com/y_hokkey/items/31f1daa6cecb5f4ea4c9

#### 利用方法

```
/src/static
```

以下に「.ejs」拡張子でファイルを作成すると、

```
/public/static
```

にhtmlとしてファイルが書き出されます。

```
/src/_include
```

上記ディレクトリ内のejsファイルは public へ書き出されません。  
public に書き出したくないインクルードファイルなどを格納します。

## Sass

|mixin|Description|
|:---|:---|
|mq-up, mq-down|メディアクエリ用 @mixin|
|widtnPercent|幅・高さのパーセントを計算|
|fz_vw|フォントサイズをvwに変換|

### mq-up, mq-down

@mixinでメディアクエリを呼び出します。

#### scss
```scss
.element {
  @include mq-down() {
    display: block;
  }

  @include mq-up() {
    display: none;
  }

  @include mq-up(xl) {
    display: inline;
  }
}
```

#### css
```css
@media screen and (max-width: 767px) {
  .element {
    display: block;
  }
}

@media screen and (min-width: 768px) {
  .element {
    display: inline;
  }
}

@media screen and (min-width: 1200px) {
  .element {
    display: inline;
  }
}
```

より詳細な使い方は以下を参照。  
https://www.tam-tam.co.jp/tipsnote/html_css/post10708.html  

### widtnPercent

横幅を px → % へ変換して指定します。  

#### scss
```scss
.element {
  width: widtnPercent(1200, 900) //　widtnPercent(親要素の幅, 子要素の幅)
}
```
#### css
```css
.element {
  width: 75%;
}
```

### fz_vw

フォントサイズを px → vw へ変換して指定します。  

#### scss
```scss
.element {
  @include fz_vw(15);
}
```
css
```css
.element {
  font-size: 15px;
  font-size: 1.953125vw;
}
```
### ナビゲーションの切り替え

下記ファイルを変更してバックログ風ナビに変更できます。  
（利用しない方をコメントアウト）

/src/static/assets/scss/common/common.scss
```scss
@import "../configs/_variable.scss";
@import "include/foundation/_normalize.scss";
@import "include/foundation/_default.scss";
@import "include/foundation/_fonts.scss";
@import 'include/layout/_header.scss';
@import 'include/layout/_gnav_side.scss'; // バックログ風ナビ
// @import 'include/layout/_gnav.scss'; // 通常のナビ
@import 'include/layout/_side.scss';
@import 'include/layout/_main.scss';
@import 'include/layout/_footer.scss';
@import 'include/object/_component.scss';
@import 'include/object/_utility.scss';
```

「gnav_horizontal」または「gnav_vertical」にを指定。

/src/static/assets/include/common/header.ejs
```ejs
  <% include ../../../../_include/gnav_vertical /* gnav_horizontal or gnav_vertical */ %>
```

### レイジーロード

```html
<img data-src="/path/to/img.jpg" alt="" class="lazy">

<picture>
  <source data-srcset="/path/to/img_sp.jpg" media="(max-width: 767px)">
  <img data-src="/path/to/img_pc.jpg" class="lazy">
</picture>
```

### ドロップダウン

```html
<div class="dropdown">

  <div><span class="js-dropdown-toggle">toggle</span></div>

  <div class="dropdown__content">
    dummy text<br>
    dummy text<br>
    dummy text<br>
  </div>

</div>
```

### タブ
```html
<div class="js-tab">
  <ul class="js-tab-head">
    <li class="tab-head__item">1</li>
    <li class="tab-head__item">2</li>
    <li class="tab-head__item">3</li>
    <li class="tab-head__item">4</li>
  </ul>

  <div class="js-tab-body">
    <div class="tab-body__item">1の内容</div>
    <div class="tab-body__item">2の内容</div>
    <div class="tab-body__item">3の内容</div>
    <div class="tab-body__item">4の内容</div>
  </div>
</div>
```

### シェアボタン

```html
<a href="" class="js-facebook-share js-share-btn"><i class="icon-facebook"></i></a>
<a href="" class="js-twitter-share js-share-btn"><i class="icon-twitter"></i></a>
<a href="" class="js-pinterest-share js-share-btn"><i class="icon-pinterest"></i></a>
```

シェア用のURLが自動でセットされます。

```html
<a href="https://www.facebook.com/sharer/sharer.php?u=http://example.com/" class="collection-social__link fade-alpha js-facebook-share js-share-btn"><i class="icon-facebook"></i></a>
<a href="http://twitter.com/share?url=http://example.com/&amp;text=ページタイトル" class="collection-social__link fade-alpha js-twitter-share js-share-btn"><i class="icon-twitter"></i></a>
<a href="https://pinterest.com/pin/create/button/?url=http://example.com/&amp;media=InURL&amp;description=ページタイトル" class="collection-social__link fade-alpha js-pinterest-share js-share-btn"><i class="icon-pinterest"></i></a>
```

## タイトル・ディスクリプションの管理

下記ファイルにて管理します。

```
/src/_include/meta.ejs
```

### meta.ejs を編集

配列にファイルのパス、タイトル、ディスクリプション等を入力します。

```js
"/example01/": {
  "title": "タイトル1",
  "description": "ディスクリプション1",
  "ogp_img": "http://example.com/assets/images/common/ogp.jpg",
  "url": "http://example.com/example01/"
},
"/example02/": {
  "title": "タイトル2",
  "description": "ディスクリプション2",
  "ogp_img": "http://example.com/assets/images/common/ogp.jpg",
  "url": "http://example.com/example02/"
},
```

### 呼び出し側のファイルを編集

以下は例として /example01/ の内容を表示します。

```
/src/static/example01/index.ejs
```

該当するファイルを開きます。


```js
<%- include('../_include/meta.ejs', { page: '/example01/' }) %>
```

meta.ejs の引数を「/example01/」と指定します。

```html
<meta name="description" content="ディスクリプション">
<meta property="og:site_name" content="サイト名" />
<meta property="og:title" content="サイト名">
<meta property="og:image" content="http://example.com/assets/images/common/ogp.jpg">
<meta property="og:description" content="ディスクリプション">
<meta property="og:url" content="http://example.com/example01/">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary">
<link rel="canonical" href="http://example.com/example01/">
<title>タイトル1 | サイト名</title>
```

以上で上記のように出力されます。

# ルール

## HTML

### クラス名

BEMで記述。インデントはスペース二つ。  
「section01」等の汎用的な名前は避け、要素の役割がわかるように書きます。

### HTMLのコメント

ブロック要素の上下にコメントを入れます。

```html
<!-- header -->
<header class="header">

</header>
<!-- /header -->
```

### IDの利用制限

IDはCSSの優先順位が高く上書きが面倒になるため、  
ページ内リンクやJSで利用する時以外はIDは利用せず、  
スタイルを適用しないようにしましょう。

### パンくずリストの構造化

パンくずリストはRDFaを使用して記述します。  
https://developers.google.com/search/docs/data-types/breadcrumb?hl=ja

```html
<ul vocab="https://schema.org/" typeof="BreadcrumbList">
  <li property="itemListElement" typeof="ListItem">
    <a href="/" property="item" typeof="WebPage"><span property="name">TOP</span></a>
    <meta property="position" content="1">
  </li>
  <li property="itemListElement" typeof="ListItem">
    <span property="name">PAGE</span>
    <meta property="position" content="2">
  </li>
</ul>
```

### FAQの構造化
FAQはmicrodataを使用して記述します。（タグは任意。以下属性のみ参照）  
https://developers.google.com/search/docs/data-types/faqpage?hl=ja

```html
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">What is the return policy?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">
        Most unopened items in new condition and returned within <strong>90 days</strong> will receive a refund or exchange. Some items have a modified return policy noted on the receipt or packing slip. Items that are opened or damaged or do not have a receipt may be denied a refund or exchange. Items purchased online or in-store may be returned to any store.
        <br /><p>Online purchases may be returned via a major parcel carrier. <a href="http://example.com/returns"> Click here </a> to initiate a return.</p>
      </div>
    </div>
  </div>
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">How long does it take to process a refund?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <div itemprop="text">
        We will reimburse you for returned items in the same way you paid for them. For example, any amounts deducted from a gift card will be credited back to a gift card. For returns by mail, once we receive your return, we will process it within 4–5 business days. It may take up to 7 days after we process the return to reflect in your account, depending on your financial institution's processing time.
    </div>
  </div>
</div>
```

## CSS

### CSSルールの分離

別々のCSSルールは改行して一行間を空けて書きます。

```css
html {
  background: #fff;
}

body {
  margin: auto;
  width: 50%;
}
```

### ネストについて
要素には固有のクラスを振り、ネストはしないようにします。  
（モディファイアーや擬似要素はOK）

NG
```scss
.block {
  display: block;

  .element {
    display: block;
  }
}
```

OK
```scss
.block {
  display: block;
}

.block__element {
  display: block;
}
```

### メディアクエリの順番

スマホの記述から順に書きます。  
その他、数値の小さい順に書いていくと、探しやすくなります。  
※スタイルの優先順位によって例外あり。

```scss
.element {

  @media screen and (max-width: 767px) { // SP
    display: block;
  }

  @media screen and (min-width: 768px) { // PC
    display: inline;
  }

}
```

### メディアクエリのネスト
メディアクエリの中に要素をネストしないようにしましょう。

NG
```scss
.element {

  @media screen and (max-width: 767px) {
    display: inline;

    &:hover {
      text-decoration: none;
    }
  }

  @media screen and (min-width: 768px) {
    display: block;

    &:hover {
      text-decoration: underline;
    }
  }

}
```

OK
```scss
.element {

  @media screen and (max-width: 767px) {
    display: inline;
  }

  @media screen and (min-width: 768px) {
    display: block;
  }

  &:hover {
    @media screen and (max-width: 767px) {
      text-decoration: none;
    }

    @media screen and (min-width: 768px) {
      text-decoration: underline;
    }
  }

}
```

## JavaScript

JSプラグインは下記フォルダに格納します。

```
/src/static/assets/js/plugins
```

複数の結合されて下記に書き出されます。

```
/public/static/assets/js/common/plugins.js
```

### SP・PCの分岐
```js
if ( isSp() ) {
  // SP用の記述
} else {
  // PC用の記述
}
```

## 画像命名規則

ブロック・エレメントなどBEMに準じる（ハイフン、アンダースコア等は一つでOK）