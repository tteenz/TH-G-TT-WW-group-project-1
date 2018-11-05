
var api = "https://developers.zomato.com/api/v2.1/categories"
var apikey = "964d11c9e9159afba79051e5c707f40b"
var query = "&q="
var queryURL = "Atlanta";
var entity_id ="";
var latitude_fromIP="";
var longitude_fromIP="";
var city_fromIP ="";
var listofrestraunts ="";
var cuisine_holder="";
//entity_id=288&entity_type=city&count=15&lat=33.5242&lon=-84.359&radius=7000&cuisines=BBQ


var ridWin ="";
var lidWin = "";
var foodArr = ["sushi", "pizza food", "mexican food", "italian food", "mediterranean food", "hibachi food", "healthy food", "burger", "chinese food", "korean food"];
var cusineOb = {};
const newArr =[];
var holderforNew = [1,2,3];
var cuisineCont = {};
var cusineNum = [];
var cusineType = []; 
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

    if((newArr.length -1)>1) {
        var lengthtoUse= newArr.length -1;
       //console.log(lengthtoUse);
        randomLFood = (Math.floor(Math.random() * lengthtoUse)); 
        //console.log(randomLFood);
        //foodArr --> new Arr
        //
      pusherLeft = newArr.splice(randomLFood,1);
      var lengthtoUse2 =newArr.length -1;
     // console.log(lengthtoUse2);
     leftimgFood=newArr[randomLFood].cus;
     lidWin =newArr[randomLFood].id;
        //console.log(newArr);
        //console.log(leftimgFood);
        randomRFood = (Math.floor(Math.random() * lengthtoUse2));
        //console.log(randomRFood);
        pusherRight = newArr.splice(randomRFood,1);
        rightimgFood=newArr[randomRFood].cus;
        ridWin =newArr[randomRFood].id;
        //console.log(rightimgFood);
        //console.log(newArr);
        //console.log(winner);
        
    } else {
        winnerforDinner();
        console.log(winner);
        console.log(cuisine_holder);
        console.log(rightimgFood);
        console.log(leftimgFood);
    }
    
}

function resetImages() {

    document.getElementById("leftImage").src="";
    document.getElementById("leftImage").alt=leftimgFood;
    document.getElementById("rightImage").src="";
    document.getElementById("rightImage").alt=rightimgFood;
}

function lFoodClick() {
    newArr.concat(pusherLeft);
    winner = lidWin;
    cuisine_holder =winner;
    randomNum();
    resetImages();
}

function rFoodClick() {
    newArr.concat(pusherRight);
    winner = ridWin;
    cuisine_holder=winner;
    randomNum();
    resetImages();
}

$(document).on("click", "#startbtnClose", function fullStart(){
    randomNum();
    resetImages();
    citysearch();
   
});

$(document).on("click", "#rightImage", rFoodClick);
$(document).on("click", "#leftImage", lFoodClick);

var access_key = '45163dc1f5e5d44d03509df23247aba3';
//45163dc1f5e5d44d03509df23247aba3
$(document).ready(function(){
    console.log(newArr);
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

    cuisinesearch();


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

for(j =0; j<listofcuisines.cuisines.length; j=j +4){
   // newarr=[{idhold:"blank",cuisinehold:"blank"}]
var curId=listofcuisines.cuisines[j].cuisine.cuisine_id;
var curCus =listofcuisines.cuisines[j].cuisine.cuisine_name

newArr.push({id:curId,cus:curCus});



}

console.log(newArr);

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
    
    url: "https://developers.zomato.com/api/v2.1/search?entity_id="+ entity_id +"&entity_type=city&count=15&lat="+latitude_fromIP+"=&lon="+longitude_fromIP+"&cuisines="+cuisine_holder,
  
    dataType: 'json',
    async: false,
    success: function (data) {
        listofrestraunts = data;
    }    
     
    
});
console.log(listofrestraunts);


}

function addtoTable(){
    for(i=0; i<listofrestraunts.restaurants.length; i++){
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
  