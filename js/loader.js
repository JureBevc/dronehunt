var imageSources = {
    back: "js/res/back.png",
    drone: "js/res/drone.png",
    droneDead: "js/res/drone_dead.png",
    UIbullet: "js/res/UIbullet.png",
    UIscore: "js/res/UIscore.png",
    UIshoot: "js/res/UIshoot.png",
    cursor: "js/res/cursor.png",
    dogLaugh1: "js/res/dog_laugh1.png",
    dogLaugh2: "js/res/dog_laugh2.png",
    dogCatch: "js/res/dog_catch.png"
}


var images = {};
window.loadImages = function(callback) {
    let sources = imageSources;
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function(){
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

var myFont = new FontFace('myFont', 'url(js/res/bros.ttf)');

myFont.load().then(function(font){
    document.fonts.add(font);
    console.log('Font loaded');
});