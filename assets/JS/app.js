var api = "https://developers.zomato.com/api/v2.1/categories"
var apikey = "964d11c9e9159afba79051e5c707f40b"
var query = "&q="
var queryURL = "Atlanta";

query = "q=Atlanta";
queryURL = api + apikey + query; 

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

function waiter() {
    setTimeout(function () {

    }, 2000);
}
$(document).on("click", "#startbtnClose", function fullStart(){
    randomNum();
    resetImages();
});

$(document).on("click", "#rightImage", rFoodClick);
$(document).on("click", "#leftImage", lFoodClick);

$(document).ready(function(){
    $("#mymodalStart").modal();
    $("#mymodalStart").modal('open');
    $.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("user-key", "964d11c9e9159afba79051e5c707f40b");
          },
        //https://developers.zomato.com/api/v2.1/cities?q=Atlanta
        url: "https://developers.zomato.com/api/v2.1/cities?&q=Atlanta",
      
        dataType: 'json',
        async: false,
        success: function (data) {
            items = data
        }     
        
    });
    console.log(items);
});

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


