let floating_btn = document.querySelector('.floating-btn');
let close_btn = document.querySelector('.close-btn');
let social_panel_container = document.querySelector('.social-panel-container');
let totalprice = 0;
let reservedHotel = "";
let hotelchosen = "";
let chosenroomprice = 0;
let chosenroomtyp = "";
let firsttime1 = true;
let firsttime2 = true;
let firsttime3 = true;
let tempprice = 0;
let signedin = false;

let flightid = 0;
let chosenhotelid = 0;

floating_btn.addEventListener('click', () => {
    social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
    social_panel_container.classList.remove('visible')
});

$('.roomset1').hide();
$('.roomset2').hide();
$('.roomset3').hide();

function show1() {
    $('.roomset1').show();
    $('.roomset2').hide();
    $('.roomset3').hide();

    // Added code to fetch room info
    let hotelid = document.querySelector(".cards.hotel1").getAttribute("idhotel");
    chosenhotelid = hotelid;
    hotelchosen = document.getElementById("hotelname1").innerText; //used to save hotel name chosen
    document.body.style.backgroundImage = `url("./image/hotel_images/${hotelid}.jpg")`;
    document.body.style.backgroundSize = "cover";
    if(!firsttime1){
        let toremove = Array.from(document.querySelectorAll(".roomset1 .features"));
        toremove.forEach((val)=>{
        while(val.childElementCount>1){
            val.lastChild.remove();
        }
    });
    }
    firsttime1=false;
    document.querySelector(".roomset1 .features #roomstandard").innerHTML="";
    document.querySelector(".roomset1 .features #roommaster").innerHTML="";
    document.querySelector(".roomset1 .features #roomdouble").innerHTML="";
    let priceall = Array.from(document.querySelectorAll(".priceroom"));
    priceall.forEach((val)=>{
        val.remove();
    })
    
    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {checkroom: "true",
                idhotel: hotelid},
        dataType:'json',
        success:function(obj){
            for(let i=0; i<obj.length; i++){
                let rclass = obj[i].Class;
                if(rclass=="Standard"){
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset1 .features #roomstandard");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom1s");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }

                else if(rclass=="Master Suite"){
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset1 .features #roommaster");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom1m");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }

                else{
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset1 .features #roomdouble");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom1d");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }
            }
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
}

function show2() {
    $('.roomset2').show();
    $('.roomset1').hide();
    $('.roomset3').hide();
    
    hotelchosen = document.getElementById("hotelname2").innerText;
    if(!firsttime2){
        let toremove = Array.from(document.querySelectorAll(".roomset2 .features"));
        toremove.forEach((val)=>{
        while(val.childElementCount>1){
            val.lastChild.remove();
        }
    });
    }
    firsttime2=false;
    document.querySelector(".roomset2 .features #roomstandard").innerHTML="";
    document.querySelector(".roomset2 .features #roommaster").innerHTML="";
    document.querySelector(".roomset2 .features #roomdouble").innerHTML="";
    let priceall = Array.from(document.querySelectorAll(".priceroom"));
    priceall.forEach((val)=>{
        val.remove();
    })

    // Added code to fetch room info 2
    let hotelid = document.querySelector(".cards.hotel2").getAttribute("idhotel");
    chosenhotelid = hotelid;
    document.body.style.backgroundImage = `url("./image/hotel_images/${hotelid}.jpg")`;
    document.body.style.backgroundSize = "cover";
    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {checkroom: "true",
                idhotel: hotelid},
        dataType:'json',
        success:function(obj){
            for(let i=0; i<obj.length; i++){
                let rclass = obj[i].Class;
                if(rclass=="Standard"){
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset2 .features #roomstandard");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom2s");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }

                else if(rclass=="Master Suite"){
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset2 .features #roommaster");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom2m");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }

                else{
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset2 .features #roomdouble");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom2d");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }
            }
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
}

function show3() {
    $('.roomset3').show();
    $('.roomset2').hide();
    $('.roomset1').hide();

    hotelchosen = document.getElementById("hotelname3").innerText;
    if(!firsttime3){
        let toremove = Array.from(document.querySelectorAll(".roomset3 .features"));
        toremove.forEach((val)=>{
        while(val.childElementCount>1){
            val.lastChild.remove();
        }
    });
    }
    firsttime3=false;
    document.querySelector(".roomset3 .features #roomstandard").innerHTML="";
    document.querySelector(".roomset3 .features #roommaster").innerHTML="";
    document.querySelector(".roomset3 .features #roomdouble").innerHTML="";
    let priceall = Array.from(document.querySelectorAll(".priceroom"));
    priceall.forEach((val)=>{
        val.remove();
    })

    // Added code to fetch room info 3
    let hotelid = document.querySelector(".cards.hotel3").getAttribute("idhotel");
    chosenhotelid = hotelid;
    document.body.style.backgroundImage = `url("./image/hotel_images/${hotelid}.jpg")`;
    document.body.style.backgroundSize = "cover";
    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {checkroom: "true",
                idhotel: hotelid},
        dataType:'json',
        success:function(obj){
            for(let i=0; i<obj.length; i++){
                let rclass = obj[i].Class;
                if(rclass=="Standard"){
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset3 .features #roomstandard");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom3s");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }

                else if(rclass=="Master Suite"){
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset3 .features #roommaster");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom3m");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }

                else{
                    let li = document.createElement("li");
                    li.innerText = obj[i].description;
                    let standardroomf = document.querySelector(".roomset3 .features #roomdouble");
                    standardroomf.appendChild(li);
                    let price = document.createElement("h3");
                    let reservebtn = document.createElement("button");
                    reservebtn.className = "buttonroom";
                    reservebtn.innerText = "Reserve";
                    price.className = "priceroom";
                    price.innerText = `Price: ${obj[i].Price}$`;
                    let standardroom = document.querySelector("#hotelroom3d");
                    standardroom.appendChild(price);
                    standardroom.appendChild(reservebtn);
                    standardroom.appendChild(document.createElement("br"));
                }
            }
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
}

// Below is the databased fetching instructions

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
    document.getElementById("username").innerText = username;
    signedin = true;
}

$("#signout").on("click", function(){
  alert(`${getCookie("username")} has signed out`);
  deleteCookie();
  document.getElementById("logedin").style.display = "none";
  document.getElementById("signIn").style.display = "";
});


$.ajax({
    url:"http://localhost/Database%20Project/database.php",
    type:"GET",
    data: {reservation: "true"},
    dataType:'json',
    success:function(obj){
        let selectcountry = document.querySelector("#select_country");
        for(let i=1; i<obj.length; i++){
            let option = document.createElement("option");
            option.value = obj[i].country_name;
            option.id = i;
            option.innerText = obj[i].country_name;
            selectcountry.appendChild(option);
        }

    },
    error: function(errorObj,txt){
        alert(errorObj.status+" "+errorObj.statusText);
    }
});

$("#select_country").on("change", function(){
    let countryid = document.querySelector(`option[value='${$("#select_country").val()}']`).id;
    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {selectcity: "true",
                countryname: $("#select_country").val(),
                countryid: countryid},
        dataType:'json',
        success:function(obj){
            document.querySelector("#select_city").innerHTML="";
            let selectcountry = document.querySelector("#select_city");
            for(let i=0; i<obj.length; i++){
                let option = document.createElement("option");
                option.value = obj[i].city_name;
                option.id = obj[i].idCities;
                option.innerText = obj[i].city_name;
                selectcountry.appendChild(option);
            }
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
});

$("#btn_search").on("click", function(){
    if($("#hoteldatepicker").val()==""){
        alert("You must select a date range for your reservation");
        return;
    }

    let countryid = document.querySelector(`option[value='${$("#select_country").val()}']`).id;
    let cityid = document.querySelector(`option[value='${$("#select_city").val()}']`).id;

    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {searchhotel: "true",
                countryid: $("#select_country").val(),
                cityid: cityid},
        dataType:'json',
        success:function(obj){
            for(let i=1; i<=obj.length; i++){
                document.getElementById(`hotelname${i}`).innerText = obj[i-1].hotel_name;
                document.getElementById(`hoteladdress${i}`).innerText = obj[i-1].Address;
                document.getElementById(`hotelimage${i}`).style.backgroundImage = `url('./image/hotel_images/${obj[i-1].src}.jpg')`;
                document.querySelector(`.cards.hotel${i}`).setAttribute("idhotel", obj[i-1].idHotel);
                if(tempprice>0){
                    totalprice-=tempprice;
                    tempprice=0;
                }
            }
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
});

$("body").on("click", "button.buttonroom" ,function(e){
    // for selectig reserved buttons
    let btn = e.target;
    let allbtns = Array.from(document.querySelectorAll(".buttonroom"));
    allbtns.forEach((val)=>{
        if(val.style.backgroundColor=="lightblue"){
            val.style.backgroundColor="";
            let price = parseInt(val.previousElementSibling.innerText.split(": ")[1]);
            totalprice-=price;
        }
    })
    btn.style.backgroundColor="lightblue";
    let price = parseInt(btn.previousElementSibling.innerText.split(": ")[1]);
    let chosenroomtype = btn.parentElement.previousElementSibling.innerText;
    chosenroomprice = price;
    tempprice = price;
    document.getElementById("chosenhotel").innerText = hotelchosen;
    document.getElementById("chosenroomprice").innerText = chosenroomprice + "$";
    document.getElementById("chosenroomtype").innerText = chosenroomtype;
    chosenroomtyp =chosenroomtype;
    totalprice+=price;
    document.getElementById("totalprice").innerText = totalprice + "$";
    reservedHotel = hotelchosen;
});

$("#reserveflight").on("click", function(){
    let fromcity = $("#fromflight").val();
    let tocity = $("#toflight").val();
    let flightdate = $("#flightdatepick").val();

    if(flightdate==""){
        alert("You must select a flight date");
        return;
    }

    if(fromcity=="" || tocity==""){
        alert("Fields cannot be empty");
        return;
    }

    if(fromcity.toLowerCase()==tocity.toLowerCase()){
        alert("Cannot flight to the same city");
        return;
    }

    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {reserveflight: "true",
                tocity: tocity},
        dataType:'json',
        success:function(obj){
            let flightprice = parseInt(obj[0].price);
            document.getElementById("flightfrom").innerText = fromcity;
            document.getElementById("flightroom").innerText = tocity;
            document.getElementById("flightdate").innerText = flightdate;
            document.getElementById("ticketprice").innerText = flightprice + "$";
            document.getElementById("flightprice").innerText = flightprice + "$";
            totalprice+=flightprice;
            document.getElementById("totalprice").innerText = totalprice + "$";
            document.getElementById("reserveflight").disabled = true;
            document.getElementById("reserveflight").innerText = "Thank you";
            flightid = parseInt(obj[0].id_Flight);
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
});

$("#btn_applypromo").on("click", function(){
    let promocode = $("#promocode").val();
    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"GET",
        data: {getpromo: "true",
                promocode: promocode},
        dataType:'json',
        success:function(obj){
            if(obj.length==0){
                alert("Wrong promocode");
                return;
            }

            else{
                let value = obj[0].value;
                totalprice = totalprice - totalprice*(20/100);
                document.getElementById("totalprice").innerText = totalprice + "$";
                document.getElementById("btn_applypromo").style.backgroundColor = "lightgreen";
                document.getElementById("btn_applypromo").value = `You got ${value}% off`;
                document.getElementById("btn_applypromo").disabled = true;
            }
    
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
});

$("#btn_pay").on("click", function(){
    if(!signedin){
        alert("In order to checkout, you must be signed in");
    }

    else if($("#cname").val()=="" || $("#ccnum").val()=="" || $("#expmonth").val()=="" || $("#expyear").val()=="" || $("#cvv").val()==""){
        alert("Make you sure you entered all fields correctly");
    }

    else if(!isNumeric(document.getElementById("ccnum").value) || !isNumeric(document.getElementById("cvv").value) || !isNumeric(document.getElementById("expyear").value)){
        alert("Incorrect Credit Card Details");
    }

    else{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    
    let date = today.toString();
    let fromdate = document.getElementById("flightdatepick").value.split(" - ")[0];
    let todate = document.getElementById("flightdatepick").value.split(" - ")[1];
    let fromcity = document.getElementById("fromflight").value;
    let tocity = document.getElementById("toflight").value;
    let username = getCookie("username");

        if(fromcity==""){
            fromcity="No Flight";
        }
        if(tocity=="Select your destination"){
            tocity="No Flight";
        }
        if(fromdate==""){
            fromdate="No Flight";
        }
        if(todate==""){
            todate="No Flight";
        }

    $.ajax({
        url:"http://localhost/Database%20Project/database.php",
        type:"POST",
        data: {checkout: "true",
                flightid: flightid,
                hotelid: chosenhotelid,
                fromdate: fromdate,
                todate: todate,
                fromcity: fromcity,
                tocity: tocity,
                username: username,
                date: date,
                price: totalprice
                },
        dataType:'text',
        success:function(obj){
            alert("Reservation successful");
            document.getElementById("btn_pay").disabled = true;
            document.getElementById("btn_pay").value = "Purchase Successful";
            window.location.reload();
        },
        error: function(errorObj,txt){
            alert(errorObj.status+" "+errorObj.statusText);
        }
    });
    }
});

function isNumeric(str) {
    if (typeof str != "string") 
    return false;

    return !isNaN(str) &&  !isNaN(parseFloat(str))
  }

  $.ajax({
    url:"http://localhost/Database%20Project/database.php",
    type:"POST",
    data: {getallcities: "true"},
    dataType:'json',
    success:function(obj){
        let pickfromcities = document.getElementById("toflight");
        for(let i=0; i<obj.length; i++){
            let option = document.createElement("option");
            option.value = obj[i].city_name;
            option.id = obj[i].city_name;
            option.innerText = obj[i].city_name;
            pickfromcities.appendChild(option);
        }
    },
    error: function(errorObj,txt){
        alert(errorObj.status+" "+errorObj.statusText);
    }
});

$("#procees_checkout").on("click", function(e){
    if(reservedHotel=="" && document.getElementById("reserveflight").disabled==false){
        alert("Cannot Proceed to checkout. You must book at least 1 flight or 1 hotel");
        e.stopPropagation();
    }
})