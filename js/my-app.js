// Initialize your app
var myApp = new Framework7({
    modalTitle: app_name,
    material: true,
    pushState : true,
    smartSelectOpenIn: 'picker'
});

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('main-page-2', function (page) {

    var ft = sessionStorage.getItem("ft");
    //console.log(ft);
    if((ft == null) || (ft == "")){
        //show splash
        sessionStorage.setItem("ft",1);
        document.getElementById('splash-page').style.display = "block";

        setTimeout(function(){
                show_main()
            },
            5000);
    }else{
        //show main
        show_main();
    }

    //show_main();


    function show_main()
    {
        //console.log("hello");
        document.getElementById('splash-page').innerHTML = "";
        document.getElementById('splash-page').style.display = "none";
        $$("#splash-page").remove();
        $$("#main-page").removeClass('hide');
        //document.getElementById('main-page').style.display = "block";

        //myApp.onPageInit('index');
    }

}).trigger();


myApp.onPageInit('student',function () {

    if(student_login()){
        $$("#home").click();
    }
    $$("#stu-login-form").on('submit',function (e) {
        e.preventDefault();
        myApp.showIndicator();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            cache: 'false',
            crossDomain: true,
            timeout: 60000,
            data: {
                'student-login': '',
                'matric' : $$("#login_matric").val(),
                'password': $$("#login_password").val()
            },
            success: function (f) {
                myApp.hideIndicator();
                var ok = f.ok;
                if(ok == 0){
                    show_toast("Invalid login details","red");
                }else if(ok == 1){
                    //save the records
                    localStorage.setItem("user_id",f.rec['id']);
                    localStorage.setItem("matric",f.rec['matric']);
                    localStorage.setItem("student_email",f.rec['email']);
                    localStorage.setItem("student_sname",f.rec['sname']);
                    localStorage.setItem("student_oname",f.rec['oname']);
                    localStorage.setItem("student_level",f.rec['level']);

                    $$("#home").click();
                }
            },
            error: function (e) {
                myApp.hideIndicator();
                myApp.alert("Network error","Error");
                console.log(e.responseText);
            }
        });
    });
});

myApp.onPageInit('staff',function () {
    if(staff_login()) {
        $$("#staff-home").click();
    }
    $$("#staff-login-form").on('submit',function (e) {
        e.preventDefault();
        myApp.showIndicator();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            cache: 'false',
            crossDomain: true,
            timeout: 60000,
            data: {
                'staff-login': '',
                'staff_id' : $$("#staff_id").val(),
                'password': $$("#staff_password").val()
            },
            success: function (f) {
                myApp.hideIndicator();
                var ok = f.ok;
                if(ok == 0){
                    show_toast("Invalid login details","red");
                }else if(ok == 1){
                    //save the records
                    localStorage.setItem("user_id",f.rec['id']);
                    localStorage.setItem("staff_id",f.rec['staff_id']);
                    localStorage.setItem("staff_email",f.rec['email']);
                    localStorage.setItem("staff_sname",f.rec['sname']);
                    localStorage.setItem("staff_oname",f.rec['oname']);
                    localStorage.setItem("staff_level",f.rec['level']);

                    $$("#staff-home").click();
                }
            },
            error: function (e) {
                myApp.hideIndicator();
                myApp.alert("Network error","Error");
                console.log(e.responseText);
            }
        });
    });
});


myApp.onPageInit('staff-reg',function () {
    
   //console.log("Hello");
    $$("#staff-register-form").on("submit",function (e) {
       e.preventDefault();
       myApp.showPreloader("Signing up...");
       var staff_id = $$("#reg_staff_id").val();

       console.log(staff_id);
       var sname = $$("#sname").val();
       var oname = $$("#onames").val();
       var level;
        $$('select[name="staff_level"] option:checked').each(function () {
            level = this.value;
        });
        var email = $$("#reg_email").val();
        var password = $$("#reg_password").val();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                'staff_id': staff_id,
                'sname': sname,
                'oname': oname,
                'level': level,
                'email': email,
                'password': password,
                'staff-reg': ''
            },
            success:function (f) {
                myApp.hidePreloader();
                console.log(f);
                var ok = f.ok;

                if(ok == 1){
                    $$(".res").click();
                    show_toast(f.msg,"green");
                }else{
                    show_toast(f.msg,"red");
                }
            },
            error:function (e) {
                myApp.hidePreloader();
                myApp.alert("Network, try again","Error");
            },
            timeout: 60000,
            crossDomain: true,
            cache: false
        });
       //show_toast("Registration complete","blue");
    });
});


