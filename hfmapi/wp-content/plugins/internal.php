<?php
/*
Plugin Name: Internal Mods
Description: Internal PHP

JSON Api modified to allow user_email visibility
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

add_action('show_user_profile', 'my_show_extra_profile_fields');
add_action('edit_user_profile', 'my_show_extra_profile_fields');

function my_show_extra_profile_fields( $user ) { ?>
	<h3>Extra profile information</h3>
	<table class="form-table">
		<tr>
			<th><label for="twitter">Twitter</label></th>
			<td>
				<input type="text" name="twitter" id="twitter" value="<?php echo esc_attr(get_the_author_meta('twitter', $user->ID)) ?>" class="regular-text" />
			</td>
		</tr>
		<tr>
			<th><label for="instagram">Instagram</label></th>
			<td>
				<input type="text" name="instagram" id="instagram" value="<?php echo esc_attr(get_the_author_meta('instagram', $user->ID)) ?>" class="regular-text" />
			</td>
		</tr>
		<tr>
			<th><label for="spotify">Spotify</label></th>
			<td>
				<input type="text" name="spotify" id="spotify" value="<?php echo esc_attr(get_the_author_meta('spotify', $user->ID)) ?>" class="regular-text" />
			</td>
		</tr>
		<tr>
			<th><label for="facebook">Facebook</label></th>
			<td>
				<input type="text" name="facebook" id="facebook" value="<?php echo esc_attr(get_the_author_meta('facebook', $user->ID)) ?>" class="regular-text" /> 
			</td>
		</tr>
		<tr>
			<th><label for="steam">Steam</label></th>
			<td>
				<input type="text" name="steam" id="steam" value="<?php echo esc_attr(get_the_author_meta('steam', $user->ID)) ?>" class="regular-text" /> 
			</td>
		</tr>
	</table>
<?php }

add_action('personal_options_update', 'my_save_extra_profile_fields');
add_action('edit_user_profile_update', 'my_save_extra_profile_fields');
 
function my_save_extra_profile_fields($user_id){
    if (!current_user_can('edit_user', $user_id))
        return false;
    update_user_meta($user_id, 'twitter', $_POST['twitter']);
    update_user_meta($user_id, 'spotify', $_POST['spotify']);
    update_user_meta($user_id, 'facebook', $_POST['facebook']);
    update_user_meta($user_id, 'steam', $_POST['steam']);
    update_user_meta($user_id, 'instagram', $_POST['instagram']);
}