var mousePressed = false;
var lastX, lastY;
var ctx;
var canvas
var history
var redo_list;
var undo_list;
var x_list;
var o_list
var current_background = 1
var canvas_height = window.innerHeight - 100
var canvas_width = window.innerWidth
var canvas_offset_width = 0
var canvas_offset_height = 0
var FreeIsSet = true
var LineIsSet = false
var DribbleIsSet = false
var lineWidth = 3

var XisSet = false
var Xsize = 5

var OisSet = false
var Osize = 5

function backToPlaybook() {
    console.log("backToPlaybook")
    $('#whiteboard_div').addClass("d-none")
    $('#whiteboard_div').removeClass("overlay_container")
}

function whiteboardInit() {
    $('#whiteboard_div').removeClass("d-none")
    $('#whiteboard_div').addClass("overlay_container")

    ctx = document.getElementById('myCanvas').getContext("2d");
    canvas = document.getElementById('myCanvas')
    canvas.width = canvas_width
    canvas.height = canvas_height
    background = new Image();
    background.src = "whiteboard/fullcourt2.png"
    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
        ctx.drawImage(background,canvas_offset_width,canvas_offset_height, canvas_width, canvas_height);   
    }

    redo_list = []
    undo_list = []
    x_list = []
    o_list = []

    //left = document.getElementById("left")
    //right = document.getElementById("right")
    //dragula([left, right]);
    //dragula([document.getElementById(left), document.getElementById(right)]);
    

    console.log("test")
  
    document.getElementById('undo').addEventListener('click', function() {
        console.log("clicked undo")
        undo(canvas, ctx);
    });

  
    document.getElementById('redo').addEventListener('click', function() {
        console.log("clicked redo")
        redo(canvas, ctx);
    });

    /*
    document.getElementById('swap-background').addEventListener('click', function() {
        console.log("clicked swap background")
        swapBackground(canvas, ctx);
    });*/


    $('#myCanvas').mousedown(function (e) {
        saveState(canvas);
        console.log("mousedown called")
        console.log("FreeIsSet", FreeIsSet)
        console.log("DribbleIsSet", DribbleIsSet)
        console.log("XisSet", XisSet)
        
        if (XisSet) {
            SetX(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top)
            console.log("place X in X-list")
        } else if (OisSet) {
            SetO(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top)
        } else {
            mousePressed = true;
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);   
        }

    });

    $('#myCanvas').on('touchstart', function(e){
        saveState(canvas);
        e.preventDefault()
        console.log("touchstart called")
        console.log("FreeIsSet", FreeIsSet)
        console.log("DribbleIsSet", DribbleIsSet)
        console.log("XisSet", XisSet)

        pageX = e.originalEvent.touches[0].pageX
        pageY = e.originalEvent.touches[0].pageY

        if (XisSet) {
            SetX(pageX - $(this).offset().left, pageY - $(this).offset().top)
        } else if (OisSet) {
            SetO(pageX - $(this).offset().left, pageY - $(this).offset().top)
        } else {
            mousePressed = true;
            
            //Draw(75, 75, false);
            Draw(pageX - $(this).offset().left, pageY - $(this).offset().top, false);
            //Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);   
        }


        //document.getElementById("selWidth").style.border = "1px solid red"
        mousePressed = true;
        //Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        
    });


    $('#myCanvas').mousemove(function (e) {
        if (mousePressed && !XisSet && !OisSet) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').on('touchmove', function(e){
        e.preventDefault()
        //document.getElementById("selWidth").style.border = "1px solid green"
        if (mousePressed && !XisSet && !OisSet) {
            if (FreeIsSet) {
                pageX = e.originalEvent.touches[0].pageX
                pageY = e.originalEvent.touches[0].pageY
                Draw(pageX - $(this).offset().left, pageY - $(this).offset().top, true);
            } else if (DribbleIsSet) {
                pageX = e.originalEvent.touches[0].pageX
                pageY = e.originalEvent.touches[0].pageY
                DrawDribble(pageX - $(this).offset().left, pageY - $(this).offset().top, true);
            }
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });
        $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').on('touchend', function(e){
        e.preventDefault()
        //document.getElementById("selWidth").style.border = "1px solid blue"
        mousePressed = false;
    });
}

function saveState(canvas, list, keep_redo) {
        keep_redo = keep_redo || false;
        if(!keep_redo) {
            redo_list = [];
        }
          
        (list || undo_list).push(canvas.toDataURL());   
    }

    function undo(canvas, ctx) {
        restoreState(canvas, ctx, undo_list, redo_list);
    }

    function redo(canvas, ctx) {
        restoreState(canvas, ctx, redo_list, undo_list);
    }

    function restoreState(canvas, ctx,  pop, push) {
        if(pop.length) {
            saveState(canvas, push, true);
            var restore_state = pop.pop();
            console.log(restore_state)
            var img = new Image()
            img.src = restore_state
            img.onload = function() {
                ctx.clearRect(canvas_offset_width, canvas_offset_height, canvas_width, canvas_height);
                ctx.drawImage(img, canvas_offset_width, canvas_offset_height, canvas_width, canvas_height, canvas_offset_width, canvas_offset_height, canvas_width, canvas_height);  
            }
        }
    }

