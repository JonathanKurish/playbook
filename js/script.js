//var add_comments_dict = {}
var temp_play_ids = []
var comment_divs = {}
var new_comment_list = {}
var new_comment_list_ids = []
var new_comment_id = -1
var file_descriptions = {};
var new_comment_divs = {}
var play_type_image;
var from_plays_list = false;
var play_divs = {};

ROLE_ADMIN = 1

CLICKED_ICON = 0
TEAM_ICON = 1
CLUB_ICON = 2
ADD_ICON = 3
PROFILE_ICON = 4
WHITEBOARD_ICON = 10

var new_poster_urls = {}
var new_posters = {}
var new_posters = {};

var poster_extensions = {}
var CLICKED_COMMENT = ""
var CLICKED_PLAY = ""
var CLICKED_FILE = ""

var add_new_play_button, add_new_type_button, no_plays_added_yet;

var current_team_name, current_team_number;
var current_play_type_name, current_play_type_number;
var current_play_name, current_play_id;
var prev_play_id = 0;
var prev_play_type_number = 0;
var prev_team_number = 0;
var current_play_author_number;
var current_play_file_type = "";
var current_play_description = "";

var current_team_image_names = {}
var current_type_image_names = {}
var play_comments_texts = {}
var play_comments_authors = {}
var play_comments_dates = {}

var teams_num_plays = {};
var types_num_plays = {};

var login_team_name, login_team_number;
var login_club_name, login_club_number;
var login_user_number, login_user_name;

var current_page = 0;


var club_number = 0;
var teams = {};
var clubs = {};
var roles = {};
var teams_buttons = {};
var play_names = {};
var play_types = {};
var play_types3 = {};
var type_buttons = {};
var play_buttons = {};
var playname_buttons = {};

var num_tot_plays = {};

var plays_last_edited_dict = {};
var plays_user_id_dict = {};
var plays_created_by_dict = {};
var play_descriptions = {};

var loaded_minis_dict = {};
var loaded_ids_dict = {};
var loaded_sources_dict = {};
var loaded_types_dict = {};
var file_order = [];
var file_order_temp = [];
var file_count = 0;
var id_num = 0;
var list_of_files_dict = {};
var file_order_comments_dict = {};
var file_order_sizes_dict = {};
var file_order_types_dict = {};

var edit_list_of_files_dict = {};
var edit_file_order_sizes_dict = {};
var edit_file_order_types_dict = {};
var edit_loaded_types_dict = {};
var edit_loaded_figures_dict = {}
var edit_loaded_minis_dict = {};
var edit_loaded_ids_dict = {};
var edit_comment_list = {}
var edit_comment_list_ids = []
var edit_comment_divs = {}

var new_loaded_figures_dict = {};
var new_loaded_types_dict = {};
var new_loaded_minis_dict = {};
var new_loaded_ids_dict = {};
var new_file_order = [];
var new_file_order_temp = [];
var new_file_count = 0;
var new_list_of_files_dict = {};
var new_file_order_comments_dict = {};
var new_file_order_sizes_dict = {};
var new_file_order_types_dict = {};
var new_file_descriptions = {};

var new_loaded_minis_dict2 = {};

var NEW_PLAY_PAGE = 200;
var ADD_STATE = NEW_PLAY_PAGE;
var ADD_FILES_LOADED = false;
var CREATING_PLAY = 500;


var PLAYS_TEAM_LIST_PAGE = 300;
var PLAYS_PLAY_TYPE_LIST_PAGE = 301;
var PLAYS_PLAYS_LIST_PAGE = 302;

var PLAYS_PLAY_MAIN_PAGE = 310;
var EDIT_PLAY_PAGE = 313;

var PROFILE_PAGE = 3;

var INTRO_PAGE = 100;
var LOGIN_PAGE = 101;
var SIGNUP_PAGE = 102;
var SIGNUP_CLUB_PAGE = 103;
var SIGNUP_MESSAGE_SENT_PAGE = 104;

function update_play() {
	console.log("Should save play changes")
	update_play_description = false
	update_play_name = false
	update_play_type = false
	update_file_order = false

	// find out what comments have been deleted
	var comment_ids_to_delete = Object.values(edit_deleted_comments).flat()
	console.log(comment_ids_to_delete)


	// find out what file descriptions have been changed
	console.log(edit_file_descriptions)
	console.log(file_descriptions)
	// this is done in the add files for the new files
	var edit_descriptions = Object.keys(edit_file_descriptions).map(function(key){
	    return file_descriptions[key] == edit_file_descriptions[key];
	});
	update_file_descriptions = edit_descriptions.filter(n => n==false).length > 0
	console.log(edit_descriptions)
	console.log(update_file_descriptions)


	// find out what files have been added
	// and their corresponding description - done above
	// their corresponding comments are fixed through this as well
	var edit_ids = Object.keys(edit_loaded_ids_dict).map(function(key){
	    return edit_loaded_ids_dict[key];
	});
	ids_to_add = edit_ids.filter(n => parseInt(n)<0)




	// find out what comments have been added (but only those added to old files) 
	console.log(edit_comment_list)
	var added_comments_old_files = Object.keys(edit_comment_list).map(function(key){
		if (parseInt(edit_comment_list[key][0]) > 0) {
			return edit_comment_list[key]
		} else {
			return false
		}
	});
	console.log(added_comments_old_files)
	comments_to_add = added_comments_old_files.filter(n => n != false)
	console.log(comments_to_add)



	// find out what files have been deleted
	// all their comments should be deleted too
	console.log(edit_deleted_files)
	console.log(edit_ids)
	console.log(loaded_ids_dict)
	console.log(edit_loaded_ids_dict)
	var old_ids = Object.keys(loaded_ids_dict).map(function(key){
	    return loaded_ids_dict[key];
	});
	console.log(old_ids)
	ids_to_delete = old_ids.filter(n => !edit_ids.includes(n))
	console.log(ids_to_delete)

	



	// find out if play type has been changed
	//edit_play_type_number = document.getElementById("new_play_type").value
	edit_play_type_name = document.getElementById("new_play_type_button").innerHTML
	edit_play_type_number = play_types3[edit_play_type_name]
	console.log(current_play_type_number)

	console.log(edit_play_type_number)
	console.log(play_types)
	console.log(edit_play_type_name)


	//if (current_play_type_number == edit_play_type_number) {
	if (current_play_type_name == edit_play_type_name) {
		console.log("play type hasnt changed, dont update")
	} else {
		console.log("play type has changed, needs update")
		update_play_type = true
	}


	// find out if name has been changed
	edit_play_name = document.getElementById("new_play_name1").value
	if (current_play_name == edit_play_name) {
		console.log("play name hasnt changed, dont update")
	} else {
		update_play_name = true
	}


	// find out if the play description has been changed
	edit_play_description = document.getElementById("new_play_description").value
	if (current_play_description == edit_play_description) {
		console.log("description hasnt changed, dont update")
	} else {
		console.log("description has changed, needs update")
		update_play_description = true
	}






	// find out if the order of files has been changed
	console.log(edit_file_order)
	console.log(file_order)
	if (arraysMatch(file_order,edit_file_order)) {
		console.log("file_order hasnt changed, dont update")
	} else {
		console.log("file_order has changed, needs update")
		update_file_order = true
	}


	// update all the stuff in the database

	
	// update play_name, play_type and play_description in one go
	if (update_play_name || update_play_type || update_play_description) {
		// check that the result combo doesnt already exist

		upd_update_play_result = upd_update_play_db(edit_play_name, edit_play_type_number, edit_play_description, current_play_type_number)
		play_node = document.getElementById("btn_play_"+current_play_id)
		play_node.getElementsByClassName("list_main_text")[0].innerHTML = edit_play_name
	}

	// add new files added
	if (ids_to_add.length>0) {
		upd_add_files_result = upd_add_files_db(ids_to_add, current_play_id, 
													  login_team_number, login_club_number,
													  login_user_number, login_user_name,
													  my_get_date(), edit_play_type_number)
	}

	// update files: file_order, file_descriptions and files to delete
	if (update_file_order || update_file_descriptions || (ids_to_delete.length>0)) {
		upd_update_files_result = upd_update_files_db(edit_file_order, edit_loaded_ids_dict, edit_file_descriptions, ids_to_delete);

	}	

	// add comments to old files
	if (comments_to_add.length > 0) {
		upd_add_comments_result = upd_add_comments_db(comments_to_add)
	}

	// remove comments from old files
	if (comment_ids_to_delete.length > 0) {
		upd_delete_comments_result = upd_delete_comments_db(comment_ids_to_delete)
	}


	// clear edit dicts



	// if play type was changed. Go to the new list of plays for that type instead
	if (update_play_type) {
		current_play_type_number = edit_play_type_number
		current_play_type_name = edit_play_type_name
		get_plays_from_db();
		update_title(PLAYS_PLAYS_LIST_PAGE)
		prev_play_type_number = current_play_type_number
	}

	// go back to page you came from
	if (from_plays_list) {
		console.log("came from_plays_list, going back")
		
		to_page(PLAYS_PLAYS_LIST_PAGE);

	} else {
		console.log("came from play, going back to the newly loaded play")
		ADD_FILES_LOADED = false

		load_play_figures_from_db();
		//show_loader(false)
		
		document.getElementById("top_right_show_hide").className = "col-2 d-block nopadding"
		
		console.log(loaded_types_dict)
		console.log(file_order)
		console.log(edit_file_order)
		file_type = loaded_types_dict[edit_file_order[0]].split("/")[0]
		console.log(file_type)
		console.log(play_divs)
		

		/*
		init_fig = play_divs[edit_file_order[0]]
		if (file_type == "image") {
			init_fig.addEventListener('load', file_loaded_old)
		} else if (file_type == "video") {
			//init_fig.onloadeddata = file_loaded_old
			init_fig.onloadstart = file_loaded_old
			//init_fig.addEventListener('load', file_loaded_old)
		}*/



		set_file_description(file_id)
		set_created_by();
		set_xofy(file_order.indexOf(file_id), new_play=false)
		//enable_arrows(new_play=false)
		to_page(PLAYS_PLAY_MAIN_PAGE)
		update_title(PLAYS_PLAY_MAIN_PAGE)
		clear_add_pages()
	}

	
}

/* Adds a new play to the database using selected team and play type */
function add_play_type_to_db(play_type_name, image, default_image) {
    formDataAddType = new FormData();
    formDataAddType.append('play_type', play_type_name);
    formDataAddType.append('team', login_team_number);
    formDataAddType.append('user_id', login_user_number);
    formDataAddType.append('club', login_club_number);
    formDataAddType.append('created_by', login_user_name);
    formDataAddType.append('creation_date', my_get_date());
    formDataAddType.append('files[]', image);
    formDataAddType.append('default_image', default_image);

	latest_play_type_id = -1	
	jQuery.ajax({
        url: "php/add_play_type_to_db.php",
        type: "POST",            
        data: formDataAddType, 
        contentType: false,       
        cache: false,             
        processData:false,        
        success: function(insert_id) {
        	console.log(insert_id);
        	if (insert_id != "error") {
        		latest_play_type_id = insert_id
        	}
        },
        async: false
    }); 
    return latest_play_type_id 
}

function edit_play_type() {
	update_name = false
	update_image = false
	console.log("EDIT PLAY TYPE")
	type_node = CLICKED_TYPE.target.parentNode
	type_id = type_node.id.split("_")[2]
	type_name = type_node.getElementsByClassName("list_main_text")[0].innerHTML
	old_type_src = current_type_image_names[type_id]

	old_play_type_name = type_name
	new_play_type_name = document.getElementById("add_type_input").value

	name_taken = 2

	if (old_play_type_name == new_play_type_name) {
		console.log("dont update the play type name")
	} else {
		// check if play type already exists for team. if that is the case. do no more
		console.log(play_types)
		var new_type_name_taken_list = Object.keys(play_types).map(function(key){
	    	return play_types[key] == new_play_type_name;
		});

		name_taken = new_type_name_taken_list.filter(n => n==true).length
		update_name = name_taken == 0

		console.log(update_name)
		console.log(new_type_name_taken_list)
	}

	if (name_taken == 1) {
		console.log("show already taken error")
		document.getElementById("add_play_type_error").innerHTML = "Name already taken"
	} else {
		document.getElementById("add_play_type_error").innerHTML = ""
	}


	// now check if image has been updated
	type_img = document.getElementById("type_list_add_img")
	new_type_img_src = type_img.src
	new_type_img_src = new_type_img_src.replace('https://kurish.dk/playbook/','');

	old_type_src = old_type_src.replace('https://kurish.dk/playbook/','');
	console.log(new_type_img_src)
	console.log(old_type_src)
	update_image = (new_type_img_src != old_type_src)
	console.log(update_image)


	// report correct error message if necessary

	// if they are both the same as before (nothing to update), just close the overlay

	// call db update if at least one is different
	if ((update_name || update_image) && (name_taken == 0)) {
		type_node.getElementsByClassName("list_main_text")[0].innerHTML = new_play_type_name
		current_type_image_names[type_id] = new_type_img_src
		type_node.getElementsByTagName("img")[0].src = new_type_img_src

		if (!update_image) {
			new_play_type_image = ""
		}

		upd_update_play_type_db(type_id, update_name, new_play_type_name, update_image, new_play_type_image)
		close_add_play_type_overlay()
	}
}


function upd_update_play_type_db(type_id,update_name,play_name,update_image,new_image) {
	console.log(new_image)
	var updatePlayTypeFormData = new FormData()
	updatePlayTypeFormData.append("update_name", update_name)
	updatePlayTypeFormData.append("play_name", play_name)
	updatePlayTypeFormData.append("update_image", update_image)
	updatePlayTypeFormData.append("files[]", new_image)
	updatePlayTypeFormData.append("play_type_id", type_id)
	updatePlayTypeFormData.append("team_id", login_team_number)


	console.log(play_type_id)
	console.log(current_play_type_number)

	var update_result = ""
	jQuery.ajax({
        url: "php/update_play_type_2.php",
        type: "POST",             // Type of request to be send, called as method
        data: updatePlayTypeFormData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	update_result = result
        },
        async: false
    });  

    return update_result

}

function create_play_type() {
	if (CLICKED_TYPE != "") {
		// not creating, but editing an existing play type
		edit_play_type()
	} else {
		console.log("create play type")
		play_type_name = document.getElementById("add_type_input")


		// check if play type already exists for team. if that is the case. do no more
		for (var type_num in play_types) {
			if (play_type_name.value == play_types[type_num]) {
				console.log("already exists. Not creating")
				return 0
			}
		}

		// add row to play_types table
		// add row to teams_and_play_types
		// add mini image to php/pictures/type_images and mini_images table
		type_img = document.getElementById("type_list_add_img")
		type_img_src = type_img.src
		console.log(type_img_src)
		default_image = (type_img_src == "https://kurish.dk/playbook/pictures/app-icon-white.png")

		console.log(default_image)
		if (default_image) {
			console.log(default_image)
			type_id = add_play_type_to_db(play_type_name.value, "-1", default_image)
		} else {
			type_id = add_play_type_to_db(play_type_name.value, new_play_type_image, default_image)
		}

		// add to list
		list_item_type = create_type_list_button(type_id, play_type_name.value, type_img_src, 0) 
		type_buttons[type_id] = list_item_type;
		current_type_image_names[type_id] = type_img_src
		play_types_list.appendChild(list_item_type)

		// clear the overlay and close it
		document.getElementById("type_list_add_overlay_container").className = "d-none";
		play_type_name.value = ""
		document.getElementById("type_list_add_img").src = "pictures/app-icon-white.png"
	}
}


function create_posters() {
	console.log("creating posters")
	max_file_id = parseInt(get_max_file_id())
	next_file_id = max_file_id+1

	for (var i=0; i<Object.keys(new_loaded_types_dict).length; i++) {
		file_type = new_loaded_types_dict[new_file_order[i]]

		
		next_file_id = next_file_id + i
		if (file_type == "image") {
			file_extension = new_list_of_files_dict[new_file_order[i]]["name"].split(".")[1]
			new_posters[i] = file_extension
		} else if (file_type == "video"){
			file_elem = document.getElementById("mini_file_"+i)

			poster_canvas = document.createElement("canvas")
			poster_canvas.width = file_elem.clientWidth
			poster_canvas.height = file_elem.clientHeight
		    poster_canvas.getContext('2d').drawImage(file_elem, 0,0, file_elem.clientWidth, file_elem.clientHeight);
		    poster = poster_canvas.toDataURL('image/jpeg');
		    
		    new_posters[i] = poster
		}
	}
	console.log("done creating posters")
}


function create_play() {
	if (check_create_play()) {
		if (current_page == EDIT_PLAY_PAGE) {
			update_play()
		} else {
			create_posters()
			add_play_to_db(new_play=true)
		}
	}
}

function upd_add_comments_db(comments) {
	formData = new FormData();
	formData.append("user_id", login_user_number)
	formData.append("user_name", login_user_name)
	formData.append("team_id", login_team_number)
	formData.append("play_id", current_play_id)
	formData.append("club_id", login_club_number)

	for (var x=0;x<comments.length;x++) {
		comment_info = comments[x]
		file_id = comment_info[0]
		text = comment_info[1]
		date = comment_info[2]

		formData.append("file_ids[]", file_id)
		formData.append("comment_texts[]", text)
		formData.append("dates[]", date)
	}

	var update_result = ""
	jQuery.ajax({
        url: "php/add_multiple_comments_to_db.php", 
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	update_result = result
        },
        async: false
    });

    return update_result  
}


function upd_delete_comments_db(comment_ids) {
	console.log(comment_ids)
	
	
	formData = new FormData();
	for (var x=0;x<comment_ids.length;x++) {
		comment_id = comment_ids[x]
		formData.append("comment_ids[]", comment_id)
	}

	var update_result = ""
	jQuery.ajax({
        url: "php/delete_multiple_comments_db.php", 
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	update_result = result
        },
        async: false
    });

    return update_result  
	

}

function upd_update_files_db(edit_file_order, ids_dict, descriptions_dict, delete_ids) {
	console.log(new_file_order)
	console.log(ids_dict)
	console.log(descriptions_dict)

	formData = new FormData();
	formData.append("date", my_get_date())

	file_nums_to_update = 0
	file_nums_to_delete = 0
	for (var x=0;x<edit_file_order.length;x++) {
		if (edit_file_order[x] >= 0) {
			formData.append("file_ids[]", ids_dict[edit_file_order[x]])
			formData.append("video_numbers[]", x)
			formData.append("descriptions[]", descriptions_dict[edit_file_order[x]])
			file_nums_to_update = file_nums_to_update + 1
		}
	}

	for (var x=0;x<delete_ids.length;x++) {
		formData.append("files_to_delete[]", delete_ids[x])
		file_nums_to_delete = file_nums_to_delete + 1
	}

	formData.append("num_files_to_update", file_nums_to_update)
	formData.append("num_files_to_delete", file_nums_to_delete)

	var update_result = ""
	jQuery.ajax({
        url: "php/update_files.php", 
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	update_result = result
        },
        async: false
    });

    return update_result  
}


