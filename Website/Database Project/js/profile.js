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
document.getElementById("user").innerText = username;
let done = false;

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
            done = true;
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });

      $.ajax({
      url:"http://localhost/Database%20Project/database.php",
      type:"GET",
      data: {username: getCookie("username"),
             getreservation: "true"},
      dataType:'json',
      success:function(obj){
          for(let i=1; i<=obj.length; i++){
            let hotelid = obj[i-1].Hotel_idHotel;
            let maindiv = document.createElement("div");
            maindiv.className = "card";
            maindiv.style.width = "18rem";
            maindiv.style.display = "inline-block";
            maindiv.style.marginLeft = "15px"

            let hotelimage = document.createElement("img");
            hotelimage.className = "card-img-top";
            hotelimage.src = `./image/hotel_images/${hotelid}.jpg`;
            hotelimage.alt = "Hotel Image";
            hotelimage.width = "600";
            hotelimage.height = "200";
            maindiv.appendChild(hotelimage);

            let cardbody = document.createElement("div"); // Card body
            cardbody.className = "card-body";

            let cardtitle = document.createElement("h5");
            cardtitle.className = "card-title";
            cardtitle.innerText = obj[i-1].hotel_name;
            let p = document.createElement("p");
            p.innerText = `Reservation ID: ${obj[i-1].idReservation}\nReserved hotel: ${obj[i-1].hotel_name}\nFlight ID: ${obj[i-1].Flight_idFlight}\nDate of Reservation: ${obj[i-1].date}\nDepartment City: ${obj[i-1].from_city}\nArrival City: ${obj[i-1].to_city}\nReservation Validity Date: From: ${obj[i-1].from_date} - Till: ${obj[i-1].to_date}\nPayment Ammount: ${obj[i-1].payment_amount}$`;
            
            cardbody.appendChild(cardtitle);
            cardbody.appendChild(p);

            maindiv.appendChild(cardbody);

            document.getElementById("reservations").appendChild(maindiv);
          }

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