function DrawDribble(x,y,isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.setLineDash([5,15]);
        
        //ctx.strokeStyle = $('#selColor').val();
        //ctx.lineWidth = $('#selWidth').val();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.lineDashOffset = 4;
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();

        ctx.lineDashOffset = 0;
        ctx.setLineDash([]);
        
        //ctx.strokeStyle = $('#selColor').val();
        //ctx.lineWidth = $('#selWidth').val();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x; lastY = y;
}

function SetX(x, y) {
    console.log("in setX")
        ctx.beginPath();
        //ctx.strokeStyle = $('#selColor').val();
        //ctx.lineWidth = $('#selWidth').val();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.moveTo(x-Xsize, y-Xsize);
        ctx.lineTo(x+Xsize, y+Xsize);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        //ctx.strokeStyle = $('#selColor').val();
        //ctx.lineWidth = $('#selWidth').val();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = lineWidth;
        ctx.lineJoin = "round";
        ctx.moveTo(x-Xsize, y+Xsize);
        ctx.lineTo(x+Xsize, y-Xsize);
        ctx.closePath();
        ctx.stroke();

        x_list.push([x,y])
        if (x_list.length == 5) {
            set_line_type(1)
        } else if (x_list.length == 6) {
            SetO(x_list[0][0],x_list[0][1])
            x_list.shift()
            set_line_type(1)
        }
}

function SetO(x, y) {
    console.log("in setO")
        
        ctx.beginPath();
        //ctx.strokeStyle = $('#selColor').val();
        //ctx.lineWidth = $('#selWidth').val();
        ctx.strokeStyle = "blue";
        ctx.lineWidth = lineWidth;
        ctx.arc(x, y, Osize, 0, 2 * Math.PI);
        ctx.stroke();

        /*ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(x-Osize, y-Osize);
        ctx.lineTo(x-Osize, y+Osize);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(x-Osize, y-Osize);
        ctx.lineTo(x+Osize, y-Osize);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(x+Osize, y-Osize);
        ctx.lineTo(x+Osize, y+Osize);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(x+Osize, y+Osize);
        ctx.lineTo(x-Osize, y+Osize);
        ctx.closePath();
        ctx.stroke();*/
}

function savePlay() {
    console.log("save play. not implemented yet")
}
    
function clearArea() {
    saveState(canvas);
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(canvas_offset_width, canvas_offset_height, ctx.canvas.width, ctx.canvas.height);

    background = new Image();
    background.src = "whiteboard/fullcourt2.png"
    /*if (current_background == 2) {
        background.src = "whiteboard/fullcourt2.png"
    } else {
        background.src = "whiteboard/halfcourt.png"
    }*/
    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
        ctx.drawImage(background,canvas_offset_width,canvas_offset_height, canvas_width, canvas_height);   
    }

}

function swapBackground() {
    saveState(canvas);
    background = new Image();

    if (current_background == 1) {
        background.src = "whiteboard/fullcourt2.png"
        current_background = 2
    } else {
        background.src = "whiteboard/halfcourt.png"
        current_background = 1
    }
    // Make sure the image is loaded first otherwise nothing will draw.
    background.onload = function(){
        ctx.drawImage(background,canvas_offset_width,canvas_offset_height, canvas_width, canvas_height);   
    }
}

/*
function dragTest(ev) {
  return false
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setDragImage(new Image(), 0, 0);
  ev.dataTransfer.dropEffect  = "copy"
  ev.dataTransfer.effectAllowed = "copy";
}*/

function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function setAsX() {
    console.log("setAsX called")
    $("#clickX").toggleClass("isSet");
    $("#clickF").removeClass("isSet");
    $("#myCanvas").css('cursor', "url(x3.cur) 11 11, pointer");
    XisSet = !XisSet

    if (OisSet) {
        $("#clickO").toggleClass("isSet");
        OisSet = !OisSet
    }
}

function setAsO() {
    console.log("setAsO called")
    $("#clickO").addClass("isSet");
    $("#clickF").removeClass("isSet");
    $("#clickX").removeClass("isSet");
    $("#myCanvas").css('cursor', "url(o2.cur) 11 11, pointer");
    OisSet = true
    XisSet = false
}

function setAsX() {
    console.log("setAsX called")
    $("#clickX").addClass("isSet");
    $("#clickF").removeClass("isSet");
    $("#clickO").removeClass("isSet");
    $("#myCanvas").css('cursor', "url(x3.cur) 11 11, pointer");
    XisSet = true
    OisSet = false
}

function DrawFree() {
    console.log("DrawFree called")
    $("#clickF").addClass("isSet");
    $("#clickX").removeClass("isSet");
    $("#clickO").removeClass("isSet");
    $("#myCanvas").css('cursor', "default");
    XisSet = false
    OisSet = false
}

function show_line_options() {
    //DrawFree()
    $("#clickF").toggleClass("show_dropdown");
    $("#line_type_btn").toggleClass("borderbottom");
}



function set_line_type(option) {
    if (option == 1) {
        FreeIsSet = true
        LineIsSet = false
        DribbleIsSet = false
        XisSet = false
        console.log("about to be implemented")
        $("#line_type_btn").html("free")
    } else if (option == 2) {
        FreeIsSet = false
        LineIsSet = true
        DribbleIsSet = false
        console.log("not implemented yet")
        $("#line_type_btn").html("line")
    } else if (option == 3) {
        FreeIsSet = false
        LineIsSet = false
        DribbleIsSet = true
        console.log("not implemented yet")
        $("#line_type_btn").html("dribble")
    }

    $("#clickF").removeClass("show_dropdown");
    $("#line_type_btn").removeClass("borderbottom");
}