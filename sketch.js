var dog,dogImg,dogImg1
var happyDog
var foodS,foodStock
var database
var fedTime,lastFed,feed,addFood,foodObj
function preload(){
dogImg=loadImage("images/dogImg.png")
happyDog=loadImage("images/dogImg1.png")
}

function setup(){
  database=firebase.database();
    createCanvas(500,500);

    foodObj=new Food()

    foodStock=database.ref('Food')
    foodStock.on("value",readStock)

    dog = createSprite(250,250,10,10);
    dog.addImage(dogImg)
    dog.scale=0.15

    feed=createButton("Feed The Dog")
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood=createButton("Add Food")
    addFood.position(800,95);
    addFood.mousePressed(addFoods);

    

}


function draw(){
  background("green")
  foodObj.display()
  
  fedTime=database.ref('FeedTime')
fedTime.on("value",function(data){
  lastFed=data.val()
});

fill(255,255,254);
 textSize(15); 
 if(lastFed>=12){ 
   text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }
   else if(lastFed==0){ 
     text("Last Feed : 12 AM",350,30);
   }
   else{ 
     text("Last Feed : "+ lastFed + " AM", 350,30);
     }

 drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog);
  
  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++

  database.ref('/').update({
  Food:foodS
  })
}




