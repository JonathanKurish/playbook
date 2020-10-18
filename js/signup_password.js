


window.onload = () => {
	console.log("onload function")
	invite = document.getElementById("invite")
	console.log(invite)

}

function confirm_password() {
	first_password = $("#password").val()
	second_password = $("#confirm_password").val()

	if (second_password == first_password) {
		$("#login_error_confirm_password").html("")
	} else {
		$("#login_error_confirm_password").css("color", "red")
		$("#login_error_confirm_password").html("Passwords do not match. Please try again")
	}

	return (second_password == first_password)
}

function check_password() {
	password = $("#password").val()
	if (password.length < 8) {
		$("#login_error_password").css("color", "red")
		$("#login_error_password").html("Password must be at least 8 characters long")
		return false
	} else if (!password.match(/^[a-z0-9]+$/i)) {
		$("#login_error_password").css("color", "red")
		$("#login_error_password").html("Only numbers (0-9) and letters (a-z) are valid")
		return false
	} else {
		$("#login_error_password").html("")
		return true
	}

}


function fname_written() {
	fname = document.getElementById("login_fname")
	if (fname.value.length == 0) {
		document.getElementById("login_error_fname").innerHTML = "Write your first name"
		document.getElementById("login_error_fname").style.color = "red"
	}  else {
		document.getElementById("login_error_fname").innerHTML = ""
	}
}

function accept_password_clicked() {
	ok_password = check_password()
	equal_passwords = confirm_password()

	if (ok_password && equal_passwords) {
		console.log("now update the password for the user/email and log in as admin")

		email_address = $("#email_address").html()
		user_id = $("#user_id_p").html()
		password = $("#password").val()
		first_name = $("#login_fname").val()
		formData = new FormData();
    	formData.append('user_id', user_id);
    	formData.append('email_address', email_address);
    	formData.append('password', password);
    	formData.append('first_name', first_name);

    	for (var pair of formData.entries()) {
		    console.log(pair[0]+ ', ' + pair[1]); 
		}

    	jQuery.ajax({
	        url: "php/set_password.php",
	        type: "POST",             // Type of request to be send, called as method
	        data: formData, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
	        contentType: false,       // The content type used when sending data to the server.
	        cache: false,             // To unable request pages to be cached
	        processData:false,
	        success: function (result) {
	        	console.log(result);
	        	console.log("now log in as admin role")
	        	loc = 'index.php?role=1&email_address='+email_address+"&first_name="+first_name+"&user_id="+user_id
	        	window.location.replace(loc);
	        },
        	async: true
	    }); 
	}
}