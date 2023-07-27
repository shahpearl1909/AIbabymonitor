song="";
status="";
object=[];
function preload(){
    song=loadSound("clock_alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="status: detecting object";
}

function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }
    console.log(results);
    object=results;
}
function draw(){
    image(video,0,0,380,380);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        r=random(255);
        g =random(255);
        b=random(255);
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="status : object detected";

            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label == "person"){
                document.getElementById("number").innerHTML="Baby Found";
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number").innerHTML="Baby Not Found";
                console.log("play");
                song.play();
            }

            
        }
        if(object.length == 0){
            document.getElementById("number").innerHTML="Baby Not Found";
            console.log("play");
            song.play();
        }
    }

    //fill("#452E52");
    //text("Dog",150,75);
    //textSize(20);
    //noFill();
    //stroke("#452E52");
    //rect(140,50,200,350);

    //fill("#6F4369");
    //text("Cat",350,75);
    //textSize(20);
    //noFill();
    //stroke("#6F4369");
    //rect(290,55,330,350);
}