function upd_add_files_db(ids, play_id, team_id, club_id, user_id, user_name, date, 
							play_type_number) {

	var addFilesFormData = new FormData()
	addFilesFormData.append("play_id", play_id)
	addFilesFormData.append("team", team_id)
	addFilesFormData.append("club", club_id)
	addFilesFormData.append("user_id", user_id)
	addFilesFormData.append("user_name", user_name)
	addFilesFormData.append("creation_date", date)
	addFilesFormData.append("play_type", play_type_number)

	var file_name = ""
    var file_type = ""
    for (var i=0;i<ids.length;i++) {
    	console.log(ids[i])

        var key = ids[i];
        var file = edit_list_of_files_dict[key];
        var size = edit_file_order_sizes_dict[key];
        var type = edit_file_order_types_dict[key];
        var file_description = edit_file_descriptions[key];
        var video_num = edit_file_order.indexOf(key)

        var file_comment_divs = edit_comment_divs[key]
        var file_comment_texts = []
        var file_num_comments = 0
        for (var j=0;j<file_comment_divs.length;j++) {
        	comment_div = file_comment_divs[j]
        	comment_text = comment_div.getElementsByClassName("comment_item_div")[0].value
        	file_comment_texts.push(comment_text)
        	addFilesFormData.append('comment_lists_'+i+'_'+j,comment_text)
        	file_num_comments += 1
        }

        if (i == 0) {
        	file_name = file.name;
        	file_type = type.split("/")[0]
        }

        addFilesFormData.append('files[]', file);
        addFilesFormData.append('types[]', type);
        addFilesFormData.append('descriptions_'+i, file_description);
        addFilesFormData.append('file_num_comments_list[]', file_num_comments);
        addFilesFormData.append('video_numbers[]', video_num);
    }


	var update_result = ""
	jQuery.ajax({
        url: "php/add_files_to_db.php",
        type: "POST",             // Type of request to be send, called as method
        data: addFilesFormData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	update_result = result
        },
        async: false
    });  

    return update_result
}


function upd_update_play_db(play_name, play_type, play_description, old_play_type) {
	var updatePlayFormData = new FormData()
	updatePlayFormData.append("new_play_name", play_name)
	updatePlayFormData.append("new_play_type", play_type)
	updatePlayFormData.append("old_play_type", old_play_type)
	updatePlayFormData.append("new_play_description", play_description)
	updatePlayFormData.append("play_id", current_play_id)
	updatePlayFormData.append("team_id", login_team_number)
	updatePlayFormData.append("edit_date", my_get_date())


	// update play names list with the new play name
	play_names[current_play_id] = play_name

	// update number of plays for the play types if updated
	if (play_type != old_play_type) {
		new_type_num_plays = parseInt(types_num_plays[play_type]) + 1
		types_num_plays[play_type] = new_type_num_plays

		old_type_num_plays = parseInt(types_num_plays[old_play_type]) - 1
		types_num_plays[old_play_type] = old_type_num_plays

		type_btn = document.getElementById("btn_type_"+play_type)
		type_btn.getElementsByClassName("list_lower_text")[0].innerHTML = new_type_num_plays + " plays"
		
		type_btn = document.getElementById("btn_type_"+old_play_type)
		type_btn.getElementsByClassName("list_lower_text")[0].innerHTML = old_type_num_plays + " plays"
	}


	console.log(play_type)
	console.log(old_play_type)
	var update_result = ""
	jQuery.ajax({
        url: "php/update_play.php",
        type: "POST",             // Type of request to be send, called as method
        data: updatePlayFormData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	update_result = result
        },
        async: false
    });  

    return update_result
}


/* Adds a new play to the database using selected team and play type */
function add_play_to_db(new_play=false) {
	console.log(max_file_id)

	// hide top corner button again
	document.getElementById("top_right_button").className = "d-none";

	if (new_posters[0].substring(0, 4) == "data") {
		poster_url = "posters/"+(max_file_id+1)+".jpeg"
	} else {
		poster_url = "files/" + (max_file_id+1) + "." + new_posters[0]
	}

	console.log(poster_url)

	console.log("Should add play to database now");
	console.log(current_play_type_number)
    formDataAddPlay = new FormData();
    formDataAddPlay.append('play_name', current_play_name);
    formDataAddPlay.append('play_type', current_play_type_number);
    formDataAddPlay.append('team', login_team_number);
    formDataAddPlay.append('user_id', login_user_number);
    formDataAddPlay.append('club', login_club_number);
    formDataAddPlay.append('created_by', login_user_name);
    formDataAddPlay.append('creation_date', my_get_date());
    formDataAddPlay.append('play_description', current_play_description);
    formDataAddPlay.append('poster_url', poster_url)

    for (var pair of formDataAddPlay.entries()) {
	    console.log(pair[0]+ ', ' + pair[1]); 
	}

	if (prev_play_type_number != current_play_type_number) {
		get_plays_from_db();
	}

	latest_play_id = -1	
	jQuery.ajax({
        url: "php/add_play_to_db.php",
        type: "POST",             // Type of request to be send, called as method
        data: formDataAddPlay, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(insert_id) {
        	console.log(insert_id);
        	if (insert_id != "error") {
        		latest_play_id = insert_id

        		document.getElementById("creating_play_text").innerHTML = "Uploading files.."
				
				creation_date = my_get_date()

				file_type = new_loaded_types_dict[0]
				if (file_type == "image") {
					src = new_loaded_figures_dict[0]
				} else if (file_type == "video") {
					src = new_posters[0]
				}

				console.log(src)
				var temp_list_item_play = temp_create_play_list_button(latest_play_id, current_play_name, login_user_name, creation_date, current_play_description, next_file_id, src, file_type)	
				temp_play_ids.push(latest_play_id)

				console.log(play_buttons)
				console.log(latest_play_id)
				if (!(latest_play_id in plays_last_edited_dict)) {
					plays_list.appendChild(temp_list_item_play)
				}


				play_descriptions[latest_play_id] = current_play_description
				play_names[latest_play_id] = current_play_name
				play_buttons[latest_play_id] = temp_list_item_play;
				plays_last_edited_dict[latest_play_id] = creation_date
				plays_user_id_dict[latest_play_id] = login_user_number;
				plays_created_by_dict[latest_play_id] = login_user_name;
				current_team_number = login_team_number      

				new_add_files_to_db(insert_id, current_play_name, max_file_id); 
				new_type_num_plays = parseInt(types_num_plays[current_play_type_number]) + 1
				types_num_plays[current_play_type_number] = new_type_num_plays
				new_team_num_plays = parseInt(teams_num_plays[login_team_number]) + 1
				teams_num_plays[current_team_number] = new_team_num_plays
				type_btn = document.getElementById("btn_type_"+current_play_type_number)
				type_btn.getElementsByClassName("list_lower_text")[0].innerHTML = new_type_num_plays + " plays"
				
				teams_buttons[login_team_number].getElementsByClassName("list_lower_text")[0].innerHTML = new_team_num_plays + " plays"

				//get_plays_from_db()
				clear_add_pages();
				to_page(PLAYS_PLAYS_LIST_PAGE)
				highlight_page(301)
        	}
        },
        async: true
    });  
}

function get_max_file_id() {
	max_file_id = -1
	jQuery.ajax({
        url: 'php/get_max_file_id.php', 
        type: "POST",             // Type of request to be send, called as method
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data) { // A function to be called if request succeeds
            console.log(data);
            max_file_id = data
        },
        async: false
    });
    return max_file_id
}


function new_add_files_to_db(play_id, play_name, start_file_id) {
    console.log("in add_files_to_db");

    console.log(new_file_order)
    console.log(new_list_of_files_dict)

    creation_date = my_get_date()

    formData = new FormData();
    formData.append('play_id', play_id);
    formData.append('team', login_team_number);
    formData.append('play_type', current_play_type_number);
    formData.append('user_id', login_user_number);
    formData.append('user_name', login_user_name);
    formData.append('creation_date', creation_date);
    formData.append('club', login_club_number);

    var file_name = ""
    var file_type = ""
    for (var i=0;i<new_file_order.length;i++) {
        var key = new_file_order[i];
        var file = new_list_of_files_dict[key];
        var size = new_file_order_sizes_dict[key];
        var type = new_file_order_types_dict[key];
        var file_description = new_file_descriptions[key];
        var video_num = new_file_order.indexOf(key)

        var file_comment_divs = new_comment_divs[key]
        var file_comment_texts = []
        var file_num_comments = 0
        for (var j=0;j<file_comment_divs.length;j++) {
        	comment_div = file_comment_divs[j]
        	comment_text = comment_div.getElementsByClassName("comment_item_div")[0].value
        	file_comment_texts.push(comment_text)
        	formData.append('comment_lists_'+i+'_'+j,comment_text)
        	file_num_comments += 1
        }

        if (i == 0) {
        	file_name = file.name;
        	file_type = type.split("/")[0]
        }

        console.log(file)
        formData.append('files[]', file);
        formData.append('types[]', type);
        formData.append('descriptions_'+i, file_description);
        formData.append('file_num_comments_list[]', file_num_comments);
        formData.append('video_numbers[]', video_num);
        formData.append('poster_img_'+i, new_posters[i]);
    	
        //formData.append('comment_lists['+i+'_'+j+']',comment_text)
    }

    for (var pair of formData.entries()) {
	    console.log(pair[0]+ ', ' + pair[1]); 
	}

    //latest_file_id_added = -1
    console.log("SENDING POST TO CREATE FILES")
    ADD_STATE = CREATING_PLAY
    jQuery.ajax({
        url: 'php/add_files_to_db.php',
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(data) { // A function to be called if request succeeds
            console.log(data);

            first_last_id = data.split("\t")[0]

            if (first_last_id == parseInt(first_last_id)) {
				temp_play_ids = temp_play_ids.filter(function(e) { return e !== play_id })

				ADD_STATE = NEW_PLAY_PAGE
				tmp_play_btn = document.getElementById("btn_play_"+play_id)
				tmp_play_btn.onclick = clicked_on_play_button
				tmp_play_btn.style.opacity = 1
				tmp_play_btn.getElementsByClassName("list_main_text")[0].innerHTML = play_name
				
				clear_add_pages()

        	} else {
        		console.log("error occurred")
        	}
        },
        async: true
    });
}


function set_back_arrow(visibility) {
	document.getElementById("back_button2").className = visibility + " col-2 nopadding"
}

function list_back() {
	switch (current_page) {
		case PLAYS_PLAY_TYPE_LIST_PAGE:
			to_page(PLAYS_TEAM_LIST_PAGE)
			break;
		case PLAYS_PLAYS_LIST_PAGE:
			set_back_arrow("visible")
			to_page(PLAYS_PLAY_TYPE_LIST_PAGE)
			break;
		case PLAYS_PLAY_MAIN_PAGE:
			to_page(PLAYS_PLAYS_LIST_PAGE)
			break;
		case LOGIN_PAGE:
			to_page(INTRO_PAGE)
			break;
		case SIGNUP_PAGE:
			to_page(INTRO_PAGE)
			break;
	}
}

function cancel_play() {
	clear_add_pages()
	close_cancel_play_overlay()
	to_page(PLAYS_PLAY_TYPE_LIST_PAGE)
	ADD_STATE = NEW_PLAY_PAGE
}

function cancel_edit() {
	console.log("back_edit_clicked")
	clear_add_pages()
	
	if (CLICKED_ICON != 0) {
		current_page = 0
		clicked_bottom_icon(CLICKED_ICON)
		close_cancel_play_overlay()
	} else {
		close_cancel_play_overlay()
		if (from_plays_list) {
			to_page(PLAYS_PLAYS_LIST_PAGE)
		} else {
			to_page(PLAYS_PLAY_MAIN_PAGE)
		}
	}

	from_plays_list = false
}

function to_page(page) {
	current_page = page

	switch (page) {
		case INTRO_PAGE:
			document.getElementById("top_line2").className="d-none nopadding top_line";
			document.getElementById("back_button2").className="invisible col-2 nopadding";
			document.getElementById("intro_page").className = "login d-block";
			document.getElementById("signup_page").className = "login d-none";
			document.getElementById("signup_club_page").className = "login d-none";
			document.getElementById("login_page").className = "login d-none";
			document.getElementById("bottom_line").className = "d-none";
			document.getElementById("main_body").className = "d-none";
			break;
		case SIGNUP_PAGE:
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("signup_page").className = "login d-flex";
			document.getElementById("signup_club_page").className = "login d-none";
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className="visible col-2 nopadding";
			document.getElementById("bottom_line").className = "d-none";
			break;
		case SIGNUP_CLUB_PAGE:
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("signup_page").className = "login d-none";
			document.getElementById("signup_club_page").className = "login d-flex";
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className="visible col-2 nopadding";
			document.getElementById("bottom_line").className = "d-none";
			break;
		case SIGNUP_MESSAGE_SENT_PAGE:
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("signup_page").className = "login d-none";
			document.getElementById("signup_club_page").className = "login d-none";
			document.getElementById("signup_message_sent_page").className = "login d-flex";
			document.getElementById("top_line2").className="d-none nopadding top_line";
			document.getElementById("back_button2").className="invisible col-2 nopadding";
			document.getElementById("bottom_line").className = "d-none";
			break;
		case LOGIN_PAGE:
			document.getElementById("login_page").className = "login d-flex";
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className="visible col-2 nopadding";
			document.getElementById("bottom_line").className = "d-none";
			break;
		case NEW_PLAY_PAGE:
		 	document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className = "d-none"
			document.getElementById("back_cancel").className = "col-2 nopadding"
			document.getElementById("top_right_button").className = "col-2 nopadding"
			document.getElementById("top_right_button").innerHTML = "Create"
			document.getElementById("top_right_show_hide").className = "d-none"
			document.getElementById("body_plays").className = "body_page d-none";
			document.getElementById("body_profile").className = "body_page d-none";
			document.getElementById("body_new_play").className = "body_page d-flex w-100";

			if (current_play_type_number != 0) {
				//document.getElementById("new_play_type").value = current_play_type_number;
				console.log(current_play_type_name)
				console.log(current_play_type_number)
				document.getElementById("new_play_type_button").innerHTML = current_play_type_name
			}
			break;
		case EDIT_PLAY_PAGE:
			console.log("EDIT_PLAY_PAGE")
			current_page = EDIT_PLAY_PAGE
			//set_back_arrow("invisible")
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className = "d-none"
			document.getElementById("back_cancel").className = "col-2 nopadding"

			document.getElementById("top_right_button").className = "col-2 nopadding"
			document.getElementById("top_right_button").innerHTML = "Save"
			document.getElementById("top_right_show_hide").className = "d-none"

			document.getElementById("body_plays").className = "body_page d-none";
			
			document.getElementById("main_body").className = "d-flex align-items-center";
			document.getElementById("bottom_line").className = "d-flex";
			document.getElementById("body_new_play").className = "body_page d-flex w-100";

			document.getElementById("lists_container").className = "d-none"
			break;
		case PLAYS_TEAM_LIST_PAGE:
			console.log("PLAYS_PAGE")
			current_team_number = 0;
			current_team_name = "";

			current_play_type_number = 0;
			current_play_type_name = "";

			document.getElementById("intro_page").className = "login d-none";
			
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className = "invisible col-2 nopadding"
			document.getElementById("back_cancel").className = "d-none"
			document.getElementById("top_right_button").className = "d-none"
			document.getElementById("top_right_show_hide").className = "d-none"

			document.getElementById("bottom_line").className = "d-flex";
			document.getElementById("main_body").className = "d-flex align-items-center";
			document.getElementById("body_plays").className = "body_page d-block w-100";
			document.getElementById("body_profile").className = "body_page d-none";
			document.getElementById("body_new_play").className = "body_page d-none";

			document.getElementById("teams_list").className = "d-block";
			document.getElementById("plays_list").className = "d-none";
			document.getElementById("play_types_list").className = "d-none";
			document.getElementById("play_div").className = "d-none";

			document.getElementById("add_new_play_button").className = "d-none";
			document.getElementById("add_new_type_button").className = "d-none";
			document.getElementById("no_plays_added_yet").className = "d-none";
			document.getElementById("lists_container").className = "d-block"

			document.getElementById("login_page").className = "login d-none";
			break;
		case PLAYS_PLAY_TYPE_LIST_PAGE:
			
			if (current_team_number == login_team_number) {
				document.getElementById("back_button2").className = "invisible col-2 nopadding"
				document.getElementById("add_new_type_button").className = "button new_button col-md-3 col-5 nopadding";
			} else {
				document.getElementById("back_button2").className = "visible col-2 nopadding"
				document.getElementById("add_new_type_button").className = "d-none";
			}

			document.getElementById("add_new_play_button").className = "d-none";
			document.getElementById("no_plays_added_yet").className = "d-none";
			document.getElementById("lists_container").className = "d-block"
			document.getElementById("back_cancel").className = "d-none"
			document.getElementById("top_right_button").className = "d-none"
		
			current_play_type_number = 0;
			current_play_type_name = "";


			document.getElementById("top_right_show_hide").className = "d-none"
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("login_page").className = "login d-none";
			document.getElementById("signup_page").className = "login d-none";
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("bottom_line").className = "d-flex";
			document.getElementById("main_body").className = "d-flex align-items-center";
			document.getElementById("body_plays").className = "body_page d-block w-100";
			document.getElementById("body_profile").className = "body_page d-none";
			document.getElementById("body_new_play").className = "body_page d-none";

			document.getElementById("teams_list").className = "d-none";
			document.getElementById("plays_list").className = "d-none";
			document.getElementById("play_types_list").className = "d-block";
			document.getElementById("play_div").className = "d-none";
			break;
		case PLAYS_PLAYS_LIST_PAGE:
			console.log("PLAYS_PLAYS_LIST_PAGE")

			console.log("push back the img div")
			console.log(prev_play_id)
			console.log(loaded_ids_dict)
			console.log(file_order)
			console.log(Object.keys(loaded_ids_dict))
			if (file_order.includes(prev_play_id)) {
				console.log("push back the img now!")
				btn = document.getElementById("btn_play_"+prev_play_id)
				img = play_divs[file_order[0]]
				img.className = "list_item_img"		
				btn.getElementsByClassName("team_img_container")[0].appendChild(img)
			}



			document.getElementById("add_new_type_button").className = "d-none";

			if (current_team_number == login_team_number) {
				document.getElementById("add_new_play_button").className = "button new_button col-md-3 col-5 nopadding";
				document.getElementById("no_plays_added_yet").className = "d-none";

			} else {
				document.getElementById("add_new_play_button").className = "d-none";

				if (plays_list.childElementCount == 0) {
					document.getElementById("no_plays_added_yet").className = "m-auto col-md-7 col-10 nopadding"
				} else {
					document.getElementById("no_plays_added_yet").className = "d-none"
				}
			}

			current_play_id = 0
			current_play_name = ""


			document.getElementById("lists_container").className = "d-block"
			
			document.getElementById("top_right_show_hide").className = "d-none"
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className = "visible col-2 nopadding"
			document.getElementById("back_cancel").className = "d-none"
			document.getElementById("top_right_button").className = "d-none"

			document.getElementById("bottom_line").className = "d-flex";
			document.getElementById("main_body").className = "d-flex align-items-center";
			document.getElementById("body_plays").className = "body_page d-block w-100";
			document.getElementById("body_profile").className = "body_page d-none";
			document.getElementById("body_new_play").className = "body_page d-none";

			document.getElementById("teams_list").className = "d-none";
			document.getElementById("plays_list").className = "d-block";
			document.getElementById("play_types_list").className = "d-none";
			document.getElementById("play_div").className = "d-none";
			break;
		case PLAYS_PLAY_MAIN_PAGE:
			console.log("PLAYS_PLAY_MAIN_PAGE")

			document.getElementById("lists_container").className = "d-none"

			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className = "visible col-2 nopadding"
			document.getElementById("back_cancel").className = "d-none"
			document.getElementById("top_right_button").className = "d-none"

			document.getElementById("login_page").className = "login d-none";
			document.getElementById("signup_page").className = "login d-none";
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("bottom_line").className = "d-flex";
			document.getElementById("main_body").className = "d-flex align-items-center";
			document.getElementById("body_plays").className = "body_page d-block w-100";
			document.getElementById("body_profile").className = "body_page d-none";
			document.getElementById("body_new_play").className = "body_page d-none";

			document.getElementById("teams_list").className = "d-none";
			document.getElementById("plays_list").className = "d-none";
			document.getElementById("play_types_list").className = "d-none";
			document.getElementById("play_div").className = "d-block";

			console.log(document.getElementById("play_div"))
			break;
		case PROFILE_PAGE:
			console.log("PROFILE_PAGE")
			
			document.getElementById("top_line2").className="d-flex nopadding top_line";
			document.getElementById("back_button2").className = "invisible col-2 nopadding"
			document.getElementById("back_cancel").className = "d-none"
			document.getElementById("top_right_button").className = "d-none"
			document.getElementById("top_right_show_hide").className = "d-none"

			document.getElementById("login_page").className = "login d-none";
			document.getElementById("signup_page").className = "login d-none";
			document.getElementById("intro_page").className = "login d-none";
			document.getElementById("bottom_line").className = "d-flex";
			document.getElementById("main_body").className = "d-flex align-items-center";
			document.getElementById("body_plays").className = "body_page d-none";
			document.getElementById("body_profile").className = "body_page d-block w-100";
			document.getElementById("body_new_play").className = "body_page d-none";
			document.getElementById("lists_container").className = "d-none"
			break;
	}	

	highlight_page(page)
	update_title(page)
}




