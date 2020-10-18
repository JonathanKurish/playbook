<!DOCTYPE html>

<html>

    <head>

        <title>Playbook</title>

        <meta charset="utf-8"/>

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>

        <meta http-equiv="ScreenOrientation" content="autoRotate:disabled">



	   	<link rel="manifest" href="manifest.json"/>

  	   	<meta name="theme-color" content="white"/>



  		<link rel="icon" href="app-icon-white.ico" type="image/x-icon" />  

		<link rel="apple-touch-icon" href="pictures/app-icon-white.png"/>



		<!--<link rel="apple-touch-startup-image" href="pictures/app-icon-white.png">   -->



		<meta name="theme-color" content="#27364A"/>  



		<link href="splashscreens/iphone5_splash.png"

			  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/iphone6_splash.png" 

			  media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/iphoneplus_splash.png" 

			  media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/iphonex_splash.png" 

			  media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/iphonexr_splash.png" 

			  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/iphonexsmax_splash.png" 

			  media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/ipad_splash.png" 

			  media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/ipadpro1_splash.png" 

			  media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/ipadpro3_splash.png" 

			  media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<link href="splashscreens/ipadpro2_splash.png" 

			  media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" 

			  rel="apple-touch-startup-image" />



		<meta name="apple-mobile-web-app-capable" content="yes"/> 

		<meta name="mobile-web-app-capable" content="yes">



		<meta name="apple-mobile-web-app-status-bar-style" content="black"/> 

		<meta name="apple-mobile-web-app-title" content="Playbook"/> 

		<meta name="msapplication-TileImage" content="pictures/app-icon-white_144.png"/>  

		<meta name="msapplication-TileColor" content="#27364A"/>



		<!-- import of the "popcorn" library for capturing frames of video

		<script src="http://popcornjs.org/code/dist/popcorn-complete.js"></script> -->



		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>

		<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css" rel="stylesheet"/>





		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

    	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

		

		<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"/>

		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script><!-- Latest compiled and minified CSS -->







		<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>

	   	<link rel="stylesheet" href="css/style.css"/>







		<!-- Load icon library -->

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>



	</head>





	<body class="d-block col-12 nopadding">
		<div id="role" class="d-none"><?php echo $_GET["role"];?></div>
		<div id="fname" class="d-none"><?php echo $_GET["first_name"];?></div>
		<div id="password" class="d-none"><?php echo $_GET["password"];?></div>
		<div id="email_address" class="d-none"><?php echo $_GET["email_address"];?></div>
		<div id="body_container" class="d-block col-xl-9 col-12 nopadding">



		<div id="creating_play_overlay_container" class="d-none">
			<div id="creating_play_overlay" class="d-block col-11 nopadding">
				<div id="creating_play_title" class="overlay_title d-block nopadding">Creating Play</div>
				<p id="creating_play_text">Uploading play info..</p>
				<div id="creating_play_loader" class="loader d-block nopadding"></div>
			</div>
		</div>

		<div id="details_file_overlay_container" class="d-none">

			<div id="details_file_overlay" class="details_container d-block col-10 nopadding">

				<div id="details_file_overlay_close" class="overlay_close" onclick="close_details_file_overlay()"></div>

				<div class="overlay_title col-12 nopadding">Details</div>

				

				<div id="details_file_middle" class="col-md-8 col-12 nopadding m-auto">



						<!--<img id="details_file_small_img" class="d-none"/>

						<video id="details_file_small_vid" controls class="d-none"></video>-->

					<div id="details_file_small_img_div"></div>

				

					<div id="details_description_item" class="col-12 nopadding">

						<div class="details_description_title col-11 nopadding">Description</div>

						<div class="details_description_container d-flex col-11 nopadding">

							<textarea rows="2" id="details_description_textarea" draggable="false" class="details_description_textarea col-12 nopadding" placeholder="No description added yet.."></textarea>

							<!--<button id="details_description_save" class="col-2 nopadding" onclick="" disabled>Save</button>-->

						</div>

					</div>



					<div id="details_comments_item" class="col-12 nopadding">

						<div class="details_comments_title col-11 nopadding">Comments</div>



						<div id="details_comments_list" class="details_comments_list col-11 nopadding"></div>



						<div id="details_no_comments_yet" class="d-none">No comments yet</div>



						

					</div>

				</div>



				<div id="new_comment_overlay_bottom2" class="overlay_bottom d-flex col-md-8 col-11 nopadding">

					<input type="text" id="comment_textfield" placeholder="Write a comment.." class="col-12 nopadding">

					<button id="comment_add_button" class="col-2 nopadding" onclick="comment_add_button_clicked()" disabled></button>

				</div>



				<!--

				<div class="overlay_bottom details_bottom d-flex justify-content-around col-11 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_details_file_overlay()">Cancel</button>

					<button class="yes_button col-5 nopadding" onclick="save_details_file_overlay()">Save</button>

				</div>-->



			</div>

		</div>





		

		<div id="type_list_add_overlay_container" class="d-none">

			<div id="type_list_add_overlay" class="details_container d-block col-11 nopadding">

				<div id="type_list_add_overlay_close" class="overlay_close" onclick="close_add_play_type_overlay()"></div>

				

				<div class="overlay_title col-12 nopadding">Create play type</div>


				<div class="overlay_middle col-md-8 col-12 d-block nopadding m-auto">
					<div class="login_item_div d-block col-10 nopadding">

						<div class="login_text">Name</div>

						<input type="text" id="add_type_input" class="login_item list_textfield col-12 nopadding">

						<div id="add_play_type_error" class="error_text"></div>

					</div>



					<div id="type_list_img_div" class="login_item_div d-block col-10 nopadding">

						<div class="login_text">Mini image</div>

						

						



						<div id="type_list_add_img_div">

							<img id="type_list_add_img" src="pictures/app-icon-white.png"/>

						</div>



						<label id="load_different_image" for="type_list_add_load">Change image</label>

						<input type="file" name="file" id="type_list_add_load" class="file_upload" accept="image/*" onchange="LoadMiniImage(this.files)">



					<div id="add_play_type_img_error" class="error_text"></div>

					</div>
				</div>



				<div id="type_list_add_bottom" class="overlay_bottom confirm_bottom d-flex justify-content-around col-md-8 col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_add_play_type_overlay()">Cancel</button>

					<button class="yes_button col-5 nopadding" onclick="create_play_type()">Create</button>

				</div>



			</div>

		</div>


		<div id="add_players_overlay_container" class="d-none">

			<div id="add_players_overlay" class="details_container d-block col-11 nopadding">

				<div id="add_players_overlay_close" class="overlay_close" onclick="close_add_players_overlay()"></div>

				

				<div class="overlay_title col-12 nopadding">Add Players</div>


				<div class="overlay_middle col-md-8 col-12 d-block nopadding m-auto">
					<div class="login_item_div d-block col-10 nopadding">

						<div class="login_text">Emails</div>

						<input type="text" id="emails_input" class="login_item list_textfield col-12 nopadding">

						<div id="emails_error" class="error_text"></div>
					</div>

					<div class="login_item_div d-block col-10 nopadding">

						<div class="login_text">Add Text To Invite</div>

						<input type="text" id="add_invite_text_input" class="login_item list_textfield col-12 nopadding">

						<div id="add_invite_text_error" class="error_text"></div>
					</div>
				</div>



				<div id="type_list_add_bottom" class="overlay_bottom confirm_bottom d-flex justify-content-around col-md-8 col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_add_players_overlay()">Cancel</button>

					<button class="yes_button col-5 nopadding" onclick="invite_players()">Invite</button>

				</div>



			</div>

		</div>


		



		<div id="play_cancel_overlay_container" class="d-none">

			<div id="play_cancel_overlay" class="confirm_container col-md-7 col-11 d-block nopadding">

				<div id="play_cancel_overlay_close" class="overlay_close" onclick="close_cancel_play_overlay()"></div>

				

				<div class="overlay_title col-12 nopadding">Cancel play</div>

				<p> Are you sure, you want to cancel the creation of the new play?</p>



				<div class="overlay_bottom confirm_bottom d-flex justify-content-around col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_cancel_play_overlay()">No</button>

					<button class="yes_button col-5 nopadding" onclick="cancel_play()">Yes</button>

				</div>



			</div>

		</div>



		<div id="play_edit_cancel_overlay_container" class="d-none">

			<div id="play_edit_cancel_overlay" class="confirm_container col-md-7 col-11 d-block nopadding">

				<div id="play_edit_cancel_overlay_close" class="overlay_close" onclick="close_cancel_play_overlay()"></div>

				

				<div class="overlay_title col-12 nopadding">Cancel edit</div>

				<p> Are you sure, you want to cancel the changes you've made?</p>



				<div class="overlay_bottom confirm_bottom d-flex justify-content-around col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_cancel_play_overlay()">No</button>

					<button class="yes_button col-5 nopadding" onclick="cancel_edit()">Yes</button>

				</div>



			</div>

		</div>



		<div id="play_list_delete_overlay_container" class="d-none">

			<div id="play_list_delete_overlay" class="col-md-7 col-11 d-block nopadding">

				<div id="play_list_delete_overlay_close" class="overlay_close" onclick="close_play_list_delete_overlay()"></div>

				

				<div class="overlay_title col-12 nopadding">Delete play</div>

				<p> Are you sure, you want to delete the play?</p>



				<div class="overlay_bottom confirm_bottom d-flex justify-content-around col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_play_list_delete_overlay()">Cancel</button>

					<button class="yes_button col-5 nopadding" onclick="delete_play()">Yes</button>

				</div>

			</div>

		</div>



		<div id="play_type_list_delete_overlay_container" class="d-none">

			<div id="play_type_list_delete_overlay" class="confirm_container col-md-7 col-11 d-block nopadding">

				<div id="play_type_list_delete_overlay_close" class="overlay_close" onclick="close_play_type_list_delete_overlay()"></div>

				

				<div class="overlay_title col-12 nopadding">Delete play type</div>

				<p> Are you sure, you want to delete the play type?</p>



				<p id="play_type_list_delete_overlay_error"></p>



				<div class="overlay_bottom confirm_bottom d-flex justify-content-around col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_play_type_list_delete_overlay()">Cancel</button>

					<button class="yes_button col-5 nopadding" onclick="delete_play_type()">Yes</button>

				</div>

			</div>

		</div>



		<div id="comments_delete_overlay_container" class="d-none">

			<div id="comments_delete_overlay" class="confirm_container col-md-7 col-11 d-block nopadding">

				<div id="comments_delete_overlay_close" class="overlay_close" onclick="close_comments_delete_overlay()"></div>

				<div class="overlay_title col-12 nopadding">Delete comment</div>

				<p> Are you sure, you want to delete the comment?</p>

				<div class="overlay_bottom confirm_bottom d-flex justify-content-around col-12 nopadding">

					<button class="cancel_button col-5 nopadding" onclick="close_comments_delete_overlay()"> Cancel</button>

					<button class="yes_button col-5 nopadding" onclick="delete_comment()"> Yes </button>

				</div>

			</div>

		</div>



		<div id="delete_file_overlay_container" class="d-none">

			<div id="new_delete_overlay" class="confirm_container col-md-7 col-11 d-block nopadding">

				<div id="new_delete_overlay_close" class="overlay_close" onclick="close_delete_overlay()"></div>

				<div class="overlay_title col-12 nopadding">Delete file</div>

				<div class="overlay_middle col-md-8 col-12 d-block nopadding m-auto">
					<div id="delete_file_small_img_div">

					</div>

					<p> Are you sure, you want to delete the file? This will delete the file's comments as well.</p>
				</div>

				<div class="overlay_bottom confirm_bottom d-flex justify-content-around col-12 nopadding">

					<button id="delete_file_cancel_button" class="cancel_button col-5 nopadding" onclick="close_delete_overlay()"> Cancel</button>

					<button id="delete_file_yes_button" class="yes_button col-5 nopadding" onclick="new_play_delete_file()"> Yes </button>

				</div>

			</div>

		</div>



		<div id="play_list_dots_overlay_container" class="d-none">

			<div id="play_list_dots_overlay" class="overlay_small d-block col-md-6 col-10 nopadding">



				<div class="dots_overlay_item col-10 nopadding" id="play_list_dots_overlay_remove">

					<div id="play_list_new_play_remove" class="col-12 nopadding" onclick="open_play_list_delete_overlay()">

						<i class="fa fa-trash"></i>

						<span id="">Delete play</span>

					</div>

				</div>



				<div class="dots_overlay_item col-10 nopadding" id="play_list_dots_overlay_edit">

					<div id="play_list_new_play_edit" class="col-12 nopadding" onclick="new_clicked_dots_edit_play('plays-list')">

						<i class="fa fa-edit"></i>

						<span id="">Edit play</span>

					</div>

				</div>



				<div id="dots_overlay_list" class="d-none"></div>

				<div class="dots_overlay_item col-10 nopadding">

					<div id="" class="" onclick="close_play_list_dots_overlay();">

						<span>Close</span>

					</div>

				</div>

			</div>

		</div>





		<div id="play_type_list_dots_overlay_container" class="d-none">

			<div id="play_type_list_dots_overlay" class="overlay_small d-block col-md-6 col-10 nopadding">



				<div class="dots_overlay_item col-10 nopadding" id="play_type_list_dots_overlay_remove">

					<div id="play_list_new_play_remove" class="col-12 nopadding" onclick="open_play_type_list_delete_overlay()">

						<i class="fa fa-trash"></i>

						<span id="">Delete play type</span>

					</div>

				</div>



				<div class="dots_overlay_item col-10 nopadding" id="play_type_list_dots_overlay_edit">

					<div id="play_list_new_play_edit" class="col-12 nopadding" onclick="open_add_play_type_overlay(true)">

						<i class="fa fa-edit"></i>

						<span id="">Edit play type</span>

					</div>

				</div>



				<div id="dots_overlay_list" class="d-none"></div>

				<div class="dots_overlay_item col-10 nopadding">

					<div id="" class="" onclick="close_play_type_list_dots_overlay();">

						<span>Close</span>

					</div>

				</div>

			</div>

		</div>

		<div id="team_list_dots_overlay_container" class="d-none">

			<div id="team_list_dots_overlay" class="overlay_small d-block col-md-6 col-10 nopadding">



				<!--<div class="dots_overlay_item col-10 nopadding" id="team_list_dots_overlay_remove">

					<div id="play_list_new_play_remove" class="col-12 nopadding" onclick="open_play_type_list_delete_overlay()">

						<i class="fa fa-trash"></i>

						<span id="">Delete play type</span>

					</div>

				</div>-->



				<div class="dots_overlay_item col-10 nopadding" id="team_list_dots_overlay_add_players">

					<div id="play_list_new_play_edit" class="col-12 nopadding" onclick="open_add_players_overlay(true)">

						<i class="fa fa-edit"></i>

						<span id="">Add players</span>

					</div>

				</div>



				<div id="dots_overlay_list" class="d-none"></div>

				<div class="dots_overlay_item col-10 nopadding">

					<div id="" class="" onclick="close_team_list_dots_overlay();">

						<span>Close</span>

					</div>

				</div>

			</div>

		</div>



		<div id="comments_dots_overlay_container" class="d-none">

			<div id="comments_dots_overlay" class="overlay_small d-block col-md-6 col-10 nopadding">



				<div class="dots_overlay_item col-10 nopadding" id="comments_dots_overlay_remove">

					<div id="comments_new_play_remove" class="col-12 nopadding" onclick="open_comments_delete_overlay()">

						<i class="fa fa-trash"></i>

						<span id="">Delete comment</span>

					</div>

				</div>

				<div class="dots_overlay_item col-10 nopadding">

					<div id="" class="" onclick="close_comments_dots_overlay();">

						<span>Close</span>

					</div>

				</div>

			</div>

		</div>


		<!--

		<div id="new_play_edit_dots_overlay_container" class="d-none">

			<div id="new_play_edit_dots_overlay" class="overlay_small d-block col-12 nopadding">





				<div class="dots_overlay_item col-8 nopadding" id="new_play_edit_overlay_edit_type">

					<div id="new_play_edit_play_type" class="col-12 nopadding" onclick="clicked_dots_edit_play_type(this)">

						<span id="new_play_edit_play_type_text">*Play type*</span>

					</div>

				</div>



				<div class="dots_overlay_item col-8 nopadding" id="new_play_edit_overlay_edit_name">

					<div id="new_play_edit_play_name" class="col-12 nopadding" onclick="clicked_dots_edit_play_name(this)">

						<span id="new_play_edit_play_name_text">*Play name*</span>

					</div>

				</div>



				<div class="dots_overlay_item col-8 nopadding" id="new_play_edit_overlay_edit_description">

					<div id="new_play_edit_play_description" class="col-12 nopadding" onclick="clicked_dots_edit_play_description(this)">

						<span id="new_play_edit_play_description_text">*Play descr*</span>

					</div>

				</div>



				<div class="dots_overlay_item col-8 nopadding">

					<div id="" class="" onclick="close_dots_edit_play_overlay();">

						<span>Cancel</span>

					</div>

				</div>



				<div class="dots_overlay_item col-8 nopadding">

					<div id="" class="" onclick="dots_edit_play_save_changes();">

						<span>Save</span>

					</div>

				</div>



			</div>

		</div>-->



		<div id="dots_overlay_container" class="d-none">

			<div id="dots_overlay" class="overlay_small d-block col-md-6 col-10 nopadding">



				<div class="dots_overlay_item col-10 nopadding" id="dots_overlay_edit_play">

					<div id="new_play_edit_play" class="col-12 nopadding" onclick="new_clicked_dots_edit_play(this)">

						<i class="fa fa-edit"></i>

						<span id="new_play_edit_play_text">Edit play</span>

					</div>

				</div>


				<!--
				<div class="dots_overlay_item col-8 nopadding" id="dots_overlay_edit_play">

					<div id="new_play_edit_play" class="col-12 nopadding" onclick="clicked_dots_details(this)">
						<i class="fa fa-info"></i>
						<span id="new_play_edit_play_text">Details</span>
					</div>
				</div>-->





				<div id="dots_overlay_list" class="d-none"></div>

				<div class="dots_overlay_item col-10 nopadding">

					<div id="" class="" onclick="close_overlay('dots');">

						<span>Cancel</span>

					</div>

				</div>

			</div>

		</div>


		<!--
		<div id="create_overlay_container" class="d-none">

			<div id="create_overlay" class="overlay">

				<div id="create_overlay_close" class="overlay_close" onclick="close_create_overlay()"></div>

				<div id="create_overlay_title" class="overlay_title">Create play</div>

				<div class="create_overlay_item col-10 nopadding">

					<div>Name: </div>

					<div id="create_overlay_play_name"></div>

				</div>



				<div class="create_overlay_item col-10 nopadding">

					<div>Type: </div>

					<div id="create_overlay_play_type"></div>

				</div>



				<div class="create_overlay_item col-10 nopadding">

					<div>Description: </div>

					<div id="create_overlay_play_description"></div>

				</div>



				<div id="create_overlay_list" class="col-12 nopadding"></div>

				<div id="create_overlay_bottom" class="overlay_bottom d-flex col-12 nopadding">

					<button id="create_overlay_cancel" class="col-6 nopadding" onclick="close_create_overlay();">Back</button>

					<button id="create_overlay_create" class="col-6 nopadding" onclick="create_play()">Create</button>

				</div>

			</div>

		</div>-->



		<div id="no_comments_holder" class="d-none">

			<div id="no_comments_added_yet" class="list_item2 d-none nopadding"> - No Comments Added Yet - </div>

		</div>

		<!--
		<div id="comment_overlay_container" class="d-none">

			<div id="comment_overlay" class="overlay">

				<div id="comment_overlay_close" class="overlay_close" onclick="close_overlay('comment')"></div>

				<div id="comment_overlay_title" class="overlay_title">Comments</div>

				<div id="comment_overlay_list" class="overlay_list col-12 nopadding"></div>

				<div id="comment_overlay_bottom" class="overlay_bottom d-flex col-11 nopadding">

					<input type="text" id="comment_overlay_text" placeholder="Write a comment.." class="col-12 nopadding">

					<button id="comment_overlay_add" class="col-2 nopadding" onclick="add_comment();" disabled>Send</button>

				</div>

			</div>

		</div>-->


		<!--
		<div id="new_comment_overlay_container" class="d-none">

			<div id="new_comment_overlay" class="overlay">

				<div id="new_comment_overlay_close" class="overlay_close" onclick="close_new_comment_overlay()"></div>

				<div id="new_comment_overlay_title" class="overlay_title">Comments</div>

				<div id="new_comment_overlay_list" class="overlay_list col-12 nopadding"></div>

				<div id="new_comment_overlay_bottom" class="overlay_bottom d-flex col-11 nopadding">

					<input type="text" id="new_comment_overlay_text" placeholder="Write a comment.." class="col-12 nopadding">

					<button id="new_comment_overlay_add" class="col-2 nopadding" onclick="new_add_comment();" disabled>Send</button>

				</div>

			</div>

		</div>-->

		<!-- all pages top line -->

		<div id="top_line2" class="nopadding top_line d-none">
			<div id="back_button2" class="invisible col-2 nopadding" onclick="list_back()">
				<i id="back_icon" class="fa fa-chevron-left"></i>
			</div>

			<div id="back_cancel" class="d-none" onclick="open_cancel_play_overlay()">
				Cancel
			</div>

			<div id="top_line_text" class="top_line_text col-8 nopadding">Kurish Playbook</div>

			<div id="top_right_button" class="d-none" onclick="create_play()">
				Create
			</div>

			<div id="top_right_show_hide" class="d-none" onclick="hide_show_info(2)">Hide info</div>
		</div>


		<!-- install popup for safari -->
		<div id="install_div_safari" class="d-none">
			<div id="install_div_safari_box" class="col-12 nopadding">
				<div id="install_div_safari_text">Føj "Briks Playbook" som app på din telefon: Tryk <span id="share_icon">&nbsp;</span> og "Føj til hjemmeskærm".</div>

			</div>

			<div id="install_div_safari_triangle" class=""></div>

			<div id="install_div_safari_back_triangle" class=""></div>

			<div id="install_div_safari_close" class=""><i class="fa fa-times"></i></div>

		</div>

		<!-- intro page -->

		<div id="intro_page" class="login">

			<div id="intro_text">

				<div id="frontpage_logo">

				</div>

				

				<div id="install_div" class="new_button col-5 nopadding">

					<div id="add-button" class="">

						<i class="fa fa-mobile"></i>

						<span id="">Install as app</span>

					</div>

				</div>



				<div id="frontpage_text">

					Easy and free playbook for your entire club <br><br>

					1. Upload your plays <br>

					2. Add play descriptions <br>

					3. Become a better team!

				</div>

			</div>

			<div id="intro_bottom_line" class="d-flex justify-content-around">

				<div id="intro_login" class="intro_bottom_icon new_button col-md-3 col-5" onclick="to_page(101)">Login</div>

				
				<div id="intro_signup" class="intro_bottom_icon new_button col-md-3 col-5" onclick="to_page(103)">Sign up your club!</div>

			</div>

		</div>



		<!-- login page -->

		<div id="login_page" class="login d-none">

			<div id="login_body" class="d-block w-100">

				

				


				<!--
				<div class="login_item_div d-block col-md-6 col-10 nopadding">

					<p class="login_text col-12 nopadding">Club</p>

					<div id="custom_login_clubs_div" class="dropdownX col-12 nopadding">

					  	<button id="custom_login_clubs_button" onclick="show_options('login', 'club')" class="dropbtnX col-12 nopadding">Select club</button>

					  	<div id="custom_login_clubs_list" class="dropdown-contentX col-12 nopadding">

					  	</div>

					</div>

					<p id="login_error_club" class="login_error"></p>

				</div>



				<div class="login_item_div d-block col-md-6 col-10 nopadding">

					<p class="login_text col-12 nopadding">Club</p>

					<div id="custom_login_teams_div" class="dropdownX col-12 nopadding">

					  	<button id="custom_login_teams_button" onclick="show_options('login', 'team')" class="dropbtnX col-12 nopadding">Select team</button>

					  	<div id="custom_login_teams_list" class="dropdown-contentX col-12 nopadding"></div>

					</div>

					<p id="login_error_team" class="login_error"></p>

				</div>-->



				<div class="login_item_div d-block col-md-6 col-10 nopadding">
					<p class="login_text">Email</p>
					<input type="text" id="login_email" class="login_item list_textfield col-12 nopadding" onInput="">
					<p id="login_error_email" class="login_error"></p>
				</div>

				<div class="login_item_div d-block col-md-6 col-10 nopadding">
					<p class="login_text">Password</p>
					<input type="password" id="login_password" class="login_item list_textfield col-12 nopadding">
					<p id="login_error_password" class="login_error"></p>
				</div>

				<input type="button" id="login_button" class="new_button col-md-3 col-5 nopadding" onclick="login_button_clicked_email()" value="Login">



			</div>

		</div>



		<!-- signup page -->

		<div id="signup_page" class="login d-none">

			<div id="signup_body" class="d-block w-100">

				



				<div class="signup_item_div d-block col-md-6 col-10 nopadding">

					<p class="signup_text col-12 nopadding">Club</p>

					<div id="custom_signup_clubs_div" class="dropdownX col-12 nopadding">

					  	<button id="custom_signup_clubs_button" onclick="show_options('signup', 'club')" class="dropbtnX col-12 nopadding">Select club</button>

					  	<div id="custom_signup_clubs_list" class="dropdown-contentX col-12 nopadding">

					  	</div>

					</div>

					<p id="signup_error_club" class="signup_error"></p>

				</div>



				<div class="signup_item_div d-block col-md-6 col-10 nopadding">

					<p class="signup_text col-12 nopadding">Team</p>

					<div id="custom_signup_teams_div" class="dropdownX col-12 nopadding">

					  	<button id="custom_signup_teams_button" onclick="show_options('signup', 'team')" class="dropbtnX col-12 nopadding">Select team</button>

					  	<div id="custom_signup_teams_list" class="dropdown-contentX col-12 nopadding"></div>

					</div>

					<p id="signup_error_team" class="signup_error"></p>

				</div>



				<div class="signup_item_div d-block col-md-6 col-10 nopadding">

					<p class="signup_text col-12 nopadding">Role</p>

					<div id="custom_signup_roles_div" class="dropdownX col-12 nopadding">

					  	<button id="custom_signup_roles_button"  onclick="show_options('signup','role')"

					  	class="dropbtnX col-12 nopadding">Select role</button>

					  	<div id="custom_signup_roles_list" class="dropdown-contentX col-12 nopadding"></div>

					</div>

					<p id="signup_error_role" class="signup_error"></p>

				</div>



				<div class="signup_item_div d-block col-md-6 col-10 nopadding">

					<p class="signup_text">First Name</p>

					<input type="text" id="signup_fname" class="signup_item list_textfield col-12 nopadding"  onInput="fname_written('signup')">

					<p id="signup_error_fname" class="signup_error"></p>

				</div>



	



				<div class="signup_item_div d-block col-md-6 col-10 nopadding">

					<p class="signup_text">Team Password</p>

					<input type="password" id="signup_password" class="signup_item list_textfield col-12 nopadding" >

					<p id="signup_error_password" class="signup_error"></p>

				</div>







				<input type="button" id="signup_button" class="new_button col-md-3 col-5 nopadding" onclick="signup_button_clicked()" value="Sign up">

			</div>

		</div>



		<!-- signup club page -->

		<div id="signup_club_page" class="login d-none">

			<div id="signup_club_body" class="d-block w-100">

				<!-- text box on signing up a club -->
				<div class="signup_item_div d-block col-md-6 col-10 nopadding">
					Contact us to sign up your club and get started
				</div>

				<!-- textfield for Club Name -->
				<div class="signup_item_div d-block col-md-6 col-10 nopadding">
					<p class="signup_text col-12 nopadding">Club</p>
					<input type="text" id="signup_club_club" class="signup_item list_textfield col-12 nopadding">
					<p id="signup_club_error_club" class="signup_error"></p>
				</div>

				<!-- textfield for Admin Email -->
				<div class="signup_item_div d-block col-md-6 col-10 nopadding">
					<p class="signup_text col-12 nopadding">Your Email</p>
					<input type="text" id="signup_club_email" class="signup_item list_textfield col-12 nopadding">
					<p id="signup_club_error_email" class="signup_error"></p>
				</div>

				<!-- textfield for message -->
				<div class="signup_item_div d-block col-md-6 col-10 nopadding">
					<p class="signup_text col-12 nopadding">Message</p>
					<input type="text" id="signup_club_message" class="signup_item list_textfield col-12 nopadding">
					<p id="signup_club_error_message" class="signup_error"></p>
				</div>


				<!-- send email button -->
				<input type="button" id="signup_club_button" class="new_button col-md-3 col-5 nopadding" onclick="signup_club_button_clicked()" value="Send">
			</div>
		</div>


		<!-- signup message sent page -->

		<div id="signup_message_sent_page" class="login d-none">

			<div id="signup_message_sent_body" class="d-block m-auto">

				<!-- text box on sending the message for signup -->
				<div class="d-block m-auto col-md-6 col-10 nopadding">
					Thank you for contacting us. You will receive an email with further information as soon as possible. 
				</div>

			</div>
		</div>











		<!-- main body -->

		<div id="main_body" class="main_body d-none">

			<!-- main new play -->

			<div id="body_new_play" class="body_page d-none">

				<!-- new play name and type -->

				<div id="name_and_type" class="d-block w-100">

					<div class="d-flex col-md-8 col-11 nopadding justify-content-between m-auto">

						<div class="login_item_div d-block col-5 nopadding ml-0">

							<p class="login_text col-12 nopadding">Play name</p>

							<input type="text" id="new_play_name1" class="add_play_name ap2 col-12 nopadding" >

							<p id="new_play_error_name" class="new_play_error"></p>

						</div>


						<div class="login_item_div d-block col-5 nopadding mr-0">

							<p class="login_text col-12 nopadding">Play Type</p>

							<div id="new_play_type_main" class="dropdownX col-12 nopadding">

							  	<button id="new_play_type_button" onclick="type_show_options()" class="dropbtnX col-12 nopadding">Select type</button>

							  	<div id="new_play_type_list" class="dropdown-contentX col-12 nopadding"></div>

							</div>

							<p id="new_play_error_type" class="new_play_error"></p>

						</div>



						

					</div>



					<div class="login_item_div d-block col-md-8 col-11 nopadding">

						<p class="login_text col-12 nopadding">Play description</p>

						<textarea rows="3" id="new_play_description" class="add_play_name ap2 col-12 nopadding" draggable="false"></textarea>

					</div>


					<div id="splitter" class="col-12 d-block nopadding"></div>

					<div id="new_play_files_container" class="col-md-8 col-11 d-block nopadding">


						<div id="new_play_files" class="col-12 d-block nopadding"></div>

						<div class="login_item_div d-block col-md-3 col-5 nopadding">

							<input type="button" id="new_play_name_button2" class="new_button col-12 nopadding" onclick="new_load_files()" value="Load files" capture>



							<p id="new_play_error_load_files" class="new_play_error"></p>

						</div>



					</div>

				</div>



				





			</div>



			<div class="d-none">

				<input class="d-none file_upload" type="file" name="files[]" id="figures" accept="image/*,video/*" multiple></div>



			<!-- main view plays -->
			<div id="body_plays" class="body_page d-none">

				<div id="lists_container" class="d-none">

					<!-- list of teams -->
					<div id="teams_list" class="d-block"></div>

					<!-- list of play types -->
					<div id="play_types_list"></div>

					<!-- list of plays -->
					<div id="plays_list" class="d-block"></div>

					<!-- button to add new play type -->
					<div id="add_new_type_button" class="d-none" value="add" onclick="clicked_on_add_new_type_button();">Add new play type</div>

					<!-- button to add new play -->
					<div id="add_new_play_button" class="d-none" value="add" onclick="to_page(200);">Add new play</div>


					<!-- no plays added yet element -->
					<div id="no_plays_added_yet" class="d-none" value="add" >- No plays added yet - </div>
				</div>

				<!-- play view -->
				<div id="play_div" class="d-none">

					<div id="play_top" class="new_new_top d-flex col-12 nopadding">

						<div class="col-2 nopadding"></div>


						<div id="btn_prev2" class="top_line_button file_div_nav_btns btn_prev col-2 nopadding" onclick="change_image(-1, false);">

							<i class="fa fa-caret-left"></i>

						</div>



						<div id="xofy" class="xofy d-block col-4 nopadding"></div>



						<div id="btn_next2" class="top_line_button  file_div_nav_btns btn_next col-2 nopadding" onclick="change_image(1, false);">

							<i class="fa fa-caret-right"></i>

						</div>



						<div id="top_line_dots" class="top_line_button d-none col-2 nopadding" onclick="show_more_top_right();">

								<img class="top_line_dots_img" src="pictures/prikker.png">

						</div>



					</div>



					<div id="loader_holder" class="d-none">

						<div id="img_loader" class="loader d-block nopadding"></div>

					</div>

					<div id="play_img_container" onclick="hide_show_info(1);" class="d-flex col-12 nopadding"></div>

					<div id="play_bottom_description" class="col-12 nopadding d-none">
						<div id="play_bottom_play_description" class="d-block nopadding"></div>
						<div id="play_bottom_file_description" class="d-block nopadding"></div>
					</div>


					<div id="play_bottom" class="new_new_bottom d-none col-md-8 col-12 nopadding">

						<div id="play_creation" class="bottom_line_button d-block col-6 nopadding">
							<span id="play_creation_name"></span>
							<span id="play_creation_date"></span>
						</div>

						<div id="play_comment" class="bottom_line_button d-block col-6 nopadding" onclick="show_comments()">

							<i class="fa fa-comment"></i>

							<span>Comments</span>

						</div>

					</div>



				</div>

			</div>



			<!-- main profile -->

			<div id="body_profile" class="body_page d-none">



				<div class="profile_item_div d-block col-md-6 col-10 nopadding">

					<p class="profile_text">Name</p>

					<p class="profile_text_value" id="profile_fname_text"></p>

				</div>



				<div class="profile_item_div d-block col-md-6 col-10 nopadding">

					<p class="profile_text">Club</p>

					<p class="profile_text_value" id="profile_club_text"></p>

				</div>



				<div class="profile_item_div d-block col-md-6 col-10 nopadding">

					<p class="profile_text">Team</p>

					<p class="profile_text_value" id="profile_team_text"></p>

				</div>



				<div class="profile_item_div d-block col-md-6 col-10 nopadding">

					<p class="profile_text">Role</p>

					<p class="profile_text_value" id="profile_role_text">Player</p>

				</div>



				<button id="log_out_item" class="button new_button col-md-3 col-5 nopadding" onclick="log_out()">

					<i class="fa fa-sign-out"></i>

					<span>Log Out</span>

				</button>

			</div>



				

		</div>

	

		<!-- main bottom line -->



		<div id="bottom_line" class="d-none nopadding">

			<div id="bottom_team_plays" class="bottom_icon col-2 nopadding" onclick="clicked_bottom_icon(1);"> <img id="team_img" src="pictures/hold-graa.png" /> </div>

			<div id="bottom_club_plays" class="bottom_icon col-3 nopadding" onclick="clicked_bottom_icon(2);"> <img id="club_img" src="pictures/hus-graa.png" /> </div>

			<div id="bottom_whiteboard" class="bottom_icon col-2 nopadding" onclick="clicked_bottom_icon(10);"> <img id="team_img" src="pictures/hold-graa.png" /> </div>

			<div id="bottom_new_play" class="bottom_icon col-3 nopadding" onclick="clicked_bottom_icon(3);"> <img id="new_img" src="pictures/add-new-graa.png" /> </div>

			<!--<div id="bottom_inspiration" class="bottom_icon col-3 nopadding" onclick="clicked_bottom_icon('inspiration');"> <i class="fa fa-bolt"></i> </div>-->



			<div id="bottom_profile" class="bottom_icon col-2 nopadding" onclick="clicked_bottom_icon(4);"> <img id="profile_img" src="pictures/profil-graa.png" /> </div>

		</div>





		</div>


		<div id="whiteboard_div" class="d-none">
    		<div>
		        <div id="wb_top_buttons" class="d-flex nopadding justify-content-around">
	    		    <div class="new_button col-2 nopadding controller" id="back" onclick="backToPlaybook();">back</div>  
	  		
	        		<div class="new_button col-2 nopadding controller" onclick="javascript:clearArea();return false;">Clear</div>
	        		<div class="new_button col-2 nopadding controller" id="undo">undo</div>  
	  				<div class="new_button col-2 nopadding controller" id="redo">redo</div>

	  				<div id="line_type_div" class="dropdown-lines col-2 nopadding">

	    				

	    				<button id="line_type_btn" class="col-12 nopadding controller isSet" onclick="show_line_options()">Fre1</button>

	    				<div id="clickF" class="col-12 nopadding">
					  		<div id="free_draw_list_elem" onclick="set_line_type(1)">free</div>
					  		<div id="line_list_elem" onclick="set_line_type(2)">line</div>
					  		<div id="dribble_list_elem" onclick="set_line_type(3)">dribble</div>
					  	</div>

	    				

		    		</div>

	  			</div>
        
        		<canvas id="myCanvas" ondrop="drop(event)" ondragover="allowDrop(event)"></canvas>
    
       			<div id="wb_bottom_buttons" class="d-flex nopadding justify-content-around">
	    			

	    			
	  				<!--<div class="new_button col-2 nopadding controller" id="swap-background">swap background</div>-->
	  				
	    			<!--

					<div id="line_type_btn" class="dropdown-contentX col-12 nopadding"></div>-->

	    			<div class="new_button col-2 nopadding controller" id="clickX" onclick="setAsX()">Set X</div>
	  				<div class="new_button col-2 nopadding controller" id="clickO" onclick="setAsO()">Set O</div>
	  				<div class="new_button col-3 nopadding controller" id="clickSave" onclick="savePlay()">Save Play</div>
				</div>
    		</div>
		</div>





		<script src="js/date.js"></script>

		<script src="js/script.js"></script>
		<script src="js/whiteboard.js"></script>

	</body>

</html>