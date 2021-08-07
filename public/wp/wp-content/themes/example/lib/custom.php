<?php

/* ログイン画面
---------------------------------------------------------- */
function my_login_style() {
  wp_enqueue_style( 'custom-login', get_template_directory_uri() . '/style.css' );
 }
 add_action( 'login_enqueue_scripts', 'my_login_style' );

 // ロゴのリンク先を指定
function my_login_logo_url() {
  return get_bloginfo( 'url' );
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

// ロゴのtitleテキストを指定
function my_login_logo_tit() {
  return get_option( 'blogname' );
}
add_filter( 'login_headertitle', 'my_login_logo_tit' );

/* body_classに親スラッグ追加
---------------------------------------------------------- */
add_filter( 'body_class', 'add_page_slug_class_name' );
function add_page_slug_class_name( $classes ) {
  if ( is_page() ) {
    $page = get_post( get_the_ID() );
    $classes[] = $page->post_name;

    $parent_id = $page->post_parent;
    if ( $parent_id ) {
      $classes[] = get_post($parent_id)->post_name . '-child';
    }
  }
  return $classes;
}

/* エディタ画面にオリジナルのスタイルを適用
---------------------------------------------------------- */
add_action( 'after_setup_theme', 'nxw_setup_theme' );
function nxw_setup_theme() {
  add_theme_support( 'editor-styles' );
  add_editor_style("css/common/common.css");
  add_editor_style("css/common/wp-editor-style.css");
}

/* 投稿タイプ取得
---------------------------------------------------------- */
function get_current_post_type() {
  if ( isset($_GET['post_type']) ){
    $post_type = $_GET['post_type'];
  } elseif ( is_tax() ) {
    $post_type = get_query_var( 'taxonomy' );
  } elseif ( is_single() || is_archive() ) {
    $post_type = get_post_type( $post );
  } else {
    $post_type = get_query_var( 'post_type' );
  }
  $post_type = preg_replace('/_(tag|category)/', '', $post_type);
  return $post_type;
}

/* 指定ページのみ Pタグ削除
---------------------------------------------------------- */
function rm_wpautop($content) {
  global $post;
  // Get the keys and values of the custom fields:
  if(preg_match('|<!--rm_wpautop-->|siu',$content)){

    remove_filter('the_content', 'wpautop');

  } else {
      add_filter('the_content', 'wpautop');
  }
  return $content;
}
// Hook into the Plugin API
add_filter('the_content', 'rm_wpautop', 9);

/* 投稿者アーカイブを無効化
---------------------------------------------------------- */
function disable_author_archive( $query ){
  if( !is_admin() && is_author() ){
    $query->set_404();
    status_header( 404 );
    nocache_headers();
  }
}
add_action( 'parse_query', 'disable_author_archive' );