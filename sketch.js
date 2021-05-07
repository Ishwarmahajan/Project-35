//Create variables here
var dog, dog_i, happyDog, happyDog_i, database, foodS, foodStock

function preload()
{
	//load images here
  dog_i = loadImage("images/dogImg.png")
  happyDog_i = loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(500, 500);
  database = firebase.database()

  dog = createSprite(250, 300, 50, 50)
  dog.scale = 0.2
  dog.addImage(dog_i)

  happyDog = createSprite(250, 300, 50, 50)
  happyDog.scale = 0.2


  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  
}


function draw() { 
  background(46, 139, 87) 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS)
    happyDog.addImage(happyDog_i)

  }

  drawSprites();
  //add styles here
  textSize(17)
  fill("black")
  text("Note: Press UP_ARROW Key To Feed Drago Milk", 70, 470)

  //text("Food: ", 250, 100)

}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){

  if(x <= 0){
    x = 0
  }
  else{
    x = x-1
  }
  database.ref('/').update({
    Food:x
  })
}



