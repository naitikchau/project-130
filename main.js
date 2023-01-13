Peter_pan_song="";
Harry_potter_theme_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
score_left_wrist = 0; 
score_right_Wrist = 0;
song_Peter_pan = "";
song_Harry_potter_theme = "";


function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw(){
    image(video, 0, 0, 600, 530);

    fill("#ff0000");
    stroke("ff0000");

    song_Peter_pan = Peter_pan_song.isPlaying();
    console.log(song_Peter_pan );

    song_Harry_potter_theme =Harry_potter_theme_song.isPlaying();
    console.log(song_Harry_potter_theme);

    if(score_left_wrist > 0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song.stop();
        if(song_Peter_pan = false)
        {
            Peter_pan_song.play();
        }

        else
        {
           console.log("Song Name : peter_pan_song");
           document.getElementById("song_id").innerHTML = "Song Name : Peter Pan Song";
        }
    }

    if(score_right_wrist > 0.2)
    {
        circle(rightWrist_x,rightWrist_y,20);
        Peter_pan_song.stop();
        if(song_Harry_potter_theme = false)
        {
            Harry_potter_theme_song.play();
        }

        else
        {
           console.log("Song Name : Harry_potter_theme_song");
           document.getElementById("song_id").innerHTML = "Song Name : Harry_potter_theme_song";
        }
    }

}

function modelLoaded()
{
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0)
    {
        console.log(results);

        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log(score_left_wrist);

        score_right_wrist = results[0].pose.keypoints[10].score;
        console.log(score_right_wrist);
         
        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}