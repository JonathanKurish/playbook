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

        <div id="body_container" class="d-block col-xl-9 col-12 nopadding">

        <!-- login page -->

        <div id="login_page" class="login d-block">

            <div id="login_body" class="d-block w-100">

                <div class="login_item_div d-block col-md-6 col-10 nopadding">
                    <p id="email_address" class="login_text"><?php echo $_GET['email_address'];?></p>
                    <p id="user_id_p" class="d-none"><?php echo $_GET['user_id'];?></p>
                    <p id="invite" class="d-none"><?php echo $_GET['invite'];?></p>
                </div>

                <div class="login_item_div d-block col-md-6 col-10 nopadding">
                    <p class="login_text">First Name</p>
                    <input type="text" id="login_fname" class="login_item list_textfield col-12 nopadding" onInput="fname_written()">
                    <p id="login_error_fname" class="login_error"></p>
                </div>

                <div class="login_item_div d-block col-md-6 col-10 nopadding">

                    <p class="login_text">Password</p>

                    <input type="password" id="password" class="login_item list_textfield col-12 nopadding" onInput="check_password()">

                    <p id="login_error_password" class="login_error"></p>

                </div>



                <div class="login_item_div d-block col-md-6 col-10 nopadding">

                    <p class="login_text">Confirm Password</p>

                    <input type="password" id="confirm_password" class="login_item list_textfield col-12 nopadding" onInput="confirm_password()">

                    <p id="login_error_confirm_password" class="login_error"></p>

                </div>



                

                <input type="button" id="accept_button" class="new_button col-md-3 col-5 nopadding" onclick="accept_password_clicked()" value="Accept">



            </div>
        </div>
    </div>

        <script src="js/signup_password.js"></script>
    </body>
</html>