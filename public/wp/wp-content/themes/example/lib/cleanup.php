<?php

/*  HEAD
---------------------------------------------------------- */
// generatorを非表示にする
remove_action('wp_head', 'wp_generator');

// EditURIを非表示にする
remove_action('wp_head', 'rsd_link');

// wlwmanifestを非表示にする
remove_action('wp_head', 'wlwmanifest_link');

//emoji無効化
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles', 10 );

// 前後にある投稿へのリンク
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');

/*  管理画面
---------------------------------------------------------- */
add_action( 'admin_menu', 'remove_menus' );
function remove_menus(){
  // remove_menu_page( 'edit.php' ); //投稿メニュー
  remove_menu_page( 'edit-comments.php' ); //コメントメニュー
}

/* 編集者の固定ページ権限を削除
---------------------------------------------------------- */
function remove_theme_caps(){
  $role = get_role( 'editor' );
  $role->remove_cap( 'edit_pages' );
}
add_action( 'admin_init', 'remove_theme_caps' );