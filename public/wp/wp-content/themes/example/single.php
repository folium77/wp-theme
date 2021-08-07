<?php get_header(); ?>

  <?php $post_type = get_current_post_type(); ?>
  <?php if(have_posts()): while(have_posts()): the_post(); ?>
    <?php get_template_part('include/content', $post_type); ?>
  <?php endwhile; endif; ?>

<?php get_footer(); ?>
