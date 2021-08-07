<!DOCTYPE html>
<html lang="ja">
<head>
  <?php
    include_once( site_root() . '/static/assets/include/common/head.html');
    if( !is_user_logged_in() ) {
      include_once( site_root() . '/static/assets/include/common/tgm_head.html');
    }
    wp_head();
  ?>
  <?php if ( is_front_page() ) : ?>
    <link rel="stylesheet" href="/assets/css/individual/home.css">
  <?php elseif ( is_singular() || is_archive() ) : ?>
    <link rel="stylesheet" href="/assets/css/individual/<?php echo get_current_post_type(); ?>.css">
  <?php endif;?>

</head>
<body <?php body_class(); ?>>
  <?php
    if( !is_user_logged_in() ) {
      include_once( site_root() . '/static/assets/include/common/tgm_body.html');
    }
    include_once( site_root() . '/static/assets/include/common/header.html');
  ?>