myApp.onPageInit('student-reg',function () {
    
    //console.log("Hello");
    $$("#register-form").on("submit",function (e) {
        e.preventDefault();
        myApp.showPreloader("Signing up...");
        var matric = $$("#reg_matric").val();

        //console.log(staff_id);
        var sname = $$("#sname").val();
        var oname = $$("#onames").val();
        var level;
        $$('select[name="student_level"] option:checked').each(function () {
            level = this.value;
        });
        var email = $$("#reg_email").val();
        var password = $$("#reg_password").val();

        $$.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                'matric': matric,
                'sname': sname,
                'oname': oname,
                'level': level,
                'email': email,
                'password': password,
                'student-reg': ''
            },
            success:function (f) {
                myApp.hidePreloader();
                console.log(f);
                var ok = f.ok;

                if(ok == 1){
                    $$(".res").click();
                    show_toast(f.msg,"green");
                }else{
                    show_toast(f.msg,"red");
                }
            },
            error:function (e) {
                myApp.hidePreloader();
                myApp.alert("Network, try again","Error");
            },
            timeout: 60000,
            crossDomain: true,
            cache: false
        });
        //show_toast("Registration complete","blue");
    });
});

myApp.onPageInit('staff-home',function () {
    
    if(!staff_login()){
        window.location = "main.html";
    }
    update_staff();

    $$(".staff-logout").on("click",function (e) {
       e.preventDefault();

       myApp.confirm("Are you sure want to logout","Logout",function (e) {
          localStorage.clear();
          window.location = "main.html";
       });
    });
});


myApp.onPageInit('student-home',function () {
    
    if(!student_login()){
        window.location = "main.html";
    }
    update_student();

    $("#chat-r").html("("+localStorage.getItem("student_level")+")");

    $$(".staff-logout").on("click",function (e) {
        e.preventDefault();

        myApp.confirm("Are you sure want to logout","Logout",function (e) {
            localStorage.clear();
            window.location = "main.html";
        });
    });
});

myApp.onPageInit("student-chat-home",function () {
   if(!student_login()){
       window.location = "main.html";
   }

   myApp.showIndicator();

    $(".chat-r").html(localStorage.getItem("student_level"));

   $$.ajax({
      url : url,
      type : 'get',
       crossDomain : true,
       cache : true,
       data : {
          'load-message': '',
           'level': localStorage.getItem("student_level")
       },
       dataType: 'json',
       success: function (f) {
          var t = "";
          var rec = f.record;
          for(var i = 0; i < rec.length; i++){
              if((rec[i].m_type == "student") && (rec[i].user_id == localStorage.getItem("user_id"))){
                  var m_class = "message-sent";
                 var m_name = "";
                 var m_block = '<div class="message message-sent message-appear-from-bottom message-last message-with-tail message-first">';
              }else{
                  var m_class = "message-received"
                  var m_name = '<div class="message-name">'+rec[i].msg_name+'</div>';
                  var m_block = '<div class="message message-received message-appear-from-bottom message-last message-with-tail message-first">';
              }

              var te = '<div class="message '+m_class+'">';
              te += m_name;
              te += '<div class="message-text">'+rec[i].msg;
              te += '<div class="message-date">'+rec[i].time_sent+'</div>';
              te += '</div></div>';

              t += te;
          }
          sessionStorage.setItem("last_time",f.last_time);

           $$("#mlist").html(t);

           //$$('.page-content').animate({scrollTop: $$('.messages').height() }, 'slow');

           //console.log(t);

          myApp.hideIndicator();
           //console.log(f);
       },
       error: function (e) {
           //myApp.alert("Network error...");
           myApp.hideIndicator();
           console.log(e.responseText);
       }
   });


   // var cc = setInterval(function (e) {
   //     console.log("Hello");
   // },2500);

    //setInterval()


    function doStuff() {
        //myApp.alert("run your code here when time interval is reached");
        load_st_msg();
    }
    var myTimer = setInterval(doStuff, 2000);

   $$(".send-message").on("click",function (e) {
       e.preventDefault();
       var text = $$("#the-text").val();
       if(text == ""){
            return;
       }
        var msg_type = "student";
       var l = localStorage.getItem("student_level");
       send_msg(text, msg_type, l);
       $$("#the-text").val('');
   })
});




