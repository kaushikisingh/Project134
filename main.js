audio="";
status="";
object=[];
function setup()
{
    canvas=createCanvas(400,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    object_detector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status:detecting objects";
}
function preload()
{
  audio=loadSound("https://youtu.be/iNpXCzaWW1s");
}
function modelLoaded()
{
    console.log("modelLoaded");
 status=true;
 object_detector.detect(video,gotResults);
}
function draw()
{
    image(video,0,0,400,400);
    r=random(255);
    g=random(255);
    b=random(255);
   if(status !="")
   {
    object_detector.detect(video,gotResults); 
    audio.play();
       for(i=0;i<object.length;i++)
       {
           document.getElementById("status").innerHTML="Status: object detected";
           document.getElementById("baby-found").innerHTML="baby is detected"+object.length; 
           fill(r,g,b);
           percent=floor(object[i].confidence*100);
           text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x,object[i].y,object[i].width,object[i].height);
       }
   }
   else{
       audio.stop();
   }
}
function gotResults(error,results)
{
if(error)
{
    console.log(error);
}
console.log(results);
object=results;
}