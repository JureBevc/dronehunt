var shot1 = new Audio('js/res/shot1.mp3');
var shot2 = new Audio('js/res/shot2.mp3');

function playHit(){
    let audio = shot2;

    audio.currentTime = 0;
    audio.volume = 0.05;
    audio.play();
}

function playMiss(){
    let audio = shot1;

    audio.currentTime = 0;
    audio.volume = 0.05;
    audio.play();
}