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

let username = getCookie("username");
document.getElementById("signindrop").innerText = `Welcome ${username}`;

$.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {username: getCookie("username")},
        dataType:'json',
        success:function(obj){
            document.getElementById("username").innerText = obj[0].Name;
            document.getElementById("name").innerText = obj[0].Name;
            document.getElementById("email").innerText = obj[0].email;
            document.getElementById("phonenumber").innerText = obj[0].phone_number;
            document.getElementById("address").innerText = obj[0].Address;
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });

$("#signout").on("click", function(){
        alert(`${getCookie("username")} has signed out`);
        deleteCookie();
        window.location.href = "./index.html";
});