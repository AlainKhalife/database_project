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

if(getCookie("username")!=""){
    let username = getCookie("username");
    document.getElementById("signindrop").innerText = `Welcome ${username}`;
    document.getElementById("logedin").style.display = "";
    document.getElementById("signIn").style.display = "none";
    document.getElementById("user").innerText = username;
}

$("#signout").on("click", function(){
  alert(`${getCookie("username")} has signed out`);
  deleteCookie();
  document.getElementById("logedin").style.display = "none";
  document.getElementById("signIn").style.display = "";
  document.getElementById("user").innerText = "";

});

// This will scroll the page to the container of the exam test options
$("#aboutnav").click(function() {
  $('html,body').animate({
      scrollTop: $("#about").offset().top},
      'slow');
});

$("#homenav").click(function() {
  $('html,body').animate({
      scrollTop: 0},
      'slow');
});