myApp.onPageInit('category',function () {
    if(!staff_login()){
        window.location = "main.html";
    }

    //myApp.showPreloader("Loading quiz categories...");
    var rand = Math.floor(Math.random() * 3);
    if(rand == 0){
        var class_c = "preloader-blue";
    }else if(rand == 1){
        var class_c = "preloader-amber";
    }else if(rand == 2){
        var class_c = "preloader-green";
    }else{
        var class_c = "preloader-red";
    }

    $(".pre-load").addClass(class_c);

    $$.ajax({
        url: url,
        data: {
            'room-list': ''
        },
        type: 'GET',
        dataType: 'json',
        crossDomain : true,
        cache: true,
        success:function(f){
            //console.log(f.ok);
            //console.log(f.result);
            var res = f.record;
            for(var k = 0; k < res.length; k++) {
                var the_id = res[k].c_level;
                var the_name = res[k].c_name;
                //console.log(the_id);
                var a = "<li><a href=\"staff-room.html\" class='item-link item-content start-quiz' data-quiz-name='"+the_name+"' data-quiz-id='"+the_id+"'>";
                a += "<div class='item-inner'><div class='item-title'>"+the_name+"</div></div></a></li>";

                $$(".the-list").append(a);
            }
            $$(".loader").remove();
            $(".main-cat").removeClass('hide');
        },
        error: function (e) {
            console.log(e.responseText);
            myApp.alert("Network problem");
            $$(".loader").remove();
        },
        timeout:60000
    });

    //console.log(class_c);

    $$("html").on('click','.start-quiz',function (e) {
        var the_id = $$(this).attr("data-quiz-id");
        //var the_quiz_name = $$(this).attr("data-quiz-name");

        //sessionStorage.setItem("quiz_id",the_id);
        sessionStorage.setItem("chat_level",the_id);
    });
});


myApp.onPageInit("staff-chat-home",function () {
    if(!staff_login()){
        window.location = "main.html";
    }

    myApp.showIndicator();

    $(".chat-r").html(sessionStorage.getItem("chat_level"));

    $$.ajax({
        url : url,
        type : 'get',
        crossDomain : true,
        cache : true,
        data : {
            'load-message': '',
            'level': sessionStorage.getItem("chat_level")
        },
        dataType: 'json',
        success: function (f) {
            var t = "";
            var rec = f.record;
            for(var i = 0; i < rec.length; i++){
                if((rec[i].m_type == "staff") && (rec[i].user_id == localStorage.getItem("user_id"))){
                    var m_class = "message-sent";
                    var m_name = "";
                    var m_block = '<div class="message message-sent message-appear-from-bottom message-last message-with-tail message-first">';
                }else{
                    var m_class = "message-received"
                    var m_name = '<div class="message-name">'+rec[i].msg_name+'</div>';
                    var m_block = '<div class="message message-received message-appear-from-bottom message-last message-with-tail message-first">';
                }

                var te = '<div class="message '+m_class+'">';
                te += m_name;
                te += '<div class="message-text">'+rec[i].msg;
                te += '<div class="message-date">'+rec[i].time_sent+'</div>';
                te += '</div></div>';

                t += te;
            }
            sessionStorage.setItem("last_time",f.last_time);

            $$("#mlist").html(t);

            //$$('.page-content').animate({scrollTop: $$('.messages').height() }, 'slow');

            //console.log(t);

            myApp.hideIndicator();
            //console.log(f);
        },
        error: function (e) {
            //myApp.alert("Network error...");
            myApp.hideIndicator();
            console.log(e.responseText);
        }
    });


    // var cc = setInterval(function (e) {
    //     console.log("Hello");
    // },2500);

    //setInterval()


    function doStuff() {
        //myApp.alert("run your code here when time interval is reached");
        load_staff_msg();
    }
    var myTimer = setInterval(doStuff, 2000);

    $$(".send-message").on("click",function (e) {
        e.preventDefault();
        var text = $$("#the-text").val();
        if(text == ""){
            return;
        }
        var msg_type = "staff";
        var l = sessionStorage.getItem("chat_level");
        send_msg(text, msg_type, l);
        $$("#the-text").val('');
    })
});





