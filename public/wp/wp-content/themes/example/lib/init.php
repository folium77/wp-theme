<?php

// ルートパスを出力
function site_root() {
  return $_SERVER["DOCUMENT_ROOT"];
}

// アイキャッチ有効化
add_theme_support( 'post-thumbnails' );