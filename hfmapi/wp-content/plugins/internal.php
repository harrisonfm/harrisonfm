<?php
/*
Plugin Name: Internal Mods
Description: Internal PHP
*/

add_image_size('wide', 600, 600);

add_filter('post_gallery','customFormatGallery',10,2);

function customFormatGallery($string,$attr){
    $posts = get_posts(array('include' => $attr['ids'],'post_type' => 'attachment'));
    foreach($posts as $imagePost){
    	$output .= wp_get_attachment_image($imagePost->ID, 'wide');
    }
    return $output;
}