myApp.onPageInit('profile',function () {
    
   if(staff_login()){
       update_staff();
       $$(".staff_id").html(localStorage.getItem("staff_id"));
       $$(".ssname").html(localStorage.getItem("staff_sname"));
       $$(".soname").html(localStorage.getItem("staff_oname"));
       $$(".semail").html(localStorage.getItem("staff_email"));
       $$(".slevel").html(localStorage.getItem("staff_level"));

       $("#sprofile_sname").val(localStorage.getItem("staff_sname"));
       $("#sprofile_oname").val(localStorage.getItem("staff_oname"));
       $("#sprofile_matric").val(localStorage.getItem("staff_id"));
       $("#sprofile_email").val(localStorage.getItem("staff_email"));
       $("#sstudent_level").val(localStorage.getItem("staff_level"));


       $$("#staff-update-form").on('submit',function (e) {
           e.preventDefault();

           var profile_sname = $$("#sprofile_sname").val();
           var profile_oname = $$("#sprofile_oname").val();
           var profile_email = $$("#sprofile_email").val();

           var level = $$("#sstudent_level").val();

           myApp.showPreloader("Updating profile,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_staff_profile': '',
                   'sname' : profile_sname,
                   'oname' : profile_oname,
                   'email' : profile_email,
                   'level' : level,
                   'staff_id' : localStorage.getItem("staff_id")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){

                       localStorage.setItem("staff_sname",profile_sname);
                       localStorage.setItem("staff_oname",profile_oname);
                       localStorage.setItem("staff_email",profile_email);
                       localStorage.setItem("staff_level",level);
                       //update_stat();
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                   }else {
                       myApp.hidePreloader();



                       show_toast("Unable to update profile","red");


                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 60000
           });
       });



       $$("#staff-password-form").on('submit',function (e) {
           e.preventDefault();

           var pass = $$("#spassword").val();
           var c_pass = $$("#sconfirm_password").val();

           if(pass !== c_pass){
               myApp.alert("Password does not match");
               return false;
           }
           myApp.showPreloader("Updating password,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_staff_password': '',
                   'password' : pass,
                   'staff_id' : localStorage.getItem("staff_id")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                       $("#spassword").val('');
                       $("#sconfirm_password").val('');
                   }else {
                       myApp.hidePreloader();

                       show_toast('Unable to update password',"red");


                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 60000
           });
       });


       $$(".staff-page").removeClass('hide');
   } else if(student_login()){
       update_student();

       $$(".matric").html(localStorage.getItem("matric"));
       $$(".sname").html(localStorage.getItem("student_sname"));
       $$(".oname").html(localStorage.getItem("student_oname"));
       $$(".email").html(localStorage.getItem("student_email"));
       $$(".level").html(localStorage.getItem("student_level"));


       $("#profile_sname").val(localStorage.getItem("student_sname"));
       $("#profile_oname").val(localStorage.getItem("student_oname"));
       $("#profile_matric").val(localStorage.getItem("matric"));
       $("#profile_email").val(localStorage.getItem("student_email"));
       $("#student_level").val(localStorage.getItem("student_level"));


       $$("#stu-update-form").on('submit',function (e) {
           e.preventDefault();

           var profile_sname = $$("#profile_sname").val();
           var profile_oname = $$("#profile_oname").val();
           var profile_email = $$("#profile_email").val();

           var level = $$("#student_level").val();

           myApp.showPreloader("Updating profile,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_stu_profile': '',
                   'sname' : profile_sname,
                   'oname' : profile_oname,
                   'email' : profile_email,
                   'level' : level,
                   'matric' : localStorage.getItem("matric")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){

                       localStorage.setItem("student_sname",profile_sname);
                       localStorage.setItem("student_oname",profile_oname);
                       localStorage.setItem("student_email",profile_email);
                       localStorage.setItem("student_level",level);
                       //update_stat();
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                   }else {
                       myApp.hidePreloader();
                       show_toast("Unable to update profile","red");
                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 60000
           });
       });


       $$("#stu-password-form").on('submit',function (e) {
           e.preventDefault();

           var pass = $$("#password").val();
           var c_pass = $$("#confirm_password").val();

           if(pass !== c_pass){
               myApp.alert("Password does not match");
               return false;
           }
           myApp.showPreloader("Updating password,<br/>Please Wait...");

           $$.ajax({
               url: url,
               data: {
                   'update_stu_password': '',
                   'password' : pass,
                   'matric' : localStorage.getItem("matric")
               },
               type: 'POST',
               dataType: 'json',
               crossDomain : true,
               cache: false,
               success:function(f){
                   var ok = f.ok;
                   if(ok == 1){
                       myApp.hidePreloader();
                       show_toast(f.msg,"green");
                       $("#password").val('');
                       $("#confirm_password").val('');
                   }else {
                       myApp.hidePreloader();
                       show_toast ('Unable to update password',"red");

                   }
               },
               error:function(err){
                   console.log(err.responseText);
                   myApp.hidePreloader();
                   myApp.alert("Network error, try again");
               },
               timeout: 60000
           });
       });


       $$(".student-page").removeClass('hide');
   }else{
       window.location = "main.html";
   }
});

