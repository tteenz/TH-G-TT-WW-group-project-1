//firebase



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
var cuisine_nameholder ="";
var rnameWin ="";
var lnameWin ="";
//entity_id=288&entity_type=city&count=15&lat=33.5242&lon=-84.359&radius=7000&cuisines=BBQ

var imgtopasteL ='';
var imgtopasteR ='';
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

// function deleter(){
//     for(y=0;y>(newArr.length -1);y++){
//         $.ajax({
//             url: "https://pixabay.com/api/?username=hutwagnert&key=1631539-10605044-f5529b1c76ff6ff923f9878bd&q=" + newArr[y] + "&image_type=photo&per_page=3&category=food",
//             async:false,
//             success: function(responseL) {
              
//               imgtopasteL =responseL;
//             },
//             error: function(responseL) {
//               console.log(responseL);
//             }
            
//           })
          
    
// }}

function randomNum() {

    if((newArr.length -1)>1) {

        //left
        var lengthtoUse= newArr.length -1;
    
        randomLFood = (Math.floor(Math.random() * lengthtoUse)); 
        
      pusherLeft = newArr.splice(randomLFood,1);
      
      var lengthtoUse2 =newArr.length -1;
     
     leftimgFood=newArr[randomLFood].cus;
    console.log("before L" +newArr.length);
     console.log(leftimgFood);
     grabImgL();//create imtopaste
     
    $(".leftWord").text(leftimgFood);
     $("#leftImage").attr("src", imgtopasteL.hits[0].largeImageURL);
    
     lidWin =newArr[randomLFood].id;
     lnameWin =newArr[randomLFood].cus;

     //right
        randomRFood = (Math.floor(Math.random() * lengthtoUse2));
      
        pusherRight = newArr.splice(randomRFood,1);
        
        rightimgFood=newArr[randomRFood].cus;
        $(".rightWord").text(rightimgFood);
        console.log("before R" +newArr.length);
        console.log(rightimgFood);
        grabImgR();
        $("#rightImage").attr("src", imgtopasteR.hits[0].largeImageURL);
       console.log(imgtopasteR.hits[0].largeImageURL);
        ridWin =newArr[randomRFood].id;
        rnameWin =newArr[randomRFood].cus;
        
    } else {
        winnerforDinner();
        hider();
        callonforRestruants(); 


    }
    console.log("afterboth" +newArr.length);
}

function resetImages() {
    $(".rightWord").text("");
    $(".leftWord").text("");
    $("#leftImage").attr("src", "");
    $("#rightImage").attr("src", "");
}

function lFoodClick() {
    newArr.concat(pusherLeft);
    winner = lidWin;
    cuisine_holder =winner;
    cuisine_nameholder =lnameWin;
    $(".rightWord").text("");
    $(".leftWord").text("");
    $("#leftImage").attr("src", "");
    $("#rightImage").attr("src", "");
    setTimeout(randomNum, 100);
    //randomNum();
    //resetImages();
}

function rFoodClick() {
    newArr.concat(pusherRight);
    winner = ridWin;
    cuisine_holder=winner;
    cuisine_nameholder =rnameWin;
    $(".rightWord").text("");
    $(".leftWord").text("");
    $("#leftImage").attr("src", "");
    $("#rightImage").attr("src", "");
    setTimeout(randomNum, 100);
    //randomNum();
    //resetImages();
}
$(document).on("click", ".wanttoReset", function(){
    console.log("clicked");
  

    cuisinesearch();
    console.log(newArr);
    randomNum();
    shower();
    //resetImages();
  
   
});
$(document).on("click", "#startbtnClose", function(){
    randomNum();
    //resetImages();
    citysearch();
    shower();
    

   
});

$(document).on("click", "#rightImage", rFoodClick);
$(document).on("click", "#leftImage", lFoodClick);

var access_key = '45163dc1f5e5d44d03509df23247aba3';

$(document).ready(function(){
    
    $("#mymodalStart").modal();
    $("#mymodalStart").modal('open');
    hider();
   

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


    cuisinesearch();


});

function grabImgL(){ 
    $.ajax({
    url: "https://pixabay.com/api/?username=hutwagnert&key=1631539-10605044-f5529b1c76ff6ff923f9878bd&q=" + leftimgFood + "&image_type=photo&per_page=3&category=food",
    async:false,
    success: function(responseL) {
      
      imgtopasteL =responseL;
    },
    error: function(responseL) {
      console.log(responseL);
    }
    
    
  })
  if(imgtopasteL.hits.length == 0){
randomNum();
  } else 
console.log(imgtopasteL);
}


  function grabImgR(){
    $.ajax({
    url: "https://pixabay.com/api/?username=hutwagnert&key=1631539-10605044-f5529b1c76ff6ff923f9878bd&q=" + rightimgFood + "&image_type=photo&per_page=3&category=food",
    async:false,
    success: function(responseR) {
     
      imgtopasteR =responseR;   
    },
    error: function(responseR) {
      console.log(responseR);
    }
 })
  if(imgtopasteR.hits.length == 0){
randomNum();      
  } else {} 
console.log(imgtopasteR)
}
console.log(imgtopasteR)


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

//[{id,cus},{id,cus},]

}



}
function hider(){
    $("#mainHolder").hide();
    $("#contsmallScreen").hide();
}
function shower(){
    $("#mainHolder").show();
    $("#contsmallScreen").show();
}


$(document).on("click", "#startbtnClose", function closestartModal(){
    $("#mymodalStart").modal('close');
});

function winnerforDinner() {
    $("#Mymodal1").modal();
    $("#Mymodal1").modal('open');
}
$("#btnforFood").click (function closestartModal(){
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
    
    }}
$(document).on("click","#btnforFood",function() {
   
  addtoTable();
   $("#modalforTable").modal();
    $("#modalforTable").modal('open');
});
  