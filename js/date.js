
/* Converts month number to month names */
function month_num_to_name(month_num) {
	console.log("MONTH NUM " + month_num);
	switch(month_num) {
    case 1:
    	month = "Jan";
    	break;
    case 2:
    	month = "Feb";
    	break;
    case 3:
    	month = "Mar";
    	break;
    case 4:
    	month = "Apr";
    	break;
    case 5:
    	month = "May";
    	break;
    case 6:
    	month = "Jun";
    	break;
    case 7:
    	month = "Jul";
    	break;
    case 8:
    	month = "Aug";
    	break;
    case 9:
    	month = "Sep";
    	break;
    case 10:
    	month = "Oct";
    	break;
    case 11:
    	month = "Nov";
    	break;
    case 12:
    	month = "Dec";
    }
    return month;
}

/* Rewrites the date to a prettier version for the frontend */
function rewrite_date(date) {
	var time_and_day = date.split(",");
    var time = time_and_day[0];
    var day = time_and_day[1];
	console.log("day", day);
	var mdy = day.split("-");
    var m = mdy[0];
    var d = mdy[1];
    var y = mdy[2];
	var month = month_num_to_name(parseInt(m));
	var new_date = month + " " + d + " " + y;
	return new_date;
}