myApp.onPageInit('stu-password', function (page) {

    $$("#password-forms").on('submit',function(e){
        e.preventDefault();
        var pass_matric = $$("#pass_matric").val();

        var pass_email = $$("#pass_email").val();
        myApp.showPreloader("Resetting Password...");

        $$.ajax({
            url: url,
            data: {
                'stu_pass': '',
                'matric' : pass_matric,
                'email': pass_email
            },
            type: 'POST',
            dataType: 'json',
            crossDomain : true,
            cache: false,
            success:function(f){
                var ok = f.ok;
                if(ok == 1){
                    $$("#pass_matric").val('');
                    $$("#pass_email").val('');
                }
                myApp.hidePreloader();

                myApp.addNotification({
                    message : f.msg
                });
            },
            error:function(err){
                myApp.hidePreloader();
                myApp.alert("Network error, try again");
                console.log(err.responseText);
            },
            timeout: 60000
        });
    });
});

myApp.onPageInit('staff-password', function (page) {
    
    $$("#password-forms").on('submit',function(e){
        e.preventDefault();
        var pass_matric = $$("#pass_matric").val();

        var pass_email = $$("#pass_email").val();
        myApp.showPreloader("Resetting Password...");

        $$.ajax({
            url: url,
            data: {
                'staff_pass': '',
                'staff_id' : pass_matric,
                'email': pass_email
            },
            type: 'POST',
            dataType: 'json',
            crossDomain : true,
            cache: false,
            success:function(f){
                var ok = f.ok;
                if(ok == 1){
                    $$("#pass_matric").val('');
                    $$("#pass_email").val('');
                }
                myApp.hidePreloader();

                myApp.addNotification({
                    message : f.msg
                });
            },
            error:function(err){
                myApp.hidePreloader();
                myApp.alert("Network error, try again");
                console.log(err.responseText);
            },
            timeout: 60000
        });
    });
});

    function send_msg(msg, msg_type, level) {
    $$.ajax({
        url : url,
        type : 'post',
        cache : false,
        crossDomain : true,
        data : {
            'send-msg': '',
            'level' : level,
            'user_id' : localStorage.getItem("user_id"),
            'msg_type' : msg_type,
            'msg' : msg
        },
        success: function (f) {
            // console.log(f);
            // if(msg_type == "student"){
            //     load_st_msg();
            // }else{
            //     load_staff_msg();
            // }
        }
    });
}