function update_title(page) {
	top_line_text = document.getElementById("top_line_text");
	if (page == NEW_PLAY_PAGE) {
		top_line_text.innerHTML = "New Play";
	} else if (page == PLAYS_TEAM_LIST_PAGE) {
		top_line_text.innerHTML = "Teams";
	} else if (page == PLAYS_PLAY_MAIN_PAGE) {
		top_line_text.innerHTML = current_play_name;
	} else if (page == PLAYS_PLAY_TYPE_LIST_PAGE) {
		top_line_text.innerHTML = current_team_name;
	} else if (page == PLAYS_PLAYS_LIST_PAGE) {
		console.log(current_play_type_number)
		top_line_text.innerHTML = current_play_type_name;
	} else if (page == PROFILE_PAGE) {
		top_line_text.innerHTML = "Profile";
	} else if (page == LOGIN_PAGE) {
		top_line_text.innerHTML = "Login";
	} else if (page == SIGNUP_PAGE) {
		top_line_text.innerHTML = "Sign up";
	} else if (page == INTRO_PAGE) {
		top_line_text.innerHTML = "Kurish Playbook";
	} else if (page == EDIT_PLAY_PAGE) {
		top_line_text.innerHTML = "Edit play";
	}
}



function clicked_bottom_icon(icon) {
	if (current_page == EDIT_PLAY_PAGE) {
		CLICKED_ICON = icon
		console.log(CLICKED_ICON)
		open_cancel_play_overlay()
	} else {
		if (icon == TEAM_ICON) {
			if ((current_team_number != login_team_number) || (current_page != PLAYS_PLAY_TYPE_LIST_PAGE)) {
				current_team_number = login_team_number;
				current_team_name = login_team_name;
				if (prev_team_number != current_team_number) {
					load_play_types_from_db(current_team_number)
				} else {
					console.log("theyre the same bottom!")
				}
				to_page(PLAYS_PLAY_TYPE_LIST_PAGE)
				prev_team_number = current_team_number
			}
		} else if ((icon == CLUB_ICON) && (current_page != PLAYS_TEAM_LIST_PAGE)) {
			current_team_number = 0;
			to_page(PLAYS_TEAM_LIST_PAGE)
		} else if ((icon == ADD_ICON) && (current_page != ADD_STATE)) {
			current_team_number = login_team_number;
			current_team_name = login_team_name;
			current_play_type_number = 0
			current_play_type_name = "";
			to_page(ADD_STATE);
		} else if ((icon == PROFILE_ICON) && (current_page != PROFILE_PAGE)) {
			current_team_number = 0;
			to_page(PROFILE_PAGE);
		} else if (icon == WHITEBOARD_ICON) {
			console.log("open whiteboard overlay")
			//open_whiteboard()
			whiteboardInit()
		}
	}
}

function highlight_page(page) {
	not_chosen = "white"
	chosen = "rgb(26,36,56)"
	if (page == NEW_PLAY_PAGE) {
		document.getElementById("bottom_new_play").style.color = chosen;
		document.getElementById("bottom_club_plays").style.color = not_chosen;
		document.getElementById("bottom_team_plays").style.color = not_chosen;
		document.getElementById("bottom_profile").style.color = not_chosen;

		document.getElementById("team_img").src="pictures/hold-graa.png";
		document.getElementById("profile_img").src="pictures/profil-graa.png";
		document.getElementById("club_img").src="pictures/hus-graa.png";
		document.getElementById("new_img").src="pictures/add-new.png";

	} else if (page == PLAYS_TEAM_LIST_PAGE) {
		document.getElementById("bottom_team_plays").style.color = not_chosen;
		document.getElementById("bottom_club_plays").style.color = chosen;	
		document.getElementById("bottom_new_play").style.color = not_chosen;
		document.getElementById("bottom_profile").style.color = not_chosen;

		document.getElementById("team_img").src="pictures/hold-graa.png";
		document.getElementById("profile_img").src="pictures/profil-graa.png";
		document.getElementById("club_img").src="pictures/hus-fyldt_old.png";
		document.getElementById("new_img").src="pictures/add-new-graa.png";
		

	} else if (page == PLAYS_PLAY_TYPE_LIST_PAGE) {
		console.log("current_team_number", current_team_number)
		console.log("login_team_number", login_team_number)
		if (current_team_number == login_team_number) {
			document.getElementById("bottom_team_plays").style.color = chosen;
			document.getElementById("bottom_club_plays").style.color = not_chosen;	

			document.getElementById("team_img").src="pictures/outline-valgt-hold.png";
			document.getElementById("profile_img").src="pictures/profil-graa.png";
			document.getElementById("club_img").src="pictures/hus-graa.png";
			document.getElementById("new_img").src="pictures/add-new-graa.png";

		} else {
			document.getElementById("bottom_team_plays").style.color = not_chosen;
			document.getElementById("bottom_club_plays").style.color = chosen;

			document.getElementById("team_img").src="pictures/hold-graa.png";
			document.getElementById("profile_img").src="pictures/profil-graa.png";
			document.getElementById("club_img").src="pictures/hus-fyldt_old.png";
			document.getElementById("new_img").src="pictures/add-new-graa.png";
		}
		
		document.getElementById("bottom_new_play").style.color = not_chosen;
		document.getElementById("bottom_profile").style.color = not_chosen;
	} else if (page == PROFILE_PAGE) {
		document.getElementById("bottom_new_play").style.color = not_chosen;
		document.getElementById("bottom_club_plays").style.color = not_chosen;
		document.getElementById("bottom_team_plays").style.color = not_chosen;
		document.getElementById("bottom_profile").style.color = chosen;

		document.getElementById("team_img").src="pictures/hold-graa.png";
		document.getElementById("profile_img").src="pictures/outline-valgt-profil.png";
		document.getElementById("club_img").src="pictures/hus-graa.png";
		document.getElementById("new_img").src="pictures/add-new-graa.png";

	}
}

function show_more_top_right() {
	document.getElementById("dots_overlay_container").className = "overlay_container"
}

function file_loaded_old(e) {
	console.log("file_loaded_old")
	loader = document.getElementById("img_loader")
	document.getElementById("loader_holder").appendChild(loader)
	play_container = document.getElementById("play_img_container")
	play_container.innerHTML = ""
	file = e.target
	play_container.appendChild(file)
	
	// only show top line dots if it is your own team
	if (current_team_number == login_team_number) {
		document.getElementById("top_line_dots").className = "top_line_button col-2 d-block nopadding"
	}

	document.getElementById("play_bottom").className = "new_new_bottom d-flex col-12 nopadding"
	document.getElementById("play_bottom_description").className = "col-12 nopadding d-block"
	//e.target.className = "d-block nopadding"
}



function show_send_button(e) {
	sendBtn = document.getElementById("comment_overlay_add")
	textInput = document.getElementById("comment_overlay_text")
	value = textInput.value

	if (value == "") {
		// do nothing
		console.log("dont show send button")
		sendBtn.disabled = true;
		textInput.className = "col-12 nopadding"

	} else {
		// show send button
		console.log("show send button")
		sendBtn.disabled = false;
		textInput.className = "col-10 nopadding"
	}
}

function new_show_send_button(e){
	sendBtn = document.getElementById("comment_add_button")
	textInput = document.getElementById("comment_textfield")
	value = textInput.value

	if (value == "") {
		// do nothing
		console.log("dont show send button")
		sendBtn.disabled = true;
		sendBtn.innerHTML = ""
		textInput.className = "col-12 nopadding"

	} else {
		// show send button
		console.log("show send button")
		sendBtn.disabled = false;
		sendBtn.innerHTML = "Send"
		textInput.className = "col-10 nopadding"
	}
}


window.onload = () => {
	//stopBodyScrolling(true)
	

	

  	'use strict';
  	if ('serviceWorker' in navigator) {
    	navigator.serviceWorker.register('./sw.js');
  	}

	//load_clubs_from_db();
	
	

	play_comments_texts = {}
	play_comments_authors = {}
	play_comments_dates = {}


	document.getElementById("intro_login").addEventListener("touchend", function() {
		//to_page(101)
		//document.getElementById("intro_login").style.backgroundColor = "red"
		//document.getElementById("login_button").style.backgroundColor = "red"
	});

	$('#delete_file_overlay_container').click(function (e) {
        if ($('#delete_file_overlay_container').is(e.target)) {
	        close_delete_overlay()
	    }
	})


	$('#type_list_add_overlay_container').click(function (e) {
        if ($('#type_list_add_overlay_container').is(e.target)) {
	        $("#type_list_add_overlay_container").removeClass("overlay_container");
            $("#type_list_add_overlay_container").addClass("d-none");
	    }
	})


	$('#play_cancel_overlay_container').click(function (e) {
        if ($('#play_cancel_overlay_container').is(e.target)) {
	        $("#play_cancel_overlay_container").removeClass("overlay_container");
            $("#play_cancel_overlay_container").addClass("d-none");
	    }
	})


    $('#play_edit_cancel_overlay_container').click(function (e) {
        if ($('#play_edit_cancel_overlay_container').is(e.target)) {
	        $("#play_edit_cancel_overlay_container").removeClass("overlay_container");
            $("#play_edit_cancel_overlay_container").addClass("d-none");
	    }
	})

    $('#play_list_delete_overlay_container').click(function (e) {
        if ($('#play_list_delete_overlay_container').is(e.target)) {
	        $("#play_list_delete_overlay_container").removeClass("overlay_container");
            $("#play_list_delete_overlay_container").addClass("d-none");
	    }
	})

    $('#play_type_list_delete_overlay_container').click(function (e) {
        if ($('#play_type_list_delete_overlay_container').is(e.target)) {
	        $("#play_type_list_delete_overlay_container").removeClass("overlay_container");
            $("#play_type_list_delete_overlay_container").addClass("d-none");
	    }
	})

    $('#comments_delete_overlay_container').click(function (e) {
        if ($('#comments_delete_overlay_container').is(e.target)) {
	        $("#comments_delete_overlay_container").removeClass("overlay_container");
            $("#comments_delete_overlay_container").addClass("d-none");
	    }
	})


    $('#play_list_dots_overlay_container').click(function (e) {
        if ($('#play_list_dots_overlay_container').is(e.target)) {
	        $("#play_list_dots_overlay_container").removeClass("overlay_container");
            $("#play_list_dots_overlay_container").addClass("d-none");
	    }
	})

    $('#play_type_list_dots_overlay_container').click(function (e) {
        if ($('#play_type_list_dots_overlay_container').is(e.target)) {
	        $("#play_type_list_dots_overlay_container").removeClass("overlay_container");
            $("#play_type_list_dots_overlay_container").addClass("d-none");
	    }
	})

    $('#comments_dots_overlay_container').click(function (e) {
        if ($('#comments_dots_overlay_container').is(e.target)) {
	        $("#comments_dots_overlay_container").removeClass("overlay_container");
            $("#comments_dots_overlay_container").addClass("d-none");
	    }
	})

	$('#new_play_edit_play_name_text_overlay_container').click(function (e) {
        if ($('#new_play_edit_play_name_text_overlay_container').is(e.target)) {
	        $("#new_play_edit_play_name_text_overlay_container").removeClass("overlay_container");
            $("#new_play_edit_play_name_text_overlay_container").addClass("d-none");
	    }
	})

    $('#dots_overlay_container').click(function (e) {
        if ($('#dots_overlay_container').is(e.target)) {
	        $("#dots_overlay_container").removeClass("overlay_container");
            $("#dots_overlay_container").addClass("d-none");
	    }
	})

    $('#comment_overlay_container').click(function (e) {
        if ($('#comment_overlay_container').is(e.target)) {
	        $("#comment_overlay_container").removeClass("overlay_container");
            $("#comment_overlay_container").addClass("d-none");
	    }
	})


	$('#body_container').on('touchmove',function(e){
	    if (!isOverflown(document.getElementById("teams_list")) &&
	    	!isOverflown(document.getElementById("signup_body")) &&
	    	!isOverflown(document.getElementById("play_types_list")) &&
	    	!isOverflown(document.getElementById("plays_list")) &&
	    	!isOverflown(document.getElementById("teams_list")) &&
	    	!isOverflown(document.getElementById("new_play_files")) &&
	    	!isOverflown(document.getElementById("new_play_files_container")) &&
	    	!isOverflown(document.getElementById("new_play_description")) &&
	    	!isOverflown(document.getElementById("details_file_overlay_container")) &&
	    	!isOverflown(document.getElementById("details_file_overlay")) &&
	    	!isOverflown(document.getElementById("details_file_middle")) &&
	    	!isOverflown(document.getElementById("intro_login"))) {
	        e.preventDefault();
	    }
	});




	function isOverflown(element) {
		var overflown = element.scrollHeight > element.clientHeight
	  	return overflown;
	}


	//document.getElementById("comment_overlay_text").addEventListener('keyup', function(e) {show_send_button(e)}, false)
	document.getElementById("comment_textfield").addEventListener('keyup', function(e) {new_show_send_button(e)}, false)


	document.getElementById("play_img_container").addEventListener('touchstart', handleTouchStart, false);        
	document.getElementById("play_img_container").addEventListener('touchmove', handleTouchMove, false);

	document.getElementById("signup_fname").addEventListener('keypress', function(e) {
		if (e.which == 13) {
			console.log("enter clicked")
			document.getElementById("signup_password").focus()
		}
	})

	/*
	document.getElementById("login_fname").addEventListener('keypress', function(e) {
		if (e.which == 13) {
			console.log("enter clicked")
			document.getElementById("login_password").focus()
		}
	})*/

	document.getElementById("signup_password").addEventListener('keypress', function(e) {
		if (e.which == 13) {
			console.log("enter clicked")
			document.getElementById("signup_button").focus()
		}
	})

	document.getElementById("login_password").addEventListener('keypress', function(e) {
		if (e.which == 13) {
			console.log("enter clicked")
			document.getElementById("login_button").focus()
		}
	})


	document.getElementById("install_div_safari_close").addEventListener("click", function(e) {
	    document.getElementById("install_div_safari").className = "d-none"
	})

	

	let deferredPrompt;
	const install_div = document.getElementById('install_div');

	// Get the user-agent string 
	  let userAgentString = navigator.userAgent.toLowerCase(); 

	  // Detect Chrome 
	  let chromeAgent = userAgentString.indexOf("chrome") > -1;
	  

	  // Detect Internet Explorer 
	  let IExplorerAgent =  
	      userAgentString.indexOf("msie") > -1 ||  
	      userAgentString.indexOf("rv:") > -1; 

	  // Detect Firefox 
	  let firefoxAgent = userAgentString.indexOf("firefox") > -1; 

	  // Detect Safari 
	  let safariAgent = userAgentString.indexOf("safari") > -1; 
	        
	  // Discard Safari since it also matches Chrome 
	  if ((chromeAgent) && (safariAgent))  {
	  		console.log("YO")
	      safariAgent = false; 
	  }

	  // Detect Opera 
	  let operaAgent = userAgentString.indexOf("op") > -1; 
	        
	  // Discard Chrome since it also matches Opera      
	  if ((chromeAgent) && (operaAgent)) {
	  console.log("YO 2") 
	      chromeAgent = false;
	  }


	  
  	if (safariAgent == true) {
	    if (!window.matchMedia('(display-mode: standalone)').matches) {  
	    	document.getElementById("install_div_safari").className = "d-block nopadding"
		} else {
	    	install_div.style.visibility = "hidden";
		}
	} else {
	    install_div.style.visibility = "hidden";
	    document.getElementById("install_div_safari").className = "d-none"
	}

	window.addEventListener('beforeinstallprompt', (e) => {
	  // Prevent Chrome 67 and earlier from automatically showing the prompt
	  e.preventDefault();
	  // Stash the event so it can be triggered later.
	  deferredPrompt = e;
	  
	  // Update UI to notify the user they can add to home screen
	  install_div.style.visibility = 'visible';

	  install_div.addEventListener('click', (e) => {
	    // hide our user interface that shows our A2HS button
	    install_div.style.visibility = 'hidden';
	    // Show the prompt
	    deferredPrompt.prompt();
	    // Wait for the user to respond to the prompt
	    deferredPrompt.userChoice.then((choiceResult) => {
	        if (choiceResult.outcome === 'accepted') {
	          console.log('User accepted the A2HS prompt');
	        } else {
	          console.log('User dismissed the A2HS prompt');
	        }
	        deferredPrompt = null;
	      });
	  });

	});

	
	// check if just signed up as admin with password
	console.log("check if just signed up as admin with password")
	var login_role = parseInt($("#role").html())
	console.log("login_role: " + login_role)
	console.log("ROLE_ADMIN: " + ROLE_ADMIN)
	if (login_role==ROLE_ADMIN) {
		console.log("inside login_role==ROLE_ADMIN")
		var fname = $("#fname").html
		var email = $("#email_address").html
		var role = $("#role").html
		var user_id = $("#user_id_p").html
		// DEN HER MANGLER USER_ID 
		// NEDENSTÅENDE ER TAGET FRA CHECK_IF_USER_IN_DB_EMAIL OG SKAL BEHANDLES UDEN AJAX!
	            
	    login_user_number = user_id
	    login_user_name = fname
    	//password = res[2]
    	login_club_number = 1
    	login_club_name = "a club"

    	current_team_number = 2
    	current_team_name = "b team"
    	login_team_number = 2
    	login_team_name = "b team"

		load_teams_from_db_new(login_club_number)
		highlight_page(PLAYS_TEAM_LIST_PAGE)
		to_page(PLAYS_TEAM_LIST_PAGE)
	} else {
		to_page(INTRO_PAGE)
		check_auto_login()
	}
}

function get_local_storage() {
	club_name = localStorage.getItem("club_name")
	club_number = localStorage.getItem("club_number")
	team_name = localStorage.getItem("team_name")
	team_number = localStorage.getItem("team_number")
	user_name = localStorage.getItem("user_name")
	user_number = localStorage.getItem("user_number")
}


function add_minis_to_list() {
	file_list = document.getElementById("new_play_files")
	file_list.innerHTML = ""

	// create a mini div for each file in the play
	// insert each file in new_new_play_files
	console.log(file_order)
	console.log(list_of_files_dict)
	for (i=0;i<file_order.length;i++) {
		//file_id = file_order[i]
		file_id = loaded_ids_dict[file_order[i]]
		src = loaded_sources_dict[file_id]
		file_type = loaded_types_dict[file_id]

		file = list_of_files_dict[file_id]		
		console.log(file)

		file_description = edit_file_descriptions[file_id]
		console.log(file_description)
		if (file_description == "") {
			file_description = "no description yet"
		}
		mini_div = create_mini_div(src, file_id, file_type, file_description, file)
		file_list.appendChild(mini_div)

		// dict for each file to keep track of deleted comments
		edit_minis_dict[file_id] = mini_div
		edit_deleted_comments[file_id] = []
		edit_added_comments[file_id] = []

		console.log(file_id)
		console.log(loaded_ids_dict[file_id])
		//load_play_comments_from_db(loaded_ids_dict[file_id])
		load_play_comments_from_db(file_id)

		// set num file comments
		//num_file_comments = play_file_comments[loaded_ids_dict[file_id]].length
		num_file_comments = play_file_comments[file_id].length
		document.getElementById("mini_description_comments_"+file_id).innerHTML="Comments("+num_file_comments+")"
		
	}
	show_swap_arrows()
}


