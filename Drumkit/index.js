numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i<numberOfDrumButtons; ++i) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML)
        buttonAnimation(buttonInnerHTML)
    }
}

document.addEventListener("keypress", function(event) {
    makeSound(event.key)

})

function makeSound(key) {
    switch (key) {
        case "w":
            var audio = new Audio("sounds/tom1.mp3");
            audio.play();
            break;
        
        case "s":
            var audio = new Audio("sounds/tom2.mp3");
            audio.play();
            break;
            
        case "d":
            var audio = new Audio("sounds/tom3.mp3");
            audio.play();
            break;

        case "j":
            var audio = new Audio("sounds/tom4.mp3");
            audio.play();
            break;

        case "k":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;

        case "l":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        
        case "l":
            var audio = new Audio("sounds/crash.mp3")
            audio.play();
            break;

        default:
            console.log("Bongo")
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey)
    activeButton.classList.add(".pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed");

    }, 300)

}