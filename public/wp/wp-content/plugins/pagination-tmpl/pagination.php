<?php
  /*
  Plugin Name: Pagination
  Description: ページネーション
  Version: 0.1
  Author URI: https://coliss.com/articles/blog/wordpress/how-to-build-a-wordpress-post-pagination-without-plugin.html
  */
  // 「if (function_exists( 'pagination' )) { pagination($wp_query->max_num_pages); }」　で出力
  function pagination($pages = '', $range = 2) {
    $showitems = ($range * 2)+1;//表示するページ数（５ページを表示）

    global $paged;//現在のページ値
    if(empty($paged)) { $paged = 1; }//デフォルトのページ

    if($pages == '') {
      global $wp_query;
      $pages = $wp_query->max_num_pages;//全ページ数を取得
      if(!$pages) { $pages = 1; }//全ページ数が空の場合は、１とする
    }

    //全ページが１でない場合はページネーションを表示する
    if(1 != $pages) {
      echo "<div class=\"pagenation\">\n";
      echo "<ul class=\"box\">\n";
      //First
      echo "<li class=\"previous\"><a class=\"btn btn-outline-secondary\" href=\"".get_pagenum_link(1)."\"><i class='icon-arrow04-left'></i></a></li>\n";

      //Prev：現在のページ値が１より大きい場合は表示
      if($paged > 1) {
        echo "<li class=\"previous\"><a class=\"btn btn-outline-secondary\" href='".get_pagenum_link($paged - 1)."'><i class='icon-arrow02-left'></i></a></li>\n";
      } else {
        echo "<li class=\"previous first\"><a class=\"btn btn-outline-secondary disabled\"><i class='icon-arrow02-left'></i></a></li>\n";
      }

      //SelectBox
      echo "<li><select class=\"form-control\" onChange=\"location.href=value;\">";
      for ( $i=1; $i <= $pages; $i++ ) {
        echo ($paged == $i)? "<option value=\"".get_pagenum_link($i)."\" selected>" . sprintf("%02d", $i) . "/" . sprintf("%02d", $pages) . "</option>\n":"<option value=\"".get_pagenum_link($i)."\">" . sprintf("%02d", $i) . "/" . sprintf("%02d", $pages) . "</option>\n";
      }
      echo "</i></select></li>";

      //Next：総ページ数より現在のページ値が小さい場合は表示
      if ($paged < $pages) {
        echo "<li class=\"next\"><a class=\"btn btn-outline-secondary\" href=\"".get_pagenum_link($paged + 1)."\"><i class='icon-arrow02-right'></i></a></li>\n";
      } else {
        echo "<li class=\"next last\"><a class=\"btn btn-outline-secondary disabled\"><i class='icon-arrow02-right'></i></a></li>\n";
      }

      //Last
      echo "<li class=\"next\"><a class=\"btn btn-outline-secondary\" href=\"".get_pagenum_link($pages)."\"><i class='icon-arrow04-right'></i></a></li>\n";

      echo "</ul>\n";
      echo "</div>\n";
    }
  }