function new_clicked_dots_edit_play(e) {
	// open the same page as when creating a new play
	edit_deleted_comments = {}
	edit_deleted_files = []
	edit_added_comments = {}
	edit_minis_dict = {}
	edit_added_files = {};
	edit_list_of_files_dict = {}
	edit_loaded_types_dict = {};
	edit_loaded_figures_dict = {};
	document.getElementById("new_play_files").innerHTML = ""

	

	add_id = -1;

	to_page(EDIT_PLAY_PAGE)




	from_plays_list = (e == "plays-list")
	if (from_plays_list) {
		play_node = CLICKED_PLAY.target.parentNode
		play_id = play_node.id.split("_")[2]
		play_name = play_node.getElementsByClassName("list_main_text")[0].innerHTML
		play_description = play_node.getElementsByClassName("play_description")[0].innerHTML 

		current_play_name = play_name
		current_play_id = play_id
		current_play_description = play_description
		load_play_figures_from_db()
	} else {
		add_minis_to_list()
		edit_file_order = file_order.slice(0)// copy loaded ids into new dict
		edit_loaded_ids_dict = bestCopyEver(loaded_ids_dict)
		edit_file_descriptions = bestCopyEver(file_descriptions)
		edit_comment_divs = comment_divs
	}


	

	// close overlay
	close_overlay('dots');
	close_play_list_dots_overlay()

	// and insert the relevant info
	document.getElementById("new_play_name1").value = current_play_name
	document.getElementById("new_play_type_button").innerHTML = current_play_type_name
	document.getElementById("new_play_description").value = current_play_description
	
	// set "load files" button to "load more files"
	document.getElementById("new_play_name_button2").value = "Load more files"
}

function clicked_dots_details(e) {
	// same function as comments. Should open "file details" page
}



function clicked_dots_edit_play(e) {
	console.log("show the new edit play list item")
	open_dots_edit_play_overlay(e)
}

function clicked_dots_edit_play_type(e) {
	console.log("open custom scroller for play type")
}

function clicked_dots_edit_play_name(e) {
	console.log("open custom textfield popup for play name edit")
	document.getElementById("new_play_edit_play_name_text_overlay_container").className = "text_overlay_container"
	play_name_textfield = document.getElementById("new_play_edit_play_name_text_input")
	play_name_textfield.value = current_play_name
	play_name_textfield.focus()
}

function check_create_play() {
	var type_ok=false;
	var name_ok=false;
	var files_ok=false;

	//new_type_selection = document.getElementById("new_play_type")
	new_type_selection = document.getElementById("new_play_type_button")
	console.log(new_type_selection)

	//if (new_type_selection.value == "default") {
	if (new_type_selection.innerHTML == "Select type") {
		type_ok=false
		new_type_selection.style.border = "2px solid rgb(150,0,0)";
		document.getElementById("new_play_error_type").innerHTML = "Select play type";
	} else {
		//current_play_type_number = play_types3[new_type_selection.innerHTML]
		type_ok=true
		new_type_selection.style.border = "none";
		document.getElementById("new_play_error_type").innerHTML = "";
	}


	new_name = document.getElementById("new_play_name1")

	if (new_name.value == "") {
		name_ok=false
		new_name.style.border = "2px solid rgb(150,0,0)";
		document.getElementById("new_play_error_name").innerHTML = "Enter play name";
	} else {
		if (current_page != EDIT_PLAY_PAGE) {
			// Check here if play is already in database with that playtype!
			play_already_in_db = check_if_play_in_db(new_name.value, new_type_selection.value);
			if (play_already_in_db) {
				name_ok=false
				new_name.style.border = "2px solid rgb(150,0,0)";
				document.getElementById("new_play_error_name").innerHTML = "Play already in database!";
			} else {
				name_ok=true
				new_name.style.border = "none";
				document.getElementById("new_play_error_name").innerHTML = "";
			}
		} else {
			// edit page
			console.log("check if new play name is already taken")

			// play name hasnt been edited so new name ok
			if (current_play_name == new_name.value) {
				name_ok = true
			} else {
				// check if play type already exists for team. if that is the case. do no more
				console.log(play_names)
				console.log(new_name.value)
				var new_play_name_taken_list = Object.keys(play_names).map(function(key){
			    	return play_names[key] == new_name.value;
				});

				console.log(new_play_name_taken_list)
				if (new_play_name_taken_list.filter(n => n==true).length == 1) {
					name_ok=false
					new_name.style.border = "2px solid rgb(150,0,0)";
					document.getElementById("new_play_error_name").innerHTML = "Name already taken"
					return_on_save = false
				} else {


					name_ok=true
					new_name.style.border = "none"
					document.getElementById("new_play_error_name").innerHTML = ""
				}
			}

			// If the play type has been changed, check whether the play name is still unique in that list
			console.log(play_types)
			console.log(play_types3)
			console.log(new_type_selection.innerHTML)
			console.log(play_types3[new_type_selection.innerHTML])
			console.log(current_play_type_number)
			new_type_num = parseInt(play_types3[new_type_selection.innerHTML])
			if (new_type_num != current_play_type_number) {
				play_already_in_db = check_if_play_in_db(new_name.value, new_type_num);
				if (play_already_in_db) {
					name_ok=false
					new_name.style.border = "2px solid rgb(150,0,0)";
					document.getElementById("new_play_error_name").innerHTML = "Name for type already used";
				} else {
					name_ok=true
					new_name.style.border = "none";
					document.getElementById("new_play_error_name").innerHTML = "";
				}
			}
		}
	}
	
	file_list = document.getElementById("new_play_files")
	file_error = document.getElementById("new_play_error_load_files")
	file_load = document.getElementById("new_play_name_button2")

	console.log(file_list)
	console.log(file_list.childNodes)
	if (file_list.childNodes.length > 0) {
		files_ok = true
		file_error.innerHTML = "";
		file_load.style.border = "none";
	} else {
		files_ok = false
		file_error.innerHTML = "Load at least one file";
		file_load.style.border = "2px solid rgb(150,0,0)";
	}

	if (type_ok && name_ok && files_ok) {
		
		if (current_page != EDIT_PLAY_PAGE) {
			//current_play_type_number = new_type_selection.value
			//current_play_type_name = new_type_selection.options[new_type_selection.selectedIndex].text;
			current_play_type_name = new_type_selection.innerHTML
			current_play_type_number = play_types3[current_play_type_name]

			current_play_description = document.getElementById("new_play_description").value
			current_play_name = document.getElementById("new_play_name1").value
		}
		
		//document.getElementById("play_creation_name").innerHTML = login_user_name;
		//document.getElementById("play_creation_date").innerHTML = my_get_date();

		return true
	} else {
		return false
	}
}



function new_load_files() {
	document.getElementById("figures").onchange = function (){ addFilesToList_new(this.files)};
	$('#figures').show().focus().click().hide();
}

function clicked_on_add_new_type_button() {
	open_add_play_type_overlay(false);
	CLICKED_TYPE = ""
}

function create_team_list_button(id, name, team_tot_plays, src) {
	var list_item_team = document.createElement("div");
	list_item_team.className = "d-flex col-md-8 col-11 nopadding list_item_team"
	list_item_team.onclick = clicked_on_team_button;
	list_item_team.id = "btn_team_"+id;
    list_item_team.value = id;

	var team_img_container = document.createElement("div")
	team_img_container.className = "team_img_container col-2 nopadding"

	var team_img = new Image()

	team_img.src = src
	team_img.className = "list_item_img"
	team_img_container.appendChild(team_img)

	var team_text_div = document.createElement("div")
	team_text_div.className = "d-block nopadding"
    team_text_div.className = "list_text_div col-8 nopadding";

	var team_text_main = document.createElement('div');
	team_text_main.className = "list_main_text"
	team_text_main.innerHTML = name

	var team_text_lower = document.createElement('div');
	team_text_lower.className = "list_lower_text"
	team_text_lower.innerHTML = team_tot_plays + " plays"

	team_text_div.appendChild(team_text_main)
	team_text_div.appendChild(team_text_lower)	

    list_item_team.appendChild(team_img_container)
    list_item_team.appendChild(team_text_div)


    //make a dots button to have a popup show up if your own team
	if (id == login_team_number) {
		var dots_div = document.createElement("div")
		dots_div.className = "play_type_list_dots d-block col-2 nopadding"
		dots_div.innerHTML = "<img class='play_type_list_dots_img' src='pictures/prikker2.png'>"
		dots_div.onclick = function(e) {open_team_list_dots_overlay(e)}
		list_item_team.appendChild(dots_div)
	}

	teams_list.appendChild(list_item_team)
    return list_item_team
}



/* Loads all teams from the database */
function load_teams_from_db(login) {
	teams_list = document.getElementById("teams_list")
	console.log("loading teams from db")
	jQuery.ajax({
	    url: "php/load_teams_from_db.php?club_id="+login_club_number,
	    success: function (result) {
        	var lines = result.split("\n");
            if (lines.length > 10) {
                console.log("error");
            } else {
            	for (var i=0;i<(lines.length-3);i++) {
            		var num_and_name = lines[i].split("\t");
            		var num = num_and_name[0];
            		var name = num_and_name[1];
            		var team_tot_plays = num_and_name[2];
            		teams[num] = name;

            		num_tot_plays[num] = team_tot_plays
            		teams_num_plays[num] = team_tot_plays
            		console.log(teams_num_plays)
            		
            		src = num_and_name[3]
            		current_team_image_names[num] = src


            		var list_item_team = create_team_list_button(num, name, team_tot_plays, src)
    			    teams_buttons[num] = list_item_team;
    			    teams_list.appendChild(list_item_team)


            		team_option = document.createElement("option");
            		team_option.text = name
            		team_option.value = num
            		team_option.innerHTML = name
            		document.getElementById(login+"_team").add(team_option)
            	}
            }
        },
        async: false
    });
}


function load_clubs_from_db() {
	console.log("loading clubs from db")
	jQuery.ajax({
	    url: "php/load_clubs_from_db.php",
	    success: function (result) {
        	var lines = result.split("\n");
            if (lines.length > 10) {
                console.log("error");
            } else {
        		custom_login_club_selector = document.getElementById("custom_login_clubs_list")
        		custom_login_club_selector.innerHTML = ""
        		custom_signup_club_selector = document.getElementById("custom_signup_clubs_list")
        		custom_signup_club_selector.innerHTML = ""

            	for (var i=0;i<(lines.length-3);i++) {
            		var num_and_name = lines[i].split("\t");
            		var num = num_and_name[0];
            		var name = num_and_name[1];
            		clubs[num] = name;

            		custom_login_option = document.createElement("div");
            		custom_login_option.innerHTML = name
            		custom_login_option.id = "custom_login_club_"+num
            		custom_login_option.onclick = function(e) {set_custom_club(e, "login")}
            		custom_login_club_selector.appendChild(custom_login_option)

            		custom_signup_option = document.createElement("div");
            		custom_signup_option.innerHTML = name
            		custom_signup_option.id = "custom_signup_club_"+num
            		custom_signup_option.onclick = function(e) {set_custom_club(e, "signup")}
            		custom_signup_club_selector.appendChild(custom_signup_option)
    			}
            }
        },
        async: false
    });
}

function load_roles_from_db() {
	custom_role_selector = document.getElementById("custom_signup_roles_list")
	custom_role_selector.innerHTML = ""

	console.log("loading roles from db")
	jQuery.ajax({
	    url: "php/load_roles_from_db.php",
	    success: function (result) {
        	var lines = result.split("\n");
            if (lines.length > 10) {
                console.log("error");
            } else {
            	for (var i=0;i<(lines.length-3);i++) {
            		var num_and_name = lines[i].split("\t");
            		var num = num_and_name[0];
            		var name = num_and_name[1];
            		roles[num] = name;

            		custom_role_option = document.createElement("div");
            		custom_role_option.innerHTML = name
            		custom_role_option.id = "custom_signup_role_"+num
            		custom_role_option.onclick = function(e){set_custom_role(e)}
            		custom_role_selector.appendChild(custom_role_option)
    			}
            }
        },
        async: false
    });
}

function create_type_list_button(id, name, src, num_plays) {
	var list_item_type = document.createElement("div");
	list_item_type.className = "d-flex col-md-8 col-11 nopadding list_item_team"
	list_item_type.onclick = clicked_on_type_button
	list_item_type.id = "btn_type_"+id;
    list_item_type.value = id;

	var type_img_container = document.createElement("div")
	type_img_container.className = "team_img_container col-2 nopadding"

	var type_img = new Image()

	type_img.src = src
	type_img.className = "list_item_img"
	type_img.loading = "lazy"
	type_img_container.appendChild(type_img)


	var type_text_div = document.createElement("div")
	type_text_div.className = "d-block nopadding"
    type_text_div.className = "list_text_div col-8 nopadding";

	var type_text_main = document.createElement('div');
	type_text_main.className = "list_main_text"
	type_text_main.innerHTML = name

	var type_text_lower = document.createElement('div');
	type_text_lower.className = "list_lower_text"
	type_text_lower.innerHTML = num_plays + " plays"

	type_text_div.appendChild(type_text_main)
	type_text_div.appendChild(type_text_lower)	

    list_item_type.appendChild(type_img_container)
    list_item_type.appendChild(type_text_div)

    //make a dots button to have a popup show up if your own team
	if (current_team_number == login_team_number) {
		var dots_div = document.createElement("div")
		dots_div.className = "play_type_list_dots d-block col-2 nopadding"
		dots_div.innerHTML = "<img class='play_type_list_dots_img' src='pictures/prikker2.png'>"
		dots_div.onclick = function(e) {open_play_type_list_dots_overlay(e)}
		list_item_type.appendChild(dots_div)
	}

	play_types_list.appendChild(list_item_type)
    return list_item_type
}

/* Loads the play types of the chosen team into the list view */
function clicked_on_team_button() {
	var selected_team_number = this.value;
	var selected_team_name = this.getElementsByClassName("list_main_text")[0].innerHTML;
	current_team_number = selected_team_number;
	current_team_name = selected_team_name;
	if (current_team_number == login_team_number) {
		set_back_arrow("invisible")
	} else {
		set_back_arrow("visible")
	}

	if (prev_team_number != current_team_number) {
		load_play_types_from_db(current_team_number);
	}

	to_page(PLAYS_PLAY_TYPE_LIST_PAGE)
	update_title(PLAYS_PLAY_TYPE_LIST_PAGE)
	prev_team_number = current_team_number
}



/* Loads all play types from the databases given a particular team */
function load_play_types_from_db(team_number) {
	console.log("load_play_types_from_db")
	new_play_type_list = document.getElementById("new_play_type_list")
	new_play_type_list.innerHTML = ""

	type_buttons = {};
	play_types = {};
	play_types_list.innerHTML = ""
	jQuery.ajax({
	    url: "php/load_play_types_from_db_3.php?team="+team_number,
	    success: function (result) {
        	var lines = result.split("\n");
        	for (var i=0;i<(lines.length-1);i++) {
        		var play_type_row = lines[i].split("\t");

        		console.log(play_type_row)
        		var num = parseInt(play_type_row[0]);
        		var type = play_type_row[1]
        		var src = "php/type_images/"+play_type_row[2]
        		var num_plays = parseInt(play_type_row[3])
        		play_types[num] = type;
        		play_types3[type] = num
        		current_type_image_names[num] = src
        		types_num_plays[num] = num_plays

        		var list_item_type = create_type_list_button(num, type, src, num_plays)

			    type_buttons[num] = list_item_type;

			    custom_option = document.createElement("div");
            	custom_option.innerHTML = type
            	custom_option.id = "new_custom_option_"+num
            	custom_option.onclick=function(e){set_custom_type(e)}
            	new_play_type_list.appendChild(custom_option)
        	}
        },
        async: true
    });
}

/* Loads the plays of the chosen team and type into the list view */
function clicked_on_type_button() {
	current_play_type_name = this.getElementsByClassName("list_main_text")[0].innerHTML;
	current_play_type_number = this.id.split("_")[2];

	if (prev_play_type_number != current_play_type_number) {
		get_plays_from_db();
	}
	
	to_page(PLAYS_PLAYS_LIST_PAGE);
	update_title(PLAYS_PLAYS_LIST_PAGE)
	prev_play_type_number = current_play_type_number
}

function clicked_on_play_button() {
	ADD_FILES_LOADED = false
	current_play_name = this.getElementsByClassName("list_main_text")[0].innerHTML;
	current_play_id = this.value;
	current_play_description = this.getElementsByClassName("play_description")[0].innerHTML

	// only load play figures if theyre not already loaded
	if (prev_play_id != current_play_id) {
		document.getElementById("play_img_container").innerHTML = ""
		document.getElementById("xofy").innerHTML = ""
		load_play_figures_from_db();
	} else {
		set_file_description(file_order[0])
		set_created_by();
		set_xofy(0, new_play=false)
	}

	set_play_description();

	if (current_team_number == login_team_number) {
		document.getElementById("top_line_dots").className = "top_line_button col-2 d-block nopadding"
	}

	document.getElementById("play_bottom").className = "new_new_bottom d-flex col-12 nopadding"
	document.getElementById("play_bottom_description").className = "col-12 nopadding d-block"
	document.getElementById("top_right_show_hide").className = "col-2 d-block nopadding"

	to_page(PLAYS_PLAY_MAIN_PAGE)
	update_title(PLAYS_PLAY_MAIN_PAGE)
	prev_play_id = current_play_id
}

/* Loads all plays from the database using the chosen team and play type */
function get_plays_from_db() {
	console.log("get_plays_from_db")
	plays_list.innerHTML = ""
	console.log(current_play_type_number)
	console.log(current_team_number)
	jQuery.ajax({
	    url: "php/load_plays_from_db.php?play_type="+current_play_type_number+"&team="+current_team_number,
	    success: function (result) {
	    	console.log(result)
        	var plays_to_list = result.split("\n");
        	if (plays_to_list.length > 1) {
				play_buttons = {};
				var list_of_elements = plays_to_list.slice(0,-3);
				list_of_elements.forEach(add_play_to_list);
        	}
		},
        async: true
    });  
}


function temp_create_play_list_button(id, name, author, creation_date, description, file_id, src, file_type) {
	var list_item_play = document.createElement("div");
	list_item_play.className = "d-flex col-md-8 col-11 nopadding list_item_team"
	list_item_play.id = "btn_play_"+id;
    list_item_play.value = id;
    list_item_play.style.opacity = 0.5

	var play_img_container = document.createElement("div")
	play_img_container.className = "team_img_container col-2 nopadding"
	play_img_container.id = "team_img_container_"+id

	play_img = new Image()
	if (file_type.split("/")[0] == "image") {
		play_img.src = src
	} else if (file_type.split("/")[0] == "video") {
	    play_img.src = src
	}

	console.log(play_img)

	play_img.className = "list_item_img"
	play_img.id = "list_item_img_"+id

	play_img_container.appendChild(play_img)

	var play_text_div = document.createElement("div")
	play_text_div.className = "d-block nopadding"
    play_text_div.className = "list_text_div col-8 nopadding";

	var play_text_main = document.createElement('div');
	play_text_main.className = "list_main_text"
	play_text_main.innerHTML = name + " - CREATING"

	var play_text_lower1 = document.createElement('div');
	play_text_lower1.className = "list_lower_text"
	play_text_lower1.innerHTML = "creator: "+author + " - " + creation_date

	var play_text_lower2 = document.createElement('div');
	play_text_lower2.className = "play_description list_lower_text"
	play_text_lower2.innerHTML = description

	play_text_div.appendChild(play_text_main)
	play_text_div.appendChild(play_text_lower1)	
	play_text_div.appendChild(play_text_lower2)	

	list_item_play.appendChild(play_img_container)
    list_item_play.appendChild(play_text_div)

	//make a dots button to have a popup show up if your own team
	if (current_team_number == login_team_number) {
		var dots_div = document.createElement("div")
		dots_div.className = "play_list_dots d-block col-2 nopadding"
		dots_div.innerHTML = "<img class='play_list_dots_img' src='pictures/prikker2.png'>"
		dots_div.onclick = function(e) {open_play_list_dots_overlay(e)}
		list_item_play.appendChild(dots_div)
	}
    return list_item_play
}

