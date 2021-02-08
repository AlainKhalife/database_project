const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

const setCookie = (cname, cvalue, exdays)=>{
    // Set a cookie
    // cname is the cookie name | cvalue is the cookie value | exdays is the expirary date of the cookie
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

const getCookie = (cname)=>{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

const deleteCookie = ()=>{
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


$("#btn_signup").on("click", function(e){
    e.preventDefault();
    if($("#signup_name").val()=="" || $("#signup_pass").val()=="" || $("#signup_ccpass").val()=="" || $("#signup_email").val()=="" || $("#signup_nbr").val()=="" || $("#signup_description").val()==""){
        alert("All fields must be filled in order to sign up");
        return;
    }

	$.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"POST",
        data: {name: $("#signup_name").val(),
               password: $("#signup_pass").val(),
			   ccpassword: $("#signup_ccpass").val(),
			   email: $("#signup_email").val(),
			   phonenumber: $("#signup_nbr").val(),
			   address: $("#signup_description").val(),
               signupreq: "true"},
               dataType:'text',
        success:function(obj){
            if(obj==1){
            let username = $("#signup_name").val();
            alert(`User: ${username} successfully added`);
            document.getElementById("signIn").click();
            $("#signup_name").val("");
            $("#signup_pass").val("");
			$("#signup_ccpass").val("");
            }

            else if(obj==-1){
                alert('Username already exists');
                return;
            }

            else{
                alert('Incorrect Passwords !');
                return;
            }
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
});

$("#btn_signin").on("click", function(e){
    e.preventDefault();
	$.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"POST",
        data: {username: $("#signin_email").val(),
               password: $("#signin_pass").val(),
               signinreq: "true"},
        dataType:'text',
        success:function(obj){
            if(obj==1){
                setCookie("username", $("#signin_email").val(), 1);
                alert(`${$("#signin_email").val()} signed in succesfuly`);
                window.location.href = "./index.html";
            }

            else if(obj==-1){
                alert('Incorrect Passwords !');
            }

            else{
                alert('Incorrect Username !');
            }
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
});