function update_staff() {
    var f_name = localStorage.getItem("staff_sname")+" "+localStorage.getItem("staff_oname");
    $$(".staff-name").html(f_name);
}

function staff_login() {
    var staff = localStorage.getItem("staff_id");
    if(staff == "" || staff == null){
        return false;
    }else{
        return true;
    }
}

function update_student() {
    var f_name = localStorage.getItem("student_sname")+" "+localStorage.getItem("student_oname");
    $$(".student-name").html(f_name);
}

function student_login() {
    var staff = localStorage.getItem("matric");
    if(staff == "" || staff == null){
        return false;
    }else{
        return true;
    }
}

function load_st_msg() {
    $$.ajax({
        url : url,
        type : 'get',
        crossDomain : true,
        cache : true,
        data : {
            'load-message': '',
            'last_time': sessionStorage.getItem("last_time"),
            'level': localStorage.getItem("student_level")
        },
        dataType: 'json',
        success: function (f) {
            var t = "";
            var rec = f.record;
            var to = f.total;
            // if(to == 1){
            //     t += "<p class='center'><em>"+to+" new message</em></p>";
            // }else if(to > 1){
            //     t += "<p class='center'><em>"+to+" new messages</em></p>";
            // }
            for(var i = 0; i < rec.length; i++){
                if((rec[i].m_type == "student") && (rec[i].user_id == localStorage.getItem("user_id"))){
                    var m_class = "message-sent";
                    var m_name = "";
                    var m_block = '<div class="message message-sent message-appear-from-bottom message-last message-with-tail message-first">';
                }else{
                    var m_class = "message-received"
                    var m_name = '<div class="message-name">'+rec[i].msg_name+'</div>';
                    var m_block = '<div class="message message-received message-appear-from-bottom message-last message-with-tail message-first">';
                }

                var te = '<div class="message '+m_class+'">';
                te += m_name;
                te += '<div class="message-text">'+rec[i].msg;
                te += '<div class="message-date">'+rec[i].time_sent+'</div>';
                te += '</div></div>';

                t += te;
            }
            sessionStorage.setItem("last_time",f.last_time);

            $$("#mlist").html(t);

            //console.log(t);

            //myApp.hideIndicator();

            //$$("#mlist").animate({ scrollTop: $$('#mlist').prop("scrollHeight")}, 1000);

            //$('.page-content').animate({scrollTop: $('.messages').height() }, 'slow');
            //console.log(f);
        },
        error: function (e) {
            //myApp.alert("Network error...");
            myApp.hideIndicator();
            console.log(e.responseText);
        }
    });
}


function load_staff_msg() {
    $$.ajax({
        url : url,
        type : 'get',
        crossDomain : true,
        cache : true,
        data : {
            'load-message': '',
            'last_time': sessionStorage.getItem("last_time"),
            'level': sessionStorage.getItem("chat_level")
        },
        dataType: 'json',
        success: function (f) {
            var t = "";
            var rec = f.record;
            for(var i = 0; i < rec.length; i++){
                if((rec[i].m_type == "staff") && (rec[i].user_id == localStorage.getItem("user_id"))){
                    var m_class = "message-sent";
                    var m_name = "";
                    var m_block = '<div class="message message-sent message-appear-from-bottom message-last message-with-tail message-first">';
                }else{
                    var m_class = "message-received"
                    var m_name = '<div class="message-name">'+rec[i].msg_name+'</div>';
                    var m_block = '<div class="message message-received message-appear-from-bottom message-last message-with-tail message-first">';
                }

                var te = '<div class="message '+m_class+'">';
                te += m_name;
                te += '<div class="message-text">'+rec[i].msg;
                te += '<div class="message-date">'+rec[i].time_sent+'</div>';
                te += '</div></div>';

                t += te;
            }
            sessionStorage.setItem("last_time",f.last_time);

            $$("#mlist").html(t);

            //console.log(t);

            //myApp.hideIndicator();
            //console.log(f);
        },
        error: function (e) {
            //myApp.alert("Network error...");
            myApp.hideIndicator();
            console.log(e.responseText);
        }
    });
}