function create_play_list_button(id, name, author, creation_date, description, file_id, file_type, file_name, poster_url) {
	var list_item_play = document.createElement("div");
	list_item_play.className = "d-flex col-md-8 col-11 nopadding list_item_team"
	list_item_play.onclick = clicked_on_play_button
	list_item_play.id = "btn_play_"+id;
    list_item_play.value = id;

	var play_img_container = document.createElement("div")
	play_img_container.className = "team_img_container col-2 nopadding"
	play_img_container.id = "team_img_container_"+id

	file_extension = file_name.split(".")[1]
	play_img = new Image()

	play_img.src = "php/" + poster_url

    //play_img.addEventListener('load', function(e){file_loaded_list(e, play_img_container)})
	play_img.className = "list_item_img"
	play_img.id = "list_item_img_"+id

	var loader = document.createElement("div")
	loader.className = "loader2 d-block nopadding"
	loader.id = "loader_"+id

	play_img_container.appendChild(play_img)
	//play_img_container.appendChild(loader)


	var play_text_div = document.createElement("div")
	play_text_div.className = "d-block nopadding"
    play_text_div.className = "list_text_div col-8 nopadding";

	var play_text_main = document.createElement('div');
	play_text_main.className = "list_main_text"
	play_text_main.innerHTML = name

	var play_text_lower1 = document.createElement('div');
	play_text_lower1.className = "list_lower_text"
	play_text_lower1.innerHTML = "creator: "+author + " - " + creation_date

	var play_text_lower2 = document.createElement('div');
	play_text_lower2.className = "play_description list_lower_text"
	play_text_lower2.innerHTML = description

	play_text_div.appendChild(play_text_main)
	play_text_div.appendChild(play_text_lower1)	
	play_text_div.appendChild(play_text_lower2)	

	list_item_play.appendChild(play_img_container)
    list_item_play.appendChild(play_text_div)

	//make a dots button to have a popup show up if your own team
	if (current_team_number == login_team_number) {
		var dots_div = document.createElement("div")
		dots_div.className = "play_list_dots d-block col-2 nopadding"
		dots_div.innerHTML = "<img class='play_list_dots_img' src='pictures/prikker2.png'>"
		dots_div.onclick = function(e) {open_play_list_dots_overlay(e)}
		list_item_play.appendChild(dots_div)
	}


	return list_item_play
}

// Tilføjer billeder og kommentarer så vi kan bladre dem igennem
function add_play_to_list(play) {
	console.log("add_play_to_list")
	if (play.split("\t")[1].replace(/\s/g,'').length > 1) {
		var play_columns = play.split("\t");
		var play_id = parseInt(play_columns[0])
		var play_name = play_columns[1];
		var play_author = play_columns[4]
		var play_creation_date = play_columns[2]
		var play_description = play_columns[5]
		var file_id = parseInt(play_columns[6])
		var file_type = play_columns[7]
		var file_name = play_columns[8]
		var file_num = play_columns[9]
		var poster_url = play_columns[10]
		var list_item_play = create_play_list_button(play_id, play_name, play_author, play_creation_date, play_description, file_id, file_type, file_name, poster_url)
		
		if (!(play_id in temp_play_ids)) {
			plays_list.appendChild(list_item_play)
		}

		play_names[play_id] = play_name
		play_buttons[play_id] = list_item_play;
		plays_last_edited_dict[play_id] = play_creation_date
		plays_user_id_dict[play_id] = play_columns[3];
		plays_created_by_dict[play_id] = play_author;
		play_descriptions[play_id] = play_description
	}
}



function show_file_comments(file_id) {
	comment_list = document.getElementById("comment_overlay_list")
	num_comments = play_comments_order.length
	for (var i = 0; i<num_comments;i++) {
		comment_id = play_comments_order[i]
		comment_text = play_comments_texts[comment_id]
		comment_author = play_comments_authors[comment_id]
		comment_date = play_comments_dates[comment_id]

		create_comment_div(comment_id, comment_text, comment_author, comment_date, new_play=false)
		comment_divs[file_id] = comment_div
		comment_list.appendChild(comment_div)
	}
	return num_comments
}

function load_play_comments_from_db(id) {
	console.log("in load_play_comments_from_db")
	console.log(loaded_ids_dict)
	console.log(id)
	play_comments_texts = {}
	play_comments_authors = {}
	play_comments_dates = {}
	play_comments_order = []
	comment_divs[id] = []
	jQuery.ajax({
        url: "php/load_comments_from_db.php?file_id="+id,
        success: function (result) {
            var loaded_comments = result.split("\n");
            for (var i=0; i<(loaded_comments.length-3); i++) {
                var comment_split = loaded_comments[i].split('\t');
                
                var comment_id = parseInt(comment_split[0]);
                var file_id = parseInt(comment_split[1]);
                var comment_text = comment_split[3]
                var comment_date = comment_split[4]
                var comment_author = comment_split[9]

                play_comments_texts[comment_id] = comment_text
                play_comments_authors[comment_id] = comment_author
                play_comments_dates[comment_id] = comment_date
                play_comments_order.push(comment_id)

                comment_div = create_comment_div(comment_id, comment_text, comment_author, comment_date, new_play=false)
                comment_divs[id].push(comment_div)

            }

            play_file_comments[id] = play_comments_order
        },
        async: false
    });
}

/* Loads images of a specific play in the database */
function load_play_figures_from_db() {
	console.log("load_play_figures_from_db")
	
	file_list = document.getElementById("new_play_files")

	file_order = []
	file_descriptions = {};
	play_file_comments = {};
	play_divs = {};

	formData = new FormData()
	formData.append("play_id", current_play_id)
	formData.append("team", current_team_number)
	formData.append("play_type", current_play_type_number)

    jQuery.ajax({
        url: "php/view_file.php",
        type: "POST",             // Type of request to be send, called as method
        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,
        success: function (result) {
        	console.log(result)
            var loaded_play = result.split("\\n");
            num_files = loaded_play.length-1
			
            if (!from_plays_list) {
				set_xofy(0, new_play=false, num_files)
            }
            for (var i=0; i<num_files; i++) {
                var figure_i = loaded_play[i].split('\\t');
                var dict_key = parseInt(figure_i[2]);
                file_id = parseInt(figure_i[0])
                loaded_ids_dict[file_id] = file_id;
                loaded_types_dict[file_id] = figure_i[3];
                file_type = figure_i[3]
                file_description = figure_i[4];
                file_order.push(file_id)
                file_descriptions[file_id] = file_description
                poster_extensions[file_id] = figure_i[5];
                file_extension = figure_i[1].split(".")[1]

                src = "./php/files/"+ file_id + "."+ file_extension
                loaded_sources_dict[file_id] = src;

                if (file_type.split("/")[0] == "image") {
                	file_div = new Image()
                	file_div.src = src
                	console.log(file_div)
                	/*file_div.addEventListener("click", function(event) { 
				        hide_show_info()
				  	});*/
                } else if (file_type.split("/")[0] == "video") {
                	poster_src = "php/posters/"+file_id+".jpeg"
                	file_div = document.createElement("video")
                	file_div.controls=true
                	//file_div.poster = "pictures/transparent.png"
                	file_div.poster = poster_src




                	play_container = document.getElementById("play_img_container")
                	test_width = play_container.clientWidth
                	test_height = play_container.clientHeight

                	console.log(test_width)
                	console.log(test_height)
                	file_div.width = test_width
                	file_div.height = test_height
                	source = document.createElement("source")
                	source.src = src + "#t=0.01"
                	if (file_type == "video/quicktime") {
                		file_type = "video/mp4"
                	}

					source.type = file_type
					file_div.preload = "metadata"	
					file_div.appendChild(source)
                }

                file_div.className = "file_div_class d-block nopadding"
                file_div.id = "file_div_"+file_id
                play_divs[file_id] = file_div

                // show the first div
                if (i==0) {
                	play_container = document.getElementById("play_img_container")
                	play_container.innerHTML = ""
                	play_container.appendChild(file_div)

                	if (!from_plays_list) {
                		set_file_description(file_id)
						set_created_by();
                	}
                }

                if (from_plays_list) {
                	console.log("add to edit play list here")
					file = undefined		

					if (file_description == "") {
						file_description = "no description yet"
					}

					mini_div = create_mini_div(src, file_id, file_type, file_description, file)
					file_list.appendChild(mini_div)


					// hide up down arrows if only 1 file
					arrows = mini_div.getElementsByClassName("mini_move")
					if (i==0) {
						arrows[0].style.color = "grey";
					} else {
						arrows[0].style.color = "white";
					}

					if (i==(num_files-1)) {
						arrows[1].style.color = "grey";
					} else {
						arrows[1].style.color = "white";
					} 

					// dict for each file to keep track of deleted comments
					edit_minis_dict[file_id] = mini_div
					edit_deleted_comments[file_id] = []
					edit_added_comments[file_id] = []

					console.log(file_id)
					load_play_comments_from_db(file_id)

					// set num file comments
					num_file_comments = play_file_comments[file_id].length
					document.getElementById("mini_description_comments_"+file_id).innerHTML="Comments("+num_file_comments+")"

                }
            }

            edit_file_order = file_order.slice(0)// copy loaded ids into new dict
			edit_loaded_ids_dict = bestCopyEver(loaded_ids_dict)
			edit_file_descriptions = bestCopyEver(file_descriptions)
			edit_comment_divs = comment_divs
        },
        async: true
    }); 
}



function close_overlay(div) {
	console.log("should close "+div)
	document.getElementById(div+"_overlay_container").className = "d-none";
	console.log("should update file order based on swap list")
	
	console.log(div)
	if (div == "comment") {
		console.log("hej")
		no_comments_added_yet = document.getElementById("no_comments_added_yet")
		no_comments_holder = document.getElementById("no_comments_holder")
		no_comments_holder.appendChild(no_comments_added_yet)
		console.log(no_comments_holder)
	}
	document.getElementById(div+"_overlay_list").innerHTML = "";
}

function show_new_comments(id_num, comments) {
	// clear previous comments in list
	comment_list = document.getElementById("details_comments_list")
	comment_list.innerHTML = ""

	//for each comment in comments list, add to comment_list
	for (var i=0; i < comments.length; i++) {
		comment_list.appendChild(comments[i])
	}
}

function comment_add_button_clicked() {
	comment_list = document.getElementById("details_comments_list")
	comment_textfield = document.getElementById("comment_textfield")
	comment_send = document.getElementById("comment_add_button")
	comment_text = comment_textfield.value

	var creation_date = my_get_date()

	if (current_page == EDIT_PLAY_PAGE) {
		id_num = get_current_file_id()

		edit_comment_list[new_comment_id] = [edit_loaded_ids_dict[id_num], comment_text, creation_date]
		edit_comment_list_ids.push(new_comment_id)
		comment_div = create_comment_div(edit_file_order[id_num], comment_text, login_user_name, creation_date, new_play=true)
		
		edit_comment_divs[id_num].push(comment_div)
		new_comment_id = new_comment_id - 1
		document.getElementById("details_no_comments_yet").className = "d-none"
		comment_list.appendChild(comment_div)
	} else if (current_page == PLAYS_PLAY_MAIN_PAGE) {
		add_comment()
	} else {
		id_num = get_current_file_id()
		new_comment_list[new_comment_id] = [new_file_order[id_num], comment_text, creation_date]
		new_comment_list_ids.push(new_comment_id)
		comment_div = create_comment_div(new_file_order[id_num], comment_text, login_user_name, creation_date, new_play=true)
		new_comment_divs[id_num].push(comment_div)
		new_comment_id = new_comment_id - 1
		document.getElementById("details_no_comments_yet").className = "d-none"
		comment_list.appendChild(comment_div)
	}

	comment_textfield.value = ""
	new_show_send_button()
	comment_textfield.focus()
	big_div = document.getElementById("details_file_middle")
	big_div.scrollTop = big_div.scrollHeight;
}

function add_new_comments_to_db(play_id, play_name, first_file_id) {
	console.log("add_new_comments_to_db")

    newCommentsFormData = new FormData();
    newCommentsFormData.append('play_id', play_id);
    newCommentsFormData.append('team_id', login_team_number);
    newCommentsFormData.append('play_type', current_play_type_number);
    newCommentsFormData.append('user_id', login_user_number);
    newCommentsFormData.append('user_name', login_user_name);
    newCommentsFormData.append('club_id', login_club_number);
    //newCommentsFormData.append('first_file_id', first_file_id);

    console.log(new_comment_list_ids)

    // convert temp file ids to real file_ids
    tmp_file_ids = []
    for (var i=0;i<new_comment_list_ids.length;i++) {
    	var key = new_comment_list_ids[i]
    	var comment_info = new_comment_list[key]

    	tmp_file_ids.push(comment_info[0])
    }

    uniq = [...new Set(tmp_file_ids)].sort();
    final = []
    for (var j=0;j<tmp_file_ids.length;j++){
    	idx = uniq.indexOf(tmp_file_ids[j])
    	final.push(idx+first_file_id)
    }


    for (var i=0;i<new_comment_list_ids.length;i++) {
    	var key = new_comment_list_ids[i]
    	var comment_info = new_comment_list[key]

    	var file_id = comment_info[0]
    	var converted_file_id = final[i]
    	var comment_text = comment_info[1]
    	var creation_date = comment_info[2]

        //newCommentsFormData.append('file_ids[]', file_id);
        newCommentsFormData.append('converted_file_ids[]', converted_file_id);
        newCommentsFormData.append('comment_texts[]', comment_text);
        newCommentsFormData.append('creation_dates[]', creation_date);
    }

	// Display the key/value pairs
	for (var pair of newCommentsFormData.entries()) {
	    console.log(pair[0]+ ', ' + pair[1]); 
	}

	jQuery.ajax({
        url: "php/add_new_comments_to_db.php",
        type: "POST",             // Type of request to be send, called as method
        data: newCommentsFormData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) { // A function to be called if request succeeds
            console.log(result);
        }
    });

    new_comment_list_ids = [];
	new_comment_list = {};
}

function details_get_current_file_id() {
	file_div = document.getElementById("details_file_small_img_div")
	id_num = file_div.childNodes[0].id.split("_")[2]
	return id_num
}

function add_comment() {
	console.log("inside add_comment()")

	id_num = details_get_current_file_id()

	comment_list = document.getElementById("details_comments_list")

	// start by removing the no comments added yet
	if (comment_list.childNodes.length == 0) {
		document.getElementById("details_no_comments_yet").className = "d-none"
	} 

	//comment_textfield = document.getElementById("comment_overlay_text")
	comment_textfield = document.getElementById("comment_textfield")
	comment_text = comment_textfield.value

	var creation_date = my_get_date()

	commentFormData = new FormData()
	commentFormData.append("file_id",loaded_ids_dict[id_num])
	commentFormData.append("user_id",login_user_number)
	commentFormData.append("user_name",login_user_name)
	commentFormData.append("team_id",login_team_number)
	commentFormData.append("play_id",current_play_id)
	commentFormData.append("text",comment_text)
	commentFormData.append("club_id",login_club_number)
	commentFormData.append("creation_date",creation_date)

	var comment_id = "";
	jQuery.ajax({
        url: "php/add_comment_to_db.php",
        type: "POST",             // Type of request to be send, called as method
        data: commentFormData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) { // A function to be called if request succeeds
            comment_id = result
            console.log(comment_id);
            if (comment_id == parseInt(comment_id)) {
				comment_date = my_get_date()
				create_comment_div(comment_id, comment_text, login_user_name, comment_date, new_play=false)
				comment_list.appendChild(comment_div)
				comment_textfield.value = ""

			} else {
				console.log("what the what")
				console.log(comment_id)
			}
        },
        async:false
    });

	// should be called "image_comments"
	// should load all comments into dict of some kind when a play is opened
	// as opposed to loading every time an image is opened for a given a play
	// we then just switch what is shown based on the image id shown
	// need to figure out structure of the dict(s) to take care of that
	// - will be dict[image_id][comment_id] 

	comment_text.value = "";
}

function log_out() {
	to_page(100);
	login_user_name = ""
	login_user_number = ""
	current_play_type_number = ""
	current_play_type_name = ""
	current_play_id = ""
	current_play_name = ""
	current_play_author_number = ""
	login_team_name = ""
	login_team_number = ""
	login_club_name = ""
	login_club_name = ""
	localStorage.clear();
	teams_list.innerHTML = ""
	play_types_list.innerHTML = ""
	plays_list.innerHTML = ""

	document.getElementById("custom_login_clubs_button").innerHTML = "Select club"
	document.getElementById("custom_login_teams_button").innerHTML = "Select team"


}

function delete_play_type() {
	type_node = CLICKED_TYPE.target.parentNode
	type_id = type_node.id.split("_")[2]
	console.log("delete play type if there are no plays. Otherwise show that you cant")
	console.log(play_buttons)
	if (parseInt(types_num_plays[type_id]) > 0) {
		console.log("cant delete play type")
		document.getElementById("play_type_list_delete_overlay_error").innerHTML = "cant delete play since there are plays inside the play type";
	} else {
		console.log("deleting play type")
		jQuery.ajax({
        url: "php/delete_play_type.php?play_type_id=" + type_id + "&team_id="+login_team_number,
        success: function (result) {
        	console.log(result);
        },
        async: false
    });  

		type_node.remove()
		delete type_buttons[type_id]
		close_play_type_list_delete_overlay()
		close_play_type_list_dots_overlay()
	}
}

function delete_play() {
	console.log("delete_play")
	play_node = CLICKED_PLAY.target.parentNode
	play_id = play_node.id.split("_")[2]

	jQuery.ajax({
        url: "php/delete_play.php?play_id=" + play_id + "&play_type="+current_play_type_number + "&team_id="+login_team_number,
        success: function (result) {
        	console.log(result);
        },
        async: false
    });  


	play_node.remove() 
	delete play_buttons[play_id];

    close_play_list_delete_overlay()
	close_play_list_dots_overlay()

	// reload num plays for team and for play type as these values are now outdated
	//reload_num_plays(login_team_number, current_play_type_number)
	new_type_num_plays = parseInt(types_num_plays[current_play_type_number]) - 1
	types_num_plays[current_play_type_number] = new_type_num_plays
	new_team_num_plays = parseInt(teams_num_plays[login_team_number]) - 1
	console.log(new_team_num_plays)
	console.log(teams_num_plays)
	teams_num_plays[current_team_number] = new_team_num_plays
	type_btn = document.getElementById("btn_type_"+current_play_type_number)
	type_btn.getElementsByClassName("list_lower_text")[0].innerHTML = new_type_num_plays + " plays"
	
}


function reload_num_plays(team_id, play_type) {
	console.log("reload_num_plays")
	jQuery.ajax({
        url: "php/load_num_plays.php?team_id="+team_id+"&play_type="+play_type,
        success: function (result) {
        	console.log(result);
        	num_tot_plays = result

			type_item = document.getElementById("btn_type_"+play_type)
			type_item.getElementsByClassName("list_lower_text")[0].innerHTML = " plays"        	
        },
        async: false
    });  
}

