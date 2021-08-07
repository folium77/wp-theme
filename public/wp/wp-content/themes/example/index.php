<?php get_header(); ?>

  <?php
    $post_type = get_current_post_type();
    get_template_part( 'include/loop', $post_type );
  ?>

<?php get_footer(); ?>
