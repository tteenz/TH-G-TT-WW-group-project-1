
var api = "https://developers.zomato.com/api/v2.1/categories"
var apikey = "964d11c9e9159afba79051e5c707f40b"
var query = "&q="
var queryURL = "Atlanta";
var entity_id ="";
var latitude_fromIP="";
var longitude_fromIP="";
var city_fromIP ="";

//entity_id=288&entity_type=city&count=15&lat=33.5242&lon=-84.359&radius=7000&cuisines=BBQ


var foodArr = ["sushi", "pizza food", "mexican food", "italian food", "mediterranean food", "hibachi food", "healthy food", "burger", "chinese food", "korean food"];
var loserArr = [];
var choiceNum = 0;
var foodLength = foodArr.length;
var randomLFood = 0;
var randomRFood = 0;
 var leftimgFood = '';
 var rightimgFood = '';
 var pusherLeft = '';
 var pusherRight = '';
var winner;
// randomNum();


function randomNum() {

    if(foodLength > 1) {
        randomLFood = (Math.floor(Math.random() * foodArr.length)); 
        
      leftimgFood = foodArr.splice(randomLFood,1);
      pusherLeft =leftimgFood.toString();
        console.log(foodArr);
        console.log(leftimgFood);
        randomRFood = (Math.floor(Math.random() * foodArr.length));
        rightimgFood = foodArr.splice(randomRFood,1);
        pusherRight =rightimgFood.toString();
        console.log(rightimgFood);
        console.log(foodArr);
        
    } 
     if (foodArr.length == 0){
        winnerforDinner();
        console.log(winner)
    }
    
}

function resetImages() {

    document.getElementById("leftImage").src="";
    document.getElementById("leftImage").alt=leftimgFood;
    document.getElementById("rightImage").src="";
    document.getElementById("rightImage").alt=rightimgFood;
}

function lFoodClick() {
    foodArr.push(pusherLeft);
    winner = leftimgFood;
    randomNum();
    resetImages();
}

function rFoodClick() {
    foodArr.push(pusherRight);
    winner = rightimgFood;
    randomNum();
    resetImages();
}

$(document).on("click", "#startbtnClose", function fullStart(){
    randomNum();
    resetImages();
    citysearch();
    cuisinesearch()
});

$(document).on("click", "#rightImage", rFoodClick);
$(document).on("click", "#leftImage", lFoodClick);

var access_key = '45163dc1f5e5d44d03509df23247aba3';
//45163dc1f5e5d44d03509df23247aba3
$(document).ready(function(){
    $("#mymodalStart").modal();
    $("#mymodalStart").modal('open');

//ip address finder
    $.ajax({
        url: 'http://api.ipapi.com/check' + '?access_key=' + access_key,   
        dataType: 'json',
        async:false,
        success: function(results) {
            ipout = results;
            // output the "calling_code" object inside "location"
            
            
        }
    });
    latitude_fromIP=ipout.latitude;
longitude_fromIP=ipout.longitude;
city_fromIP = ipout.city;
console.log(ipout);
    console.log(latitude_fromIP );
    console.log(longitude_fromIP);  




});

function citysearch(){
        $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("user-key", "964d11c9e9159afba79051e5c707f40b");
          },
        
        url: "https://developers.zomato.com/api/v2.1/cities?lat="+latitude_fromIP+"&lon="+longitude_fromIP,
      
        dataType: 'json',
        async: false,
        success: function (data) {
            items = data;
        }     
        
    });
    entity_id = items.location_suggestions[0].id
    console.log("entity_id" +entity_id);
}

function cuisinesearch(){
    $.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("user-key", "964d11c9e9159afba79051e5c707f40b");
      },
    
    url: "https://developers.zomato.com/api/v2.1/cuisines?lat="+latitude_fromIP+"&lon="+longitude_fromIP,
  
    dataType: 'json',
    async: false,
    success: function (totals) {
        listofcuisines = totals;
    }     
    
});

console.log(listofcuisines.cuisines[0].cuisine.cuisine_id);
console.log(listofcuisines.cuisines[0].cuisine.cuisine_name);
}


$(document).on("click", "#startbtnClose", function closestartModal(){
    $("#mymodalStart").modal('close');
});

function winnerforDinner() {
    $("#Mymodal1").modal();
    $("#Mymodal1").modal('open');
}
$(document).on("click", "#btnforFood", function closestartModal(){
    $("#Mymodal1").modal('close');
});

function callonforRestruants (){
$.ajax({
    beforeSend: function(request) {
        request.setRequestHeader("user-key", "964d11c9e9159afba79051e5c707f40b");
      },
    
    url: "https://developers.zomato.com/api/v2.1/search?entity_id="+ entity_id +"&entity_type=city&count=15&lat="+latitude_fromIP+"=&lon="+longitude_fromIP+"&radius=7000&cuisines=6",
  
    dataType: 'json',
    async: false,
    success: function (data) {
        listofrestraunts = data;
    }    
     
    
});
console.log(listofrestraunts.restaurants[0]);


}

function addtoTable(){
    for(i=0; i<10; i++){
        var tr = $("<tr>");
        var rName =$("<td>").text(listofrestraunts.restaurants[i].restaurant.name);
        var rRating =$("<td>").text(listofrestraunts.restaurants[i].restaurant.user_rating.aggregate_rating);
        var rLocation =$("<td>").text(listofrestraunts.restaurants[i].restaurant.location.address);
        tr.append(rName);
        tr.append(rRating);
        tr.append(rLocation);
        $("#mytable").append(tr);
    
    }
}
$(document).on("click","#btnforFood",function() {
   callonforRestruants(); 
   addtoTable();
   $("#modalforTable").modal();
    $("#modalforTable").modal('open');
});
  