function delete_comment() {
	console.log("delete comment")

	comment_node = CLICKED_COMMENT.target.parentNode.parentNode
	comment_id = comment_node.id.split("_")[2]
	comment_node.remove() 

	if (current_page == NEW_PLAY_PAGE) {
		id_num = get_current_file_id()

		delete new_comment_list[comment_node.value]
		new_comment_list_ids = new_comment_list_ids.filter(e => e !== comment_node.value)
		new_comment_divs[id_num] = new_comment_divs[id_num].filter(e => e !== comment_node)

		num_coms = new_comment_divs[id_num].length
		if (num_coms == 0) {
			document.getElementById("details_no_comments_yet").className = "d-block col-11 nopadding"
		} else {
			document.getElementById("details_no_comments_yet").className = "d-none"
		}
	} else if (current_page == EDIT_PLAY_PAGE) {
		id_num = get_current_file_id()

		// the deletion should be kept in a list for updating if changes are saved
		edit_deleted_comments[id_num].push(comment_id)
		
	} else if (current_page == PLAYS_PLAY_MAIN_PAGE){
		jQuery.ajax({
	        url: "php/delete_comment.php?comment_id=" + comment_id,
	        success: function (result) {
	        	console.log(result);
	        },
	        async: false
	    });  

	    comment_list = document.getElementById("details_comments_list")
	    if (comment_list.childNodes.length == 0) {
	    	document.getElementById("details_no_comments_yet").className = "d-block nopadding"
	    }
	}

	close_comments_delete_overlay()
    close_comments_dots_overlay()
}


function create_comment_div(id, text, author, date_string, new_play=false) {
	comment_div = document.createElement("div")
	comment_div.className = "comment_div col-12 d-block nopadding"
	comment_div.id = "comment_div_" + id
	
	if (new_play) {
		comment_div.value = new_comment_id
	}

	comment_top_div = document.createElement("div")
	comment_top_div.className = "col-12 nopadding d-flex"


	comment_text_div = document.createElement("div")
	comment_text_div.className = "comment_item_div col-11 nopadding text-left"
	comment_text_div.innerHTML = "<span class='ct_div_author'>"+ author + "</span> " + text
	comment_text_div.value = text

	comment_dots_div = document.createElement("div")
	comment_dots_div.className = "comment_item_dots col-1 nopadding"
	comment_dots_div.onclick = function(e) {open_comments_dots_overlay(e)}

	comment_bottom_div = document.createElement("div")
	comment_bottom_div.className = "comment_bottom_div d-flex nopadding"

	comment_bottom_date = document.createElement("div")
	comment_bottom_date.innerHTML = date_string

	comment_top_div.appendChild(comment_text_div)
	comment_top_div.appendChild(comment_dots_div)
	comment_bottom_div.appendChild(comment_bottom_date)
	
	comment_div.appendChild(comment_top_div)
	comment_div.appendChild(comment_bottom_div)

	return comment_div
}


function open_dots_overlay(e) {
	document.getElementById("comments_dots_overlay_container").className = "overlay_container";
	e.stopPropagation()
	CLICKED_COMMENT = e
	console.log(e.target)
}

function open_dots_edit_play_overlay(e) {
	document.getElementById("new_play_edit_dots_overlay_container").className = "overlay_container";
}

function close_dots_edit_play_overlay() {
	document.getElementById("new_play_edit_dots_overlay_container").className = "d-none";
}

function close_details_file_overlay() {
	id_num = details_get_current_file_id()

	if (current_page == PLAYS_PLAY_MAIN_PAGE) {
		num_coms = comment_divs[id_num].length

		file = document.getElementById("details_file_small_img_div").childNodes[0]
		document.getElementById("play_img_container").appendChild(file)

	} else if (current_page == EDIT_PLAY_PAGE) {
		num_delete_comments = edit_deleted_comments[id_num].length
		num_coms = edit_comment_divs[id_num].length - num_delete_comments


		file = document.getElementById("mini_file_"+id_num)
		if (file.classList.contains("is_video")) {
			file.controls=false
		}
		file.style.pointerEvents = "none";

		div_clicked = document.getElementById("mini_id_num_"+id_num)
		div_clicked.getElementsByClassName("mini_file_container")[0].appendChild(file)

	} else { // new play
		num_coms = new_comment_divs[id_num].length

		file = document.getElementById("mini_file_"+id_num)
		console.log(file)
		console.log(file.classList)
		if (file.classList.contains("is_video")) {
			file.controls=false
		}
		file.style.pointerEvents = "none";

		div_clicked = document.getElementById("mini_id_num_"+id_num)
		div_clicked.getElementsByClassName("mini_file_container")[0].appendChild(file)
	
	}

	if (current_page == PLAYS_PLAY_MAIN_PAGE) {
		description = document.getElementById("details_description_textarea").value
		document.getElementById("play_bottom_file_description").innerHTML = description
	} else {
		document.getElementById("mini_description_comments_"+id_num).innerHTML = "Comments("+num_coms+")"
		
		description = document.getElementById("details_description_textarea").value
		if (description != "") {
			document.getElementById("mini_description_text_"+id_num).innerHTML = description
			
			if (current_page == EDIT_PLAY_PAGE) {
				edit_file_descriptions[id_num] = description
			} else if (current_page == PLAYS_PLAY_MAIN_PAGE) {
				file_descriptions[id_num] = description
			} else {
				new_file_descriptions[id_num] = description
			}
		} else {
			document.getElementById("mini_description_text_"+id_num).innerHTML = "No description yet"
		}
	}

	document.getElementById("details_file_overlay_container").className = "d-none";

	// remove the image/video currently there in case a video is running
	//document.getElementById("details_file_small_img").src = ""
	//document.getElementById("details_file_small_vid").src = ""
	
}

function open_details_file_overlay(src, id_num, file_type) {
	document.getElementById("details_comments_list").innerHTML = ""
	if (current_page == EDIT_PLAY_PAGE) {
		// enable the file's description
		document.getElementById("details_description_textarea").style.backgroundColor = "rgb(39,54,74)"
		document.getElementById("details_description_textarea").disabled = false

		//load_play_comments_from_db(id_num)
		num_coms = edit_comment_divs[id_num].length
		comments = edit_comment_divs[id_num]

		// remove the deleted comments from the num_coms and the comments to be shown
		ids_to_remove = edit_deleted_comments[id_num]
		comments = comments.filter(function(comment) {
			comment_id = comment.id.split("_")[2]
			return !ids_to_remove.includes(comment_id)
		})


		description = edit_file_descriptions[id_num]

		// show edited file description if there is one

		show_new_comments(id_num, comments)

		div_holder = document.getElementById("details_file_small_img_div")
		div_clicked = document.getElementById("mini_id_num_"+id_num)
		file = div_clicked.getElementsByClassName("mini_img")[0]
		console.log(file)
		console.log(div_clicked)
		if (file.classList.contains("is_video")) {
			file.controls=true
			file.style.pointerEvents = "auto";
		}
		div_holder.appendChild(file)

	} else if (current_page == PLAYS_PLAY_MAIN_PAGE) {

		// disable the file's description
		document.getElementById("details_description_textarea").style.backgroundColor = "rgb(60,110,140)"
		document.getElementById("details_description_textarea").disabled = true

		num_coms = comment_divs[id_num].length
		comments = comment_divs[id_num]
		description = file_descriptions[id_num]

		// show_file_comments()
		console.log("show_file_comments called")
		comment_list = document.getElementById("details_comments_list")
		num_comments = play_comments_order.length
		for (var i = 0; i<num_comments;i++) {
			comment_id = play_comments_order[i]
			comment_text = play_comments_texts[comment_id]
			comment_author = play_comments_authors[comment_id]
			comment_date = play_comments_dates[comment_id]

			create_comment_div(comment_id, comment_text, comment_author, comment_date, new_play=false)
			comment_divs[id_num] = comment_div
			comment_list.appendChild(comment_div)
		}

		div_holder = document.getElementById("details_file_small_img_div")
		file = play_divs[id_num]
		div_holder.appendChild(file)

	} else { // new play

		// enable the file's description
		document.getElementById("details_description_textarea").style.backgroundColor = "rgb(39,54,74)"
		document.getElementById("details_description_textarea").disabled = false



		num_coms = new_comment_divs[id_num].length
		comments = new_comment_divs[id_num]
		description = new_file_descriptions[id_num]
		show_new_comments(id_num, comments)

		div_holder = document.getElementById("details_file_small_img_div")
		div_clicked = document.getElementById("mini_id_num_"+id_num)
		file = div_clicked.getElementsByClassName("mini_img")[0]
		console.log(file)
		console.log(div_clicked)
		if (file.classList.contains("is_video")) {
			file.controls=true
			file.style.pointerEvents = "auto";
		}
		div_holder.appendChild(file)
	}


	if (description == "no description yet") {
		document.getElementById("details_description_textarea").value = ""
	} else {
		document.getElementById("details_description_textarea").value = description
	}
	
	
	if (num_coms == 0) {
		document.getElementById("details_no_comments_yet").className = "d-block col-11 nopadding"
	} else {
		document.getElementById("details_no_comments_yet").className = "d-none"
	}

	document.getElementById("details_file_overlay_container").className = "overlay_container";
}


function close_comments_dots_overlay(e) {
	document.getElementById("comments_dots_overlay_container").className = "d-none";
}

function open_comments_dots_overlay(e) {
	document.getElementById("comments_dots_overlay_container").className = "overlay_container";
	e.stopPropagation()
	CLICKED_COMMENT = e
}


function open_play_list_dots_overlay(e) {
	CLICKED_PLAY = e

	document.getElementById("play_list_dots_overlay_container").className = "overlay_container";
	e.stopPropagation()
}

function open_play_type_list_dots_overlay(e) {
	CLICKED_TYPE = e
	document.getElementById("play_type_list_dots_overlay_container").className = "overlay_container";
	e.stopPropagation()
}

function close_play_type_list_dots_overlay(e) {
	CLICKED_TYPE = ""
	document.getElementById("play_type_list_dots_overlay_container").className = "d-none";
}

function open_team_list_dots_overlay(e) {
	CLICKED_TEAM = e
	document.getElementById("team_list_dots_overlay_container").className = "overlay_container";
	e.stopPropagation()
}

function close_team_list_dots_overlay(e) {
	CLICKED_TEAM = ""
	document.getElementById("team_list_dots_overlay_container").className = "d-none";
}



function close_play_list_dots_overlay(e) {
	CLICKED_PLAY = ""
	document.getElementById("play_list_dots_overlay_container").className = "d-none";
}

function open_comments_delete_overlay(e) {
	document.getElementById("comments_delete_overlay_container").className = "overlay_container";
}

function close_comments_delete_overlay() {
	document.getElementById("comments_delete_overlay_container").className = "d-none";
	CLICKED_COMMENT = ""
}

function open_play_list_delete_overlay() {
	document.getElementById("play_list_delete_overlay_container").className = "overlay_container";
}

function open_play_type_list_delete_overlay() {
	document.getElementById("play_type_list_delete_overlay_container").className = "overlay_container";
}

function close_play_type_list_delete_overlay() {
	document.getElementById("play_type_list_delete_overlay_container").className = "d-none";
	document.getElementById("play_type_list_delete_overlay_error").innerHTML = "";
	CLICKED_TYPE = ""
}

function open_add_players_overlay() {
	document.getElementById("add_players_overlay_container").className = "overlay_container";
	document.getElementById("team_list_dots_overlay_container").className = "d-none";
}

function close_add_players_overlay() {
	document.getElementById("add_players_overlay_container").className = "d-none";
	console.log("clear stuff inside add players overlay")
}

function check_emails() {
	console.log("check that emails are correct format")
	return true
}

function check_invite_text() {
	console.log("check that the text has correct format")
	return true
}

function invite_players() {
	console.log("should invite players now!")

	if (check_emails() && check_invite_text()) {

		emails = $("#emails_input").val()
		invite_text = $("#add_invite_text_input").val()


		console.log(emails)
		console.log(invite_text)

		formDataInvite = new FormData();
    	formDataInvite.append('emails',emails);
    	formDataInvite.append('invite_text',invite_text);
    	formDataInvite.append('club_name',login_club_name);

    	for (var key of formDataInvite.entries()) {
        	console.log(key[0] + ', ' + key[1]);
    	}

    	jQuery.ajax({
        url: "php/invite_players_email.php",
        type: "POST",             // Type of request to be send, called as method
        data: formDataInvite, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        	console.log("change view to 'invites were sent' or something")
        },
        async: true
    });

	}
}

function open_add_play_type_overlay(is_edit) {
	overlay = document.getElementById("type_list_add_overlay")
	if (is_edit) {
		type_node = CLICKED_TYPE.target.parentNode
		type_id = type_node.id.split("_")[2]
		type_name = type_node.getElementsByClassName("list_main_text")[0].innerHTML
		type_src = current_type_image_names[type_id]

		overlay.getElementsByClassName("overlay_title")[0].innerHTML = "Edit play type"
		overlay.getElementsByClassName("list_textfield")[0].value = type_name
		overlay.getElementsByClassName("yes_button")[0].innerHTML = "Save changes"
		overlay.getElementsByTagName("img")[0].src = type_src
	}

	document.getElementById("type_list_add_overlay_container").className = "overlay_container";
	document.getElementById("play_type_list_dots_overlay_container").className = "d-none";
}

function close_add_play_type_overlay() {
	overlay = document.getElementById("type_list_add_overlay")
	overlay.getElementsByClassName("overlay_title")[0].innerHTML = "Create play type"
	overlay.getElementsByClassName("yes_button")[0].innerHTML = "Create"

	document.getElementById("type_list_add_overlay_container").className = "d-none";
	document.getElementById("add_type_input").value = ""
	document.getElementById("type_list_add_img").src = "pictures/app-icon-white.png"
	clearFileInput(document.getElementById("type_list_add_load"));
}

function close_edit_play_type_overlay() {
	document.getElementById("type_list_add_overlay_container").className = "d-none";
	document.getElementById("add_type_input").value = ""
	document.getElementById("type_list_add_img").src = "pictures/app-icon-white.png"
	clearFileInput(document.getElementById("type_list_add_load"));
}

function close_play_list_delete_overlay() {
	document.getElementById("play_list_delete_overlay_container").className = "d-none";
}

function open_cancel_play_overlay() {

	if (current_page == EDIT_PLAY_PAGE) {
		document.getElementById("play_edit_cancel_overlay_container").className = "overlay_container";
	} else {
		//type_val = document.getElementById("new_play_type").value
		type_val = document.getElementById("new_play_type_button").innerHTML
		name_val = document.getElementById("new_play_name1").value
		descr_val = document.getElementById("new_play_description").value
		num_files = document.getElementById("new_play_files").childNodes.length
		//if ((type_val == "default") && (name_val == "") && (descr_val == "") && (num_files == 0)) {
		if ((type_val == "Select type") && (name_val == "") && (descr_val == "") && (num_files == 0)) {
			cancel_play()
		} else {
			document.getElementById("play_cancel_overlay_container").className = "overlay_container";
		}
	}
}

function close_cancel_play_overlay() {
	if (current_page == EDIT_PLAY_PAGE) {
		document.getElementById("play_edit_cancel_overlay_container").className = "d-none";
		CLICKED_ICON = 0
	} else if (CLICKED_ICON != 0) {
		document.getElementById("play_edit_cancel_overlay_container").className = "d-none";
		CLICKED_ICON = 0
	} else {
		document.getElementById("play_cancel_overlay_container").className = "d-none";
	}
}


function open_delete_overlay(file_div) {
	id_num = file_div.id.split("_")[3]
	CLICKED_FILE = file_div
	document.getElementById("delete_file_overlay_container").className = "overlay_container"

	div_holder = document.getElementById("delete_file_small_img_div")
	div_clicked = document.getElementById("mini_id_num_"+id_num)
	file = div_clicked.getElementsByClassName("mini_img")[0]
	if (file.classList.contains("is_video")) {
		file.controls=true
		file.style.pointerEvents = "auto";
	}
	div_holder.appendChild(file)
}

function close_delete_overlay() {
	id_num = CLICKED_FILE.id.split("_")[3]
	document.getElementById("delete_file_overlay_container").className = "d-none";
	console.log(CLICKED_FILE)

	file = document.getElementById("mini_file_"+id_num)
	console.log(file)
	if (file.classList.contains("is_video")) {
		file.controls=false
	}
	file.style.pointerEvents = "none";

	CLICKED_FILE = ""
	div_clicked = document.getElementById("mini_id_num_"+id_num)
	div_clicked.getElementsByClassName("mini_file_container")[0].appendChild(file)
}

function show_swap_arrows() {
	// hide up down arrows if only 1 file
	file_list = document.getElementById("new_play_files")
	console.log(file_list)
	num_files = file_list.childNodes.length
	if (num_files == 1) {
		only_file = file_list.childNodes[0]
		arrows = only_file.getElementsByClassName("mini_move")
		arrows[0].style.color = "grey";
		arrows[1].style.color = "grey";
	} else if (num_files > 1) {
		first_file = file_list.childNodes[0]
		arrows = first_file.getElementsByClassName("mini_move")
		arrows[0].style.color = "grey";
		last_file = file_list.childNodes[num_files-1]
		arrows = last_file.getElementsByClassName("mini_move")
		arrows[1].style.color = "grey";
	}
}

function new_play_delete_file() {
	file_list = document.getElementById("new_play_files")
    id_num = CLICKED_FILE.id.split("_")[3]

    if (current_page == EDIT_PLAY_PAGE) {
    	file_list.removeChild(edit_minis_dict[id_num])

    	edit_deleted_files.push(parseInt(edit_loaded_ids_dict[id_num]))
    	delete edit_loaded_ids_dict[id_num]

    	index_to_remove = edit_file_order.indexOf(id_num)
    	edit_file_order.splice(index_to_remove,1);

    	if (edit_file_order.length == 0) {
			document.getElementById("new_play_name_button2").value = "Load files"
		}
    } else {
    	file_list.removeChild(new_loaded_minis_dict2[id_num])

    	delete new_loaded_figures_dict[id_num];
	    delete new_loaded_minis_dict[id_num];
	    delete new_loaded_types_dict[id_num];

		delete new_list_of_files_dict[id_num];
	    delete new_file_order_comments_dict[id_num];
	    delete new_file_order_sizes_dict[id_num];
	    delete new_file_order_types_dict[id_num];

	    delete new_comment_list[id_num]
	    delete new_comment_divs[id_num]
	    delete new_loaded_minis_dict2[id_num]

	    index_to_remove = new_file_order.indexOf(id_num)
    	new_file_order.splice(index_to_remove,1);

    	if (new_file_order.length == 0) {
			document.getElementById("new_play_name_button2").value = "Load files"
		}
    }
	close_overlay("dots")

	CLICKED_FILE.remove()
	document.getElementById("delete_file_overlay_container").className = "d-none";
	file_holder = document.getElementById("delete_file_small_img_div")
	file_holder.innerHTML = ""
	CLICKED_FILE = ""

	show_swap_arrows()
}

function show_comments() {
	id_num = get_current_file_id()
	load_play_comments_from_db(id_num)
	open_new_comment_overlay(id_num)
}

function open_new_comment_overlay(id_num) {
	console.log("OPEN_NEW_COMMENT_OVERLAY")
	file_type = loaded_types_dict[id_num].split("/")[0]
	src = loaded_sources_dict[id_num]
	open_details_file_overlay(src, id_num, file_type)
}


function get_current_file_id() {
	file_div_id = document.getElementById("play_img_container").getElementsByClassName("file_div_class")[0].id
	id_num = parseInt(file_div_id.split("_")[2])
	return id_num
}

function add_images_show(show_init) {
	console.log("inside add_images_show")
	console.log(show_init)

	if (show_init) {
		document.getElementById("new_play_image_div").className = "d-none";
    	document.getElementById("init_upload").className = "button new_button col-5 nopadding";
    } else {
		document.getElementById("new_play_image_div").className = "d-block";
    	document.getElementById("init_upload").className = "d-none";	
    }
}

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}


