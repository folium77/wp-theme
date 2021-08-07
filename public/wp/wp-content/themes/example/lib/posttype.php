<?php

/* カスタム投稿
---------------------------------------------------------- */
function create_post_type_example() {
  $supports = [
    'title',
    'editor',
    'excerpt',
    'thumbnail',
    'revisions'
  ];
  register_post_type( 'example',
    array(
      'label' => 'カスタム投稿',
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'example', 'with_front' => false),
      'menu_position' => 5,
      'supports' => $supports,
      'show_in_rest' => true,
      'rest_base' => 'example',
    )
  );
}
add_action( 'init', 'create_post_type_example' );

register_taxonomy(
  'example_category',
  'example',
  array(
    'label' => 'カテゴリー',
    'labels' => array(
      'all_items' => 'カテゴリー一覧',
      'add_new_item' => 'カテゴリーを追加'
    ),
    'hierarchical' => true,
    'show_in_rest' => true,
    'rewrite' => array('slug' => 'example/category', 'with_front' => false),
  )
);

register_taxonomy(
  'example_tag',
  'example',
  array(
    'hierarchical' => false,
    'update_count_callback' => '_update_post_term_count',
    'label' => 'タグ',
    'singular_label' => 'タグ',
    'public' => true,
    'show_ui' => true,
    'rewrite' => array('slug' => 'example/tag', 'with_front' => false),
  )
);

/* 管理画面での表示
---------------------------------------------------------- */
// function change_post_menu_label() {
//   global $menu;
//   $menu[6][0] = 'NEWS';
// }
// add_action( 'admin_menu', 'change_post_menu_label' );