function move_mini(file_div, direction) {
	file_list = document.getElementById("new_play_files")
	file_div_id_num = file_div.id.split("_")[3]
	file_list_len = file_list.childNodes.length

	if (current_page == EDIT_PLAY_PAGE) {
		order_to_use = edit_file_order
	} else {
		order_to_use = new_file_order_temp
	}

	pos = order_to_use.indexOf(parseInt(file_div_id_num))
	new_pos = pos + direction

	if ((new_pos >= 0) && (new_pos < (file_list_len))) {
		// swap pos in file order
		order_to_use.swap(pos, new_pos)

		// swap visual position
		other_div = file_list.childNodes[new_pos]

		old_arrows = file_div.getElementsByClassName("mini_move")
		new_arrows = other_div.getElementsByClassName("mini_move")
		
		temp_arrow_up = old_arrows[0].style.color
		temp_arrow_down = old_arrows[1].style.color
		old_arrows[0].style.color = new_arrows[0].style.color
		old_arrows[1].style.color = new_arrows[1].style.color
		new_arrows[0].style.color = temp_arrow_up
		new_arrows[1].style.color = temp_arrow_down
		

		if (direction == 1) {
			file_list.insertBefore(other_div, file_div)
		} else if (direction == -1) {
			file_list.insertBefore(file_div, other_div)
		}
	}
}

function create_mini_div_loader(num) {
	var mini_div = document.createElement("div")
	mini_div.className = "mini_div col-12 d-flex nopadding"
	mini_div.id = "mini_loader_"+num
	mini_div.innerHTML = "<div id='mini_loader' class='loader d-block nopadding'></div>"
	return mini_div
}

function create_mini_div(src, id_num, file_type, file_description, file) {
	console.log(file)
	console.log(file === undefined)

	var mini_div_container = document.createElement("div")
	var mini_div = document.createElement("div")
	var right_side = document.createElement("div")
	var remove_x = document.createElement("div")
	var move_up = document.createElement("div")
	var move_down = document.createElement("div")
	

	mini_div_container.id = "mini_id_num_"+id_num

	var mini_div_error = document.createElement("div")
	mini_div_error.className = "mini_div_error error_text d-none"
	if (file != undefined) {
		if (file.name.split(".")[1] == "webm") {
			mini_div_error.className = "mini_div_error error_text d-block"
			mini_div.style.border = "1px solid rgb(150,0,0)"
			mini_div_error.innerHTML = "'.webm' file-extension not supported on iPhone"
		}
	}
	

	var mini_description_container = document.createElement("div")
	var mini_description_title = document.createElement("div")
	//var mini_description_textarea = document.createElement("textarea")
	var mini_description_text = document.createElement("div")
	var mini_description_comments = document.createElement("div")

	var file_container = document.createElement("div")

	if ((file_type.split("/")[0] == "image") || (file_type == 2)) {
		var file_elem = new Image()
		file_elem.id = "mini_file_"+id_num
		file_elem.className = "is_image"
		file_elem.src = src
	} else if ((file_type.split("/")[0] == "video") || (file_type == 1)) {
		var file_elem = document.createElement("video")
		file_elem.id = "mini_file_"+id_num
		file_elem.className = "is_video"
		//file_elem.preload = "none"
		console.log("im here")
		file_elem.controls = false

		var source = document.createElement("source")
		source.id = "test"
		//source.src = src
  		
		// REMEMBER THIS
		if (file === undefined) {
  			source.setAttribute("src", src);
  			file_elem.setAttribute("src", src);
		} else {
  			source.setAttribute("src", URL.createObjectURL(file));
  			file_elem.setAttribute("src", URL.createObjectURL(file));
		}

  		console.log(file_elem.videoHeight)
  		console.log(file_elem.videoWidth)

		file_elem.muted = true
		file_elem.load()
		file_elem.pause()
	    //source.setAttribute("src", poster);
		

		if (file_type == "video/quicktime") {
			file_type = "video/mp4"
		}
		source.type = file_type

		//file_elem.appendChild(source)// = '<source id="test" src="'+src+'#t=0.1" type="'+file_type+'"></source>'
		file_elem.preload = "none"
	}

	mini_div.id = "mini_id_num_" + id_num;
	mini_div.className = "mini_div col-12 d-flex nopadding"

	mini_description_container.className = "mini_description col-6 nopadding"
	mini_description_container.onclick=function() {open_details_file_overlay(src, id_num, file_type)}

	mini_description_title.className = "mini_description_title col-12 nopadding"
	mini_description_title.innerHTML = "Description"

	mini_description_text.className = "mini_description_text"

	if (file_description == "") {
		file_description = "no description yet"
	}
	mini_description_text.innerHTML = file_description
	mini_description_text.id = "mini_description_text_"+id_num

	mini_description_comments.className = "mini_description_comments"
	mini_description_comments.id = "mini_description_comments_"+ id_num
	mini_description_comments.innerHTML = "Comments (0)"
	//mini_description_comments.onclick=function() {open_new_comment_overlay(id_num)}


	right_side.className = "mini_right d-block col-1 nopadding"

	remove_x.className = "mini_remove nopadding"
	remove_x.id = "mini_remove_"+id_num
	remove_x.innerHTML = "<img class='overlay_close' src='pictures/close.png'>"
	remove_x.onclick=function() {open_delete_overlay(this.parentNode.parentNode)}

	move_up.className = "mini_move nopadding"
	move_up.id = "mini_move_up_"+id_num
	move_up.innerHTML = '<i class="fa-rotate-90 fa fa-chevron-left"></i>'
	move_up.onclick=function() {move_mini(this.parentNode.parentNode.parentNode, -1)}
	
	move_down.className = "mini_move nopadding"
	move_down.id = "mini_move_down_"+id_num
	move_down.innerHTML = '<i class="fa-rotate-90 fa fa-chevron-right"></i>'
	move_down.onclick=function() {move_mini(this.parentNode.parentNode.parentNode, 1)}

	
	file_container.className = "mini_file_container d-flex col-4 nopadding"

	file_elem.className="mini_img d-block nopadding"
	console.log("setting src")
	//file_elem.src = src
	console.log("source set")
	file_container.onclick=function() {open_details_file_overlay(src, id_num, file_type)}
	file_elem.style.pointerEvents = "none";
	

	

	mini_description_container.appendChild(mini_description_title)
	mini_description_container.appendChild(mini_description_text)
	mini_description_container.appendChild(mini_description_comments)

	file_container.appendChild(file_elem)
	right_side.appendChild(remove_x)
	right_side.appendChild(move_up)
	right_side.appendChild(move_down)
	mini_div.appendChild(file_container)
	mini_div.appendChild(mini_description_container)
	mini_div.appendChild(right_side)
	mini_div_container.appendChild(mini_div)
	mini_div_container.appendChild(mini_div_error)

	return mini_div_container
}

function dragging_mini(e) {
	console.log("draagging!")
}

function new_create_comment_div(id) {
	var new_comment_div_list = document.createElement("div")
	new_comment_div_list.id = "new_comment_div_"+id
	new_comment_div_list.className = "d-none"
	//document.getElementById("new_comment_overlay_list").appendChild(new_comment_div_list)
}


var files;
var reader;
var loaded_files;
var num_files_to_load;
var id_to_show;
var error_occured;


function LoadMiniImage(files) {
	file = files[0]
	console.log(file)
	console.log("hello world")
	if (!file.type.match('image.*')) {
		console.log("not an image loaded")
	} else {
		var reader = new FileReader();
        reader.onload = (function(theFile) {
        	var dataURL = reader.result;
        	new_play_type_image = theFile
    	    return function(e) {
    	    	new_play_type_img_src = e.target.result
    	    	document.getElementById("type_list_add_img").src = e.target.result // file_src
    	    }
    	})(file);
    	reader.readAsDataURL(file);
	}
}

// only for edit
function addFilesToList_edit(files) {
	var i, f;
	num_files_to_load = files.length
	loaded_files = 0;

	// Loop through the Files
    for (i = 0, f; f = files[i]; i++) {
        if ((!f.type.match('image.*')) &&
        	(!f.type.match('video.*'))) {
        	console.log("error loading files")
            continue;
        }

        var reader = new FileReader();
        reader.onload = (function(theFile) {
            var dataURL = reader.result;
            return function(e) {
                edit_list_of_files_dict[add_id] = theFile;
                edit_file_order.push(add_id);

                edit_loaded_ids_dict[add_id] = add_id

                edit_file_descriptions[add_id] = "no description yet";
                edit_file_order_sizes_dict[add_id] = theFile.size;
                edit_file_order_types_dict[add_id] = theFile.type;

                file_type = theFile.type.split("/")[0]


                edit_loaded_types_dict[add_id] = file_type
                
                mini_div = create_mini_div(e.target.result, add_id, file_type, "no description yet", theFile)
                edit_loaded_minis_dict[add_id] = mini_div
            	document.getElementById("new_play_files").appendChild(mini_div)
                
                edit_loaded_figures_dict[add_id] = e.target.result // file_src
                
            	edit_comment_divs[add_id] = []

                file_count = file_count + 1;
                add_id = add_id - 1;

                loaded_files = loaded_files + 1;

                ADD_FILES_LOADED = true
            };
        })(f);
        reader.readAsDataURL(f); // Read in the image file as a data URL.
    }

    if (files.length > 0) {
    	processFiles_new(0)
    	load_button = document.getElementById("new_play_name_button2")
    	load_button.value = "Load more files"
    	load_button.style.border = "none";
    	document.getElementById("new_play_error_load_files").innerHTML = ""
    }
}



// only for new plays
function addFilesToList_new(files) {
	if (current_page == EDIT_PLAY_PAGE) {
		addFilesToList_edit(files)
	} else {
		minis_holder = document.getElementById("new_play_files")
		var i, file;
		num_files_to_load = files.length
		loaded_files = 0;
	    error_occured = 0
	    new_file_order_temp = new_file_order.slice(0)
	    var pre_max_id = Math.max.apply(Math, new_file_order_temp);
	    if (pre_max_id < 0) {
	    	add_id = 0
	    } else {
	    	add_id = pre_max_id + 1
	    }

		// Loop through the Files
	    for (i = 0, file; file = files[i]; i++) {
	        if ((!file.type.match('image.*')) &&
	        	(!file.type.match('video.*'))) {
	        	console.log("error loading files")
	            continue;
	        }

	        var reader = new FileReader();
	        reader.onerror = function() {
	        	document.getElementById("top_line_text").style.color = "red"
	        }

	        reader.onloadend = (function(theFile) {
	            return function(e) {
	            	//console.log(reader.result)
	            	//console.log(theFile)
	                new_list_of_files_dict[add_id] = theFile;


	                new_file_order_temp.push(add_id);
	                new_file_order_comments_dict[add_id] = [];
	                new_file_descriptions[add_id] = "no description yet";
	                file_size = theFile.size
	                file_type1 = theFile.type;
	                new_file_order_sizes_dict[add_id] = file_size;
	                new_file_order_types_dict[add_id] = file_type1;
	                file_type = file_type1.split("/")[0]
	                file_source = e.target.result


	                new_loaded_types_dict[add_id] = file_type
	                new_loaded_figures_dict[add_id] = file_source 
	            	new_create_comment_div(add_id)

	                new_mini_div = create_mini_div(file_source, add_id, file_type1, "no description yet", theFile)
	                new_loaded_minis_dict2[add_id] = new_mini_div
	            	minis_holder.appendChild(new_mini_div)
	                
	            	new_comment_divs[add_id] = []



	                file_count = file_count + 1;
	                add_id = add_id + 1;

                	document.getElementById("mini_loader_"+loaded_files).remove()
	                loaded_files = loaded_files + 1;
	                ADD_FILES_LOADED = true
	            };
	        })(file);
	        //*/
	        reader.readAsDataURL(file); // Read in the image file as a data URL.
	    }

	    if (files.length == 0) {
	    	if (new_file_order_temp.length == 0) {
	    		console.log("files0, file_order0")
	    		//document.getElementById("new_play_name_button").value = "Load files"
	    		document.getElementById("new_play_name_button2").value = "Load more files"
	    	} else {
	    		console.log("files0, file_order not")
	    		// rename the load files from name/type page to "go to files"
		    	//document.getElementById("new_play_name_button").value = "Go to files"
		    	document.getElementById("new_play_name_button2").value = "Load more files"
	    	}
	    } else {
	    	// rename the load files from name/type page to "go to files"

	    	// show "loading files" somehow
	    	for (var j=0;j<files.length;j++) {
	    		mini_div_loader = create_mini_div_loader(j)
	    		minis_holder.appendChild(mini_div_loader)
	    	}

	    	processFiles_new(0)
		    //document.getElementById("new_play_name_button").value = "Go to files"
	    	
	    }
    }
}


function processFiles_new(show_id) {
	if (loaded_files == num_files_to_load) {
		console.log("all loaded!")
		document.getElementById("top_right_button").className = "col-2 nopadding";
		load_button = document.getElementById("new_play_name_button2")
    	load_button.value = "Load more files"
    	load_button.style.border = "none";
    	document.getElementById("new_play_error_load_files").innerHTML = ""
		
    	// show up down arrows if more than 1 file
    	file_list = document.getElementById("new_play_files")
    	num_files = file_list.childNodes.length
		console.log(file_list.childNodes)
		
		show_swap_arrows()
		


		if (current_page == EDIT_PLAY_PAGE) {
			console.log("fisk")
		} else {
			if (num_files_to_load <= 1) {
				new_file_order = new_file_order_temp.slice(0);
				console.log(new_file_order)
				//show_new_image(show_id,true)
			} else {
				//open_swap_overlay()
				new_file_order = new_file_order_temp.slice(0);
				console.log(new_file_order)
				//show_new_image(show_id,true)
			}
		}
	} else if (error_occured > 50) {
		console.log("ERROR LOADING")
	} else {
		error_occured = error_occured + 1
		console.log("window timeout")
		window.setTimeout(function() {processFiles_new(show_id)}, 400)
	}
}


function show_new_image(id, new_play) {

	if (new_play) {
		file_type = new_loaded_types_dict[id]
		if (file_type == "image") {
			new_play_img = document.getElementById("new_play_image")
			new_play_img.src = new_loaded_figures_dict[id]
			new_play_img.className = "d-block nopadding"

			document.getElementById("new_play_video").className = "d-none"

		} else if (file_type == "video") {
			console.log("HERE IS THE ERROR")
			init_fig = document.getElementById("new_play_video")
			init_fig.src = new_loaded_figures_dict[id];
			init_fig.className = "d-block nopadding"
			document.getElementById("new_play_image").className = "d-none";
		}
		//add_images_show(false)
	} else {
		file = play_divs[id]
		play_container = document.getElementById("play_img_container")
		img_loader = document.getElementById("img_loader")
		loader_holder = document.getElementById("loader_holder")
		loader_holder.appendChild(img_loader)
		play_container.innerHTML = ""
		play_container.appendChild(file)
	}

	set_file_description(id);
	set_created_by();
	set_xofy(file_order.indexOf(id), new_play)
}

function set_file_description(file_id) {
	console.log("set_file_description called")
	console.log(file_descriptions)

	document.getElementById("play_bottom_file_description").innerHTML = file_descriptions[file_id]
}

function set_play_description() {
	document.getElementById("play_bottom_play_description").innerHTML = play_descriptions[current_play_id]
}

function set_created_by() {
	console.log("set created by called")
	author = plays_created_by_dict[current_play_id]
	date = plays_last_edited_dict[current_play_id]
	document.getElementById("play_creation_name").innerHTML = author
	document.getElementById("play_creation_date").innerHTML = date
}

function set_xofy(file_index, new_play=true, num_plays=-1) {
	tot_files = file_order.length
	if (num_plays != -1) {
		tot_files = num_plays
	}
	document.getElementById("xofy").innerHTML = (file_index+1)+" / "+tot_files
}


function change_image(direction, new_play) {
	id_num = get_current_file_id()
	new_id = file_order[(file_order.indexOf(id_num) + direction)]
	
	if (new_id === undefined) {
		console.log("dont change image")
	} else {
		show_new_image(new_id, new_play)
	}
}

function clear_add_dicts() {
	list_of_files_dict = {};
	new_loaded_figures_dict = {};
	new_loaded_minis_dict = {};
	new_loaded_types_dict = {};
	file_order_comments_dict = {};
	file_order_sizes_dict = {};
	file_order_types_dict = {};

	new_file_order = [];
	new_list_of_files_dict = {};
	new_file_order_comments_dict = {};
	new_file_order_sizes_dict = {};
	new_file_order_types_dict = {};

}

function clear_add_pages(){
	if (current_page != EDIT_PLAY_PAGE) {
		clear_add_dicts();
	}

	document.getElementById("new_play_type_button").innerHTML = "Select type"
	document.getElementById("new_play_type_button").style.border = "";
	
	document.getElementById("new_play_name1").value = ""
	document.getElementById("new_play_name1").style.border = "";
	
	document.getElementById("new_play_description").value = ""
	document.getElementById("new_play_error_name").innerHTML = "";
	document.getElementById("new_play_error_type").innerHTML = "";
	document.getElementById("new_play_name_button2").value = "Load files"
	document.getElementById("new_play_files").innerHTML = "";
}










////// Login stuff below ///////







function set_profile(from_page) {
	if (from_page == "login") {
		document.getElementById("profile_club_text").innerHTML = login_club_name
		document.getElementById("profile_team_text").innerHTML = login_team_name
		document.getElementById("profile_fname_text").innerHTML = login_user_name
	} else if (from_page == "signup") {
		document.getElementById("profile_club_text").innerHTML = signup_club_name
		document.getElementById("profile_team_text").innerHTML = signup_team_name
		document.getElementById("profile_fname_text").innerHTML = signup_user_name
	}

}


function clear_login_and_signup() {
	document.getElementById("login_fname").value = ""
	document.getElementById("login_password").value = ""
	document.getElementById("signup_fname").value = ""
	document.getElementById("signup_password").value = ""
}

function signup_club_check_input_fields() {
	console.log("signup_club_check_input_fields")
	// check club is entered
	signup_club_club = $("#signup_club_club")
	console.log(signup_club_club)
	signup_club_error_club = $("#signup_club_error_club")
	if (signup_club_club.val() != "") {
		signup_club_error_club.html("")
		signup_club_club.css("border", "none");
		signup_club_club_ok = true
	} else {
		signup_club_club.css("border", "2px solid  rgb(150,0,0)");
		signup_club_error_club.html("please enter club name")
		signup_club_club_ok = false
	}


	// check email is entered and correct format
	signup_club_email = $("#signup_club_email")
	signup_club_error_email = $("#signup_club_error_email")
	if (signup_club_email.val() != "") {
		signup_club_error_email.html("");
		signup_club_email.css("border", "none");
		signup_club_email_ok = true

		console.log("check for email format here!")
	} else {
		signup_club_email.css("border", "2px solid  rgb(150,0,0)");
		signup_club_error_email.html("please enter email address")
		signup_club_email_ok = false
	}

	// check email is entered and correct format
	signup_club_message = $("#signup_club_message")
	signup_club_error_message = $("#signup_club_error_message")
	if (signup_club_message.val() != "") {
		signup_club_error_message.html("");
		signup_club_message.css("border", "none");
		signup_club_message_ok = true

	} else {
		signup_club_message.css("border", "2px solid  rgb(150,0,0)");
		signup_club_error_message.html("please enter email address")
		signup_club_message_ok = false
	}

	console.log((signup_club_club_ok && signup_club_email_ok && signup_club_message_ok))
	return (signup_club_club_ok && signup_club_email_ok && signup_club_message_ok)

}


function signup_check_input_fields() {
	console.log("check if club and team set")
	signup_club = document.getElementById("custom_signup_clubs_button")
	
	if (signup_club.innerHTML == "Select club") {
		document.getElementById("signup_error_club").innerHTML = "Select Club";
		signup_club.style.border = "2px solid  rgb(150,0,0)";
		club_ok = false
	} else {
		document.getElementById("signup_error_club").innerHTML = "";
		signup_club.style.border = "none";
		club_ok = true
	}


	signup_team = document.getElementById("custom_signup_teams_button")
	if (signup_team.innerHTML == "Select team") {
		document.getElementById("signup_error_team").innerHTML = "Select Team";
		signup_team.style.border = "2px solid  rgb(150,0,0)";
		team_ok = false
	} else {
		document.getElementById("signup_error_team").innerHTML = "";
		signup_team.style.border = "none";
		team_ok = true
	}

	signup_role = document.getElementById("custom_signup_roles_button")
	if (signup_role.innerHTML == "Select role") {
		document.getElementById("signup_error_role").innerHTML = "Select Role";
		signup_role.style.border = "2px solid  rgb(150,0,0)";
		role_ok = false
	} else {
		document.getElementById("signup_error_role").innerHTML = "";
		signup_role.style.border = "none";
		role_ok = true
	}

	console.log("first check if field is filled, otherwise check db for existence")
	signup_fname = document.getElementById("signup_fname")
	if (signup_fname.value == "") {
		document.getElementById("signup_error_fname").innerHTML = "Enter first name";
		signup_fname.style.border = "2px solid  rgb(150,0,0)";
		fname_ok = false
	} else {
		if (check_if_user_in_db("signup", signup_club_number, signup_team_number, signup_fname.value)) {
			console.log("signup not OK. send error message");
    		document.getElementById("signup_error_fname").innerHTML = "User already exists"
			signup_fname.style.border = "2px solid  rgb(150,0,0)";
			fname_ok = false
		} else {
			document.getElementById("signup_error_fname").innerHTML = "";
			signup_fname.style.border = "none";
			fname_ok = true
		}
	}

	console.log("first check if field is filled, otherwise check db for correctness")
	if (document.getElementById("signup_password").value == "") {
		document.getElementById("signup_error_password").innerHTML = "Enter team password";
		document.getElementById("signup_password").style.border = "2px solid  rgb(150,0,0)";
		password_ok = false
	} else {
		typed_password = document.getElementById("signup_password").value
		if (team_password_ok(signup_team.innerHTML, typed_password)) {
			document.getElementById("signup_error_password").innerHTML = "";
			document.getElementById("signup_password").style.border = "none";
			password_ok = true
		} else {
			document.getElementById("signup_error_password").innerHTML = "Team password incorrect"
			document.getElementById("signup_password").style.border = "2px solid  rgb(150,0,0)";
			password_ok = false
		}
	}

	console.log((club_ok && team_ok && fname_ok && password_ok && role_ok))
	return (club_ok && team_ok && fname_ok && password_ok && role_ok)
}

function team_password_ok(entered_team, entered_password) {
	mens_password = "defense"
	ladies_password = "work"
	u15_u17_password = "briks"
	u15_2_password = "basketball"

	return (((entered_team == "U15 Boys 2") && (entered_password == u15_2_password)) ||
			((entered_team == "U15/U17 Boys") && (entered_password == u15_u17_password)) ||
			((entered_team == "Ladies") && (entered_password == ladies_password)) ||
			((entered_team == "Men") && (entered_password == mens_password)))
	 
}

function set_local_storage(is_login) {
	if (is_login) {
		localStorage.setItem('club_name',login_club_name);
		localStorage.setItem('club_number',login_club_number);

		localStorage.setItem('team_name',login_team_name);
		localStorage.setItem('team_number',login_team_number);

		localStorage.setItem('user_name',login_user_name);
		localStorage.setItem('user_number',login_user_number);
	} else {
		localStorage.setItem('club_name',signup_club_name);
		localStorage.setItem('club_number',signup_club_number);

		localStorage.setItem('team_name',signup_team_name);
		localStorage.setItem('team_number',signup_team_number);

		localStorage.setItem('user_name',signup_user_name);
		localStorage.setItem('user_number',signup_user_number);
	}
}

function signup_button_clicked() {	
	if (signup_check_input_fields()) {
		current_team_name = signup_team_name
		current_team_number = signup_team_number
		login_team_name = current_team_name
		login_team_number = current_team_number

		add_user_to_db()
		load_play_types_from_db(current_team_number);
		highlight_page(301)
		set_profile("signup")
		to_page(301, true)
		set_local_storage(false)
		clear_login_and_signup()
	}
}

function signup_club_button_clicked() {	
	if (signup_club_check_input_fields()) {
		clear_login_and_signup()
		to_page(104)
		

		// send email to tell that the invitation was received
		email_address = $("#signup_club_email").val()
		club_name = $("#signup_club_club").val()
		message = $("#signup_club_message").val()

		console.log(email_address)
		console.log(club_name)
		console.log(message)
		formDataSignup = new FormData();
    	formDataSignup.append('email_address',email_address);
    	formDataSignup.append('club_name',club_name);
    	formDataSignup.append('message',message);

    	for (var key of formDataSignup.entries()) {
        	console.log(key[0] + ', ' + key[1]);
    	}

    	jQuery.ajax({
        url: "php/signup_verification_email.php",
        type: "POST",             // Type of request to be send, called as method
        data: formDataSignup, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false,        // To send DOMDocument or non processed data file it is set to false
        success: function(result) {
        	console.log(result);
        },
        async: true
    });

	}
}


function login_button_clicked_email() {
	check_if_user_in_db_email() 
}

function login_button_clicked() {
	if (login_check_input_fields()) {
		console.log("login!")
		login_user_name = document.getElementById("login_fname").value
		current_team_name = login_team_name
		current_team_number = login_team_number
		set_local_storage(true)
		load_play_types_from_db(current_team_number);
		//load_new_play_types_from_db();
		highlight_page(301)
		set_profile("login")
		to_page(301, true)
		clear_login_and_signup()
	}
}

function check_auto_login() {
	get_local_storage()

	if (user_name != null) {
		console.log("should login!")
		login_user_name = user_name
		login_user_number = user_number
		login_club_name = club_name
		login_club_number = club_number
		login_team_name = team_name
		login_team_number = team_number 
		current_team_name = login_team_name
		current_team_number = login_team_number
		console.log(login_team_number)

		load_teams_from_db_new(login_club_number, "login")
		load_play_types_from_db(current_team_number);
		highlight_page(301)
		set_profile("login")
		to_page(301, true)
		clear_login_and_signup()

		document.getElementById("install_div_safari").className = "d-none"
		prev_team_number = current_team_number


	} else {
		console.log(user_name)
	}
}





function login_check_input_fields() {
	var club_ok, team_ok, fname_ok, password_ok = false;
	console.log("check if club and team set")
	if (document.getElementById("custom_login_clubs_button").innerHTML == "Select club") {
		document.getElementById("login_error_club").innerHTML = "Select Club";
		document.getElementById("custom_login_clubs_button").style.border = "2px solid  rgb(150,0,0)";
		club_ok = false
	} else {
		document.getElementById("login_error_club").innerHTML = "";
		document.getElementById("custom_login_clubs_button").style.border = "none";
		club_ok = true
	}

	login_team = document.getElementById("custom_login_teams_button")
	if (login_team.innerHTML == "Select team") {
		document.getElementById("login_error_team").innerHTML = "Select Team";
		document.getElementById("custom_login_teams_button").style.border = "2px solid  rgb(150,0,0)";
		team_ok = false
	} else {
		document.getElementById("login_error_team").innerHTML = "";
		document.getElementById("custom_login_teams_button").style.border = "none";
		team_ok = true
	}

	console.log("first check if field is filled, otherwise check db for existence")
	login_fname = document.getElementById("login_fname")
	if (login_fname.value == "") {
		document.getElementById("login_error_fname").innerHTML = "Enter first name";
		login_fname.style.border = "2px solid  rgb(150,0,0)";
		fname_ok = false
	} else {
		if (!check_if_user_in_db("login", login_club_number, login_team_number, login_fname.value)) {
			console.log("login not OK. send error message");
    		document.getElementById("login_error_fname").innerHTML = "User doesn't exist"
			login_fname.style.border = "2px solid  rgb(150,0,0)";
			fname_ok = false
		} else {
			document.getElementById("login_error_fname").innerHTML = "";
			login_fname.style.border = "none";
			fname_ok = true
		}
	}

	console.log("first check if field is filled, otherwise check db for correctness")
	if (document.getElementById("login_password").value == "") {
		document.getElementById("login_error_password").innerHTML = "Enter team password";
		document.getElementById("login_password").style.border = "2px solid  rgb(150,0,0)";
		password_ok = false
	} else {
		typed_password = document.getElementById("login_password").value
		if (team_password_ok(login_team.innerHTML, typed_password)) {
			document.getElementById("login_error_password").innerHTML = "";
			document.getElementById("login_password").style.border = "none";
			password_ok = true
		} else {
			document.getElementById("login_error_password").innerHTML = "Team password incorrect"
			document.getElementById("login_password").style.border = "2px solid  rgb(150,0,0)";
			password_ok = false
		}
	}
	console.log((club_ok && team_ok && fname_ok && password_ok))
	return (club_ok && team_ok && fname_ok && password_ok)
}


function role_chosen() {
	document.getElementById("signup_fname").disabled = false;
	document.getElementById("signup_fname").focus()
}


function fname_written(page) {
	if (page == "signup") {
		//document.getElementById("signup_nname").disabled = false;
		document.getElementById("signup_password").disabled = false;
	} else if (page == "login") {
		document.getElementById("login_password").disabled = false;
	}
}




/* Adds a new type of play to the database using the selected team */
function add_user_to_db() {
    var c = signup_club_number;
    var t = signup_team_number;
    var r = signup_role_number;
    var fn = document.getElementById("signup_fname").value

    jQuery.ajax({
        url: "php/add_user_to_db.php?club="+c+"&team="+t+"&role="+r+"&fname="+fn+"&nname=x",
        success: function (result) {
            login_user_number = result;
        },
        async: false
    });  
    login_user_name = fn;
}


function check_if_user_in_db_email() {
	var email = $("#login_email")
	var password = $("#login_password")

	jQuery.ajax({
        url: "php/check_if_user_in_db_email.php?email_address="+email.val()+"&password="+password.val(),
        success: function (result) {
            console.log("result", result);
            var res = result.split("\t");
            if (res.length > 1) {
            	login_user_number = res[0]
            	login_user_name = "name"
            	email_address = res[1]
            	password = res[2]
            	login_club_number = res[3]
            	club_name = "a club"

            	current_team_number = res[4]
            	current_team_name = "b team"
            	login_team_number = current_team_number
            	login_team_name = current_team_name
            	role = res[5]
            	first_name = res[6]
				document.getElementById("profile_club_text").innerHTML = club_name
				document.getElementById("profile_team_text").innerHTML = current_team_number
				document.getElementById("profile_fname_text").innerHTML = first_name
				document.getElementById("profile_role_text").innerHTML = role
				
				document.getElementById("login_error_email").innerHTML = "";
				document.getElementById("login_error_password").innerHTML = "";
				email.css("border","none")

            	console.log("login email!!")
				login_user_name = document.getElementById("login_email").value
				//current_team_name = login_team_name
				//current_team_number = login_team_number
				//set_local_storage(true)
				load_teams_from_db_new(login_club_number)
				//load_play_types_from_db(current_team_number);
				highlight_page(PLAYS_TEAM_LIST_PAGE)
				//set_profile("login")
				to_page(PLAYS_TEAM_LIST_PAGE)
				//clear_login_and_signup()
            } else {
            	console.log("user not in db i guess!")
            	document.getElementById("login_error_email").innerHTML = "Email or password incorrect";
				email.css("border","2px solid  rgb(150,0,0)");
            }

        },
        async: false
    }); 
}

function check_if_user_in_db(page, club, team, user_name) {
	var users_in_db = 0
	jQuery.ajax({
        url: "php/check_if_user_in_db.php?club="+club+"&team="+team+"&fname="+user_name,
        success: function (result) {
            console.log("result", result);
            var res = result.split("\t");
            users_in_db = res[0]

            if (page == "signup") {
            	signup_user_name = user_name
            	signup_user_number = res[1]
            } else if (page == "login") {
            	login_user_number = res[1]
            	login_user_name = user_name
            }
        },
        async: false
    }); 
    return users_in_db>0
}

function check_if_play_in_db(play_name, play_type) {
	var c = login_club_number;
	var t = login_team_number;
	var pt = play_type;
	var pn = play_name;

	var play_in_db = 0
	jQuery.ajax({
        url: "php/check_if_play_in_db.php?club="+c+"&team="+t+"&play_type="+pt+"&play_name="+pn,
        success: function (result) {
            console.log("result", result);
            play_in_db = result
        },
        async: false
    }); 
    return play_in_db>0
}







// Utility stuff


function replace_spaces(a_string) {
    return a_string.replace(/ /g, "+");
}

function replace_spaces_with_comma(a_string) {
    return a_string.replace(/ /g, ",");
}

function my_get_date() {
	var d = new Date();
	var year = d.getFullYear().toString()
    var month = ("0" + (d.getMonth()+1)).slice(-2);
    var date = ("0" + d.getDate()).slice(-2);
    var hour = ("0" + d.getHours()).slice(-2);
    var minute = ("0" + d.getMinutes()).slice(-2);
    return date + "."+month+". " + year + " " + hour + ":" + minute

}




var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

// Handles the initiation of finger touch on the screen (or a mouse for that matter)
// Simply sets the xDown and yDown variables to the current position of the touch
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

// Handles the movement of a finger on the screen (or a mouse for that matter)
// changes the showing figure based on the swipe movement
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

	tot_files = file_order.length
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        	if (current_page == PLAYS_PLAY_MAIN_PAGE) {
        		change_image(1, false)
        	} else {
        		change_image(1, true)
        	}
        } else {
			if (current_page == PLAYS_PLAY_MAIN_PAGE) {
        		change_image(-1, false)
        	} else {
        		change_image(-1, true)
        	}
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

// Checks whether the dict "obj" is empty or not
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

// checks equality of two arrays
var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

function bestCopyEver(src) {
  return Object.assign({}, src);
}



// 1 = IMG_CLICK
// 2 = BUTTON CLICK
function hide_show_info(click_num) {
	IMG_CLICK = 1
	BUTTON_CLICK = 2
	btn = document.getElementById("top_right_show_hide")
	
	console.log(click_num)
	if (click_num == IMG_CLICK) {
		img_container = document.getElementById("play_img_container")
		if (img_container.getElementsByTagName("video").length > 0) {
			console.log("dont do stuff")
			// dont do show/hide
		} else {
			document.getElementById("play_img_container").classList.toggle('hide_other_stuff2')
			console.log(" do stuff")
			if (btn.innerHTML == "Hide info") {
				btn.innerHTML = "Show info" 
			} else {
				btn.innerHTML = "Hide info"
			}
		}
	} else {
		document.getElementById("play_img_container").classList.toggle('hide_other_stuff2')
		if (btn.innerHTML == "Hide info") {
			btn.innerHTML = "Show info" 
		} else {
			btn.innerHTML = "Hide info"
		}
	}
	

	
	//document.getElementById("play_image").classList.toggle('hide_other_stuff')
}

function show_options(page, option) {
	if (document.getElementById("custom_"+page+"_"+option+"s_list").childNodes.length>0) {
		btn = document.getElementById("custom_"+page+"_"+option+"s_list")
	    btn.classList.toggle("show_dropdown");
	    btn1 = document.getElementById("custom_"+page+"_"+option+"s_button")
	    btn1.classList.toggle("borderbottom");
	}
}

function type_show_options() {
	if (document.getElementById("new_play_type_list").childNodes.length>0) {
		btn = document.getElementById("new_play_type_list")
	    btn.classList.toggle("show_dropdown");
	    btn1 = document.getElementById("new_play_type_button")
	    btn1.classList.toggle("borderbottom");
	}
}


function set_custom_club(e, page) {
	if (page == "login") {
		login_club_name = e.target.innerHTML
		login_club_number = e.target.id.split("_")[3]
		load_teams_from_db_new(login_club_number, page)
		document.getElementById("custom_"+page+"_clubs_button").innerHTML = login_club_name
	} else {
		signup_club_name = e.target.innerHTML
		signup_club_number = e.target.id.split("_")[3]
		load_teams_from_db_new(signup_club_number, page)
		document.getElementById("custom_"+page+"_clubs_button").innerHTML = signup_club_name
	}

	document.getElementById("custom_"+page+"_clubs_list").classList.toggle("show_dropdown");
  	document.getElementById("custom_"+page+"_clubs_button").classList.toggle("borderbottom");
}

function set_custom_role(e) {
  	signup_role_name = e.target.innerHTML
	signup_role_number = e.target.id.split("_")[3]

	role_button = document.getElementById("custom_signup_roles_button");
	role_button.innerHTML = signup_role_name;
	document.getElementById("custom_signup_roles_list").classList.toggle("show_dropdown");
  	role_button.classList.toggle("borderbottom");

}

function set_custom_team(e, page) {
	if (page == "login") {
		login_team_name = e.target.innerHTML
		login_team_number = e.target.id.split("_")[3]
		document.getElementById("custom_"+page+"_teams_button").innerHTML = login_team_name
	} else {
		signup_team_name = e.target.innerHTML
		signup_team_number = e.target.id.split("_")[3]
		document.getElementById("custom_"+page+"_teams_button").innerHTML = signup_team_name
		load_roles_from_db()
	}

	document.getElementById("custom_"+page+"_teams_list").classList.toggle("show_dropdown");
  	document.getElementById("custom_"+page+"_teams_button").classList.toggle("borderbottom");
}

function set_custom_type(e) {
	new_type_name = e.target.innerHTML;
	new_type_number = e.target.id.split("_")[3]

	if (current_page != EDIT_PLAY_PAGE) {
		current_play_type_number = new_type_number
		current_play_type_name = new_type_name
	}

	document.getElementById("new_play_type_button").innerHTML = new_type_name
	document.getElementById("new_play_type_button").style.border = "none"
	document.getElementById("new_play_error_type").innerHTML = ""

	document.getElementById("new_play_type_list").classList.toggle("show_dropdown");
  	document.getElementById("new_play_type_button").classList.toggle("borderbottom");
}




// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtnX')) {
    var dropdowns = document.getElementsByClassName("dropdown-contentX");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show_dropdown')) {
        openDropdown.classList.remove('show_dropdown');
        
      }
    }
    var dropbtns = document.getElementsByClassName("dropbtnX");
    for (i = 0; i < dropbtns.length; i++) {
      var openDropBtn = dropbtns[i];
      if (openDropBtn.classList.contains('borderbottom')) {
        openDropBtn.classList.remove('borderbottom');
        
      }
    }
  }
}



/* Loads all teams from the database */
function load_teams_from_db_new(club_number, page) {
	console.log("load_teams_from_db_new")
	//custom_team_selector = document.getElementById("custom_"+page+"_teams_list")
	//custom_team_selector.innerHTML = ""

	jQuery.ajax({
	    url: "php/load_teams_from_db.php?club_id="+club_number,
	    success: function (result) {
        	var lines = result.split("\n");
            if (lines.length > 10) {
                console.log("error");
            } else {
            	for (var i=0;i<(lines.length-3);i++) {
            		var num_and_name = lines[i].split("\t");
            		var num = num_and_name[0];
            		var name = num_and_name[1];
            		var team_tot_plays = num_and_name[2];
            		teams[num] = name;

            		num_tot_plays[num] = team_tot_plays
            		teams_num_plays[num] = team_tot_plays
            		src = "php/team_images/"+num_and_name[3]
            		current_team_image_names[num] = src

            		var list_item_team = create_team_list_button(num, name, team_tot_plays, src)
    			    teams_buttons[num] = list_item_team;
    			    teams_list.appendChild(list_item_team)

            		custom_option = document.createElement("div");
            		custom_option.innerHTML = name
            		custom_option.id = "custom_"+page+"_team_"+num
            		custom_option.onclick = function(e) {set_custom_team(e,page)}
            		//custom_team_selector.appendChild(custom_option)
            	}
            }
        },
        async: false
    });
}


function clearFileInput(ctrl) {
  try {
    ctrl.value = null;
  } catch(ex) { }
  if (ctrl.value) {
    ctrl.parentNode.replaceChild(ctrl.cloneNode(true), ctrl);
  }
}
