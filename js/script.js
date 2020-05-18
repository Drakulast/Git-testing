/*globals $:false, window: flase,  document:false*/
/*-------------General Description------------------
- Two types of bubbles have been implemented: small and large. The small ones only come from the images of corals either randomly or by clicking on coral. The large bubbles spawn randomly in the bottom of the window. On-click the large bubbles make a pop sound and then disappear.  
- The two fishes and the shark are moving into a random pattern.
- The orange fish moves slower. On-click it increases its size for a while. While clicking anywhere on the screen, the orange fish follows.
- The blue fish moves faster. When hovering over it, it swims away to a random location.
- The shark changes the image depending on an its action. Additionally, you can steer the shark with arrow keys. When the shark catches the fish (collides), then the fish disappears and the shark gets bigger.
- The two stingrays move its position when on-clicked.
- The fishing rod appears randomly in the top of the aquarium. There is a possibility that the blue fish will be attracted to it. It takes the fish with itself outside the window. Then they both randomly respawn.
*/
//***IONUT WORKED ON THIS PART***//
var bubbleSpeed = 5000; //THE ANIMATION SPEED FOR ALL THE BUBBLES
var pos1X = Math.floor($("#coral1Id").offset().left + $("#coral1Id").width() / 2); //COORDINATES
var pos1Y = Math.floor($("#coral1Id").offset().top + $("#coral1Id").height() / 2); //FOR THE 
var pos2X = Math.floor($("#coral2Id").offset().left + $("#coral2Id").width() / 2); //SMALL BUBBLES
var pos2Y = Math.floor($("#coral2Id").offset().top + $("#coral2Id").height() / 2); //SPAWN POINTS
//FUNCTIONALITY FOR THE BIG BUBBLES
function spawnBubble(idRef) {
    var randomX = Math.floor((Math.random() * ($(window).width() - $(idRef).width())));
    $(idRef).offset({
        top: $(window).height()
        , left: randomX
    }).delay(Math.floor(Math.random() * 1500));
    floatBubble(idRef);
}

function floatBubble(idRef) {
    $(idRef).animate({
        top: -100
    }, bubbleSpeed, "swing", function () {
        spawnBubble(this)
    }).delay(750);
}
//FUNCTIONALITY FOR THE SMALL BUBBLES
//position IS UED TO SPECIFY THE SPAWN POINT
//float IS USED TO SPECIFY IF THE BUBBLE WILL FLOAT AFTER SPAWN OR IT WILL WAIT FOR ANOTHER ACTION TO FLOAT
//maxDelay IS USED TO SPECIFY THE TIMEFRAME IN WHICH THE RANDOM DELAY TIME WILL BE 
function spawnSmallBubble(idRef, position, float, maxDelay) {
    //THE BUBBLE WILL SPAWN IN ONE OF THE TWO SPAWN POINTS. IF THE POSITION SPECIFIED WHILE CALLING THE FUNCTION IS NOT 1 OR 2 THE BUBBLE WILL SPAWN AT THE BOTTOM OF THE AQUARIUM
    if (position == 1) {
        $(idRef).offset({
            top: pos1Y
            , left: pos1X
        }).delay(Math.floor(Math.random() * maxDelay));
    }
    else if (position == 2) {
        $(idRef).offset({
            top: pos2Y
            , left: pos2X
        }).delay(Math.floor(Math.random() * maxDelay));
    }
    else {
        spawnBubble(idRef);
    }
    if (float == true) {
        floatSmallBubble(idRef, position, float, maxDelay);
    }
}

function floatSmallBubble(idRef, position, float, maxDelay) {
    //THESE TWO VARIABLES ARE USED SO THE BUBBLE WILL MOVE SIDEWAYS WHILE FLOATING TOWARDS THE TOP
    var posX = $(idRef).offset().left;
    var randomY = Math.floor(Math.random() * 100)
    if (Math.random() < 0.5) { //THIS IF IS USED TO DETERMINE IN A RANDOM WAY IF THE BUBBLE WILL MOVE TO THE LEFT OR TO THE RIGHT
        $(idRef).animate({
            top: -25
            , left: posX - randomY
        }, bubbleSpeed, "swing", function () {
            spawnSmallBubble(this, position, float, maxDelay)
        }).delay(750);
    }
    else {
        $(idRef).animate({
            top: -25
            , left: posX + randomY
        }, bubbleSpeed, "swing", function () {
            spawnSmallBubble(this, position, float, maxDelay)
        }).delay(750);
    }
}
//SPAWNING AND CALLING THE FUNCTIONALITY FOR ALL BUBBLES
function animateBubbles() {
    spawnBubble("#bubble1Id");
    spawnBubble("#bubble2Id");
    spawnBubble("#bubble3Id");
    $("#bubble1Id").on("click", function () {
        $("audio")[0].play();
        $("#bubble1Id").fadeOut();
        $("#bubble1Id").stop(true);
        spawnBubble("#bubble1Id");
    })
    $("#bubble2Id").on("click", function () {
        $("audio")[0].play();
        $("#bubble2Id").fadeOut();
        $("#bubble2Id").stop(true);
        spawnBubble("#bubble2Id");
    })
    $("#bubble3Id").on("click", function () {
            $("audio")[0].play();
            $("#bubble3Id").fadeOut();
            $("#bubble3Id").stop(true);
            spawnBubble("#bubble3Id");
        })
        //SPAWNING SMALL BUBBLES IN BOTH SPAWN POINTS. EACH SPAWN POINT CONTAINTS 2 BUBBLES THAT FLOAT AUTOMATICALLY AND 3 BUBBLES THAT FLOAT ONLY WHEN CLICKING THE CORAL
        //SPAWN POINT 1
    spawnSmallBubble("#bubbleSm1Id", 1, true, 4000);
    spawnSmallBubble("#bubbleSm2Id", 1, true, 4000);
    spawnSmallBubble("#bubbleSm3Id", 1, false, 500);
    spawnSmallBubble("#bubbleSm4Id", 1, false, 500);
    spawnSmallBubble("#bubbleSm5Id", 1, false, 500);
    //SPAWN POINT 2
    spawnSmallBubble("#bubbleSm6Id", 2, true, 4000);
    spawnSmallBubble("#bubbleSm7Id", 2, true, 4000);
    spawnSmallBubble("#bubbleSm8Id", 2, false, 500);
    spawnSmallBubble("#bubbleSm9Id", 2, false, 500);
    spawnSmallBubble("#bubbleSm10Id", 2, false, 500);
}
animateBubbles();
//CORAL ANIMATIONS ON CLICK EVENT
$("#coral1Id").on("click", function () {
    $("#coral1Id").animate({
        height: "+=5px"
        , top: "-=5px"
        , left: "-=5px"
    }).delay(150).animate({
        height: "-=5px"
        , top: "+=5px"
        , left: "+=5px"
    });
    if ($("#bubbleSm3Id").offset().left == pos1X && $("#bubbleSm3Id").offset().top == pos1Y && $("#bubbleSm4Id").offset().left == pos1X && $("#bubbleSm4Id").offset().top == pos1Y && $("#bubbleSm5Id").offset().left == pos1X && $("#bubbleSm5Id").offset().top == pos1Y) {
        floatSmallBubble("#bubbleSm3Id", 1, false, 750);
        floatSmallBubble("#bubbleSm4Id", 1, false, 750);
        floatSmallBubble("#bubbleSm5Id", 1, false, 750);
        $("audio")[1].play();
    }
})
$("#coral2Id").on("click", function () {
    $("#coral2Id").animate({
        height: "+=5px"
        , top: "-=5px"
        , left: "-=5px"
    }).delay(150).animate({
        height: "-=5px"
        , top: "+=5px"
        , left: "+=5px"
    });
    if ($("#bubbleSm8Id").offset().left == pos2X && $("#bubbleSm8Id").offset().top == pos2Y && $("#bubbleSm9Id").offset().left == pos2X && $("#bubbleSm9Id").offset().top == pos2Y && $("#bubbleSm10Id").offset().left == pos2X && $("#bubbleSm10Id").offset().top == pos2Y) {
        floatSmallBubble("#bubbleSm8Id", 2, false, 750);
        floatSmallBubble("#bubbleSm9Id", 2, false, 750);
        floatSmallBubble("#bubbleSm10Id", 2, false, 750);
        $("audio")[1].play();
    }
})
$("#coral4Id").on("click", function () {
        $("#coral4Id").animate({
            height: "+=10px"
            , top: "-=10px"
            , left: "-=10px"
        }).delay(150).animate({
            height: "-=10px"
            , top: "+=10px"
            , left: "+=10px"
        });
    })
    // IONUT END
    //***CLAUDIU WORKED ON THIS PART***//
    //Orange fish moving and flipping sides on click
$(window).on("click", function (event) {
    $("#fish1Id").stop(true); //Firstly when we click the orange fish must stop any of the animation (except increasing)
    //Taking the coordinates of the click and substracting half of the heigth and width of the fish for making the fish move somewhere on the window and arriving on the click with the middle of the fish picture, not with the top left corner
    var x = event.pageX - $("#fish1Id").width() / 2;
    var y = event.pageY - $("#fish1Id").height() / 2;
    //Making the width and height of the window and substracting width and  heigth of the fish picture to create boundaries
    var w = $(window).width() - $("#fish1Id").width() / 2.5;
    var h = $(window).height() - $("#fish1Id").height() / 3;
    //Making the fish flip by comparing the actual X coordinate of the click with the current X coordinate of the fish position
    if (x < $("#fish1Id").offset().left) {
        $("#fish1Id").css({
            "transform": "scaleX(-1)"
        }); //Using transform property from css along with scaleX for inverting the image.
    }
    else {
        $("#fish1Id").css({
            "transform": "scaleX(1)"
        });
    }
    //Making the fish to stay inside the window
    //Because the picture of the fish it's not perfectly cropped I had to try different nubmbers for dividing and substracting
    //This is for the right side
    if (x > (w - $("#fish1Id").width() / 2)) {
        x = w - $("#fish1Id").width() / 2;
    }
    //This is for the left side side
    if (x < -$("#fish1Id").width() / 10) {
        x = -$("#fish1Id").width() / 10;
    }
    //This is for the bottom side
    if (y > (h - $("#fish1Id").height() / 2)) {
        y = h - $("#fish1Id").height() / 2;
    }
    //This is for the top side
    if (y < -$("#fish1Id").height() / 5) {
        y = -$("#fish1Id").height() / 5;
    }
    //Here is the actual animation of moving to click
    $("#fish1Id").animate({
        left: x
        , top: y
    }, {
        queue: false //Using queue : flase to be able to move the fish while its size is increased otherwise the script will wait for the increasing animation to finish and then will do the moving one
    });
    window.setTimeout(movementOrange, 500); //This one makes the fish slowly moving again after the click and the new position of the fish on the screen
    window.setTimeout(function () {
        $("#fish1Id").animate({
            height: "250"
            , width: "250"
        });
    }, 500); //And this one is making the fish to the initial size if the increasing animation it's intrerupted
});
// Orange fish increasing size on double click
$("#fish1Id").on("dblclick", function () {
    $("#fish1Id").animate({
        height: "+=100"
        , width: "+=100"
        , top: "-=50"
        , left: "-=50"
    }).delay(2000).animate({
        height: "-=100"
        , width: "-=100"
        , top: "+=50"
        , left: "+=50"
    }); //I'm increasing the size with 100px but I'm also changing the position by half of the increasing number because in this way the animation will look like the fish doesn't change his position at all when increase or decrease, otherwise the animation will increase and  decrease from the top left corner
});
// Stingray1 changing position and flipping on click
$("#stingray1Id").on("click", function () {
    //Using the distance and the math functions to create a random X coordinate inside the window
    var distance = $(window).width() - $("#stingray1Id").width();
    var randomNumber = Math.floor(Math.random() * distance);
    //Making the stingray flipping sides when moves
    if (randomNumber < $("#stingray1Id").offset().left) {
        $("#stingray1Id").css({
            "transform": "scaleX(-1)"
        });
    }
    else {
        $("#stingray1Id").css({
            "transform": "scaleX(1)"
        });
    }
    //The actual movement
    $("#stingray1Id").animate({
        left: randomNumber
    }, "slow", "swing");
});
// Stingray2 changing position and flipping on click
$("#stingray2Id").on("click", function () {
    //Using the distance and the math functions to create a random X coordinate inside the window
    var distance = $(window).width() - $("#stingray2Id").width();
    var randomNumber = Math.floor(Math.random() * distance);
    //Making the stingray flipping sides when moves
    if (randomNumber < $("#stingray2Id").offset().left) {
        $("#stingray2Id").css({
            "transform": "scaleX(1)"
        });
    }
    else {
        $("#stingray2Id").css({
            "transform": "scaleX(-1)"
        });
    }
    //The actual movement
    $("#stingray2Id").animate({
        left: randomNumber
    }, "slow", "swing");
});
//***CLAUDIU FINISHED WORKING ON HIS PART***//
// CEZARY
//Orange Fish Random Movement -----------------------------------
function movementOrange() {
    //Function randomizes (X,Y) inside the window
    var randomizeWidth1 = Math.floor(Math.random() * ($(window).width() - $("#fish1Id").width()));
    var randomizeHeigth1 = Math.floor(Math.random() * ($(window).height() - $("#fish1Id").height()));
    //Then the fish follows chosen parameters and runs the function again, putting it in the loop
    $("#fish1Id").animate({
        top: randomizeHeigth1
        , left: randomizeWidth1
    }, 9000, function () {
        movementOrange()
    });
    //Flipped IMG-----------
    //The fish is  pointing towards the parameters that it needs to follow 
    //If the fish's X is more to the right than the X that it goes to, flip it 
    if ($("#fish1Id").offset().left > randomizeWidth1) {
        $("#fish1Id").css({
            "transform": "scale(-1, 1)"
        });
    }
    //If the fish's X is more to the left than the X that it goes to, flip it 
    if ($("#fish1Id").offset().left <= randomizeWidth1) {
        $("#fish1Id").css({
            "transform": "scale(1, 1)"
        });
    }
    //----------------------
}
$(document).ready(function () {
    movementOrange()
});
//------------------------------------------------------
//Blue Fish Random Movement -----------------------------------
function movementBlue() {
    //Function randomizes (X,Y) inside the window
    var randomizeWidth2 = Math.floor(Math.random() * ($(window).width() - $("#fish2Id").width()));
    var randomizeHeigth2 = Math.floor(Math.random() * ($(window).height() - $("#fish2Id").height()));
    //Then the fish follows chosen parameters and runs the function again, putting it in the loop
    $("#fish2Id").animate({
        top: randomizeHeigth2
        , left: randomizeWidth2
    }, 3000, function () {
        movementBlue();
    });
    //Flipped IMG------------
    //The fish is  pointing towards the parameters that it needs to follow 
    //If the fish's X is more to the right than the X that it goes to, flip it 
    if ($("#fish2Id").offset().left > randomizeWidth2) {
        $("#fish2Id").css({
            "transform": "scale(-1, 1)"
        });
    }
    //If the fish's X is more to the left than the X that it goes to, flip it 
    if ($("#fish2Id").offset().left <= randomizeWidth2) {
        $("#fish2Id").css({
            "transform": "scale(1, 1)"
        });
    }
    //----------------------
}
$(document).ready(function () {
    movementBlue()
});
//------------------------------------------------------
//Shark Random Movement -----------------------------------
function movementShark() {
    //Function randomizes (X,Y) inside the window
    var randomizeWidth4 = Math.floor(Math.random() * ($(window).width() - $("#sharkId").width()));
    var randomizeHeigth4 = Math.floor(Math.random() * ($(window).height() - $("#sharkId").height()));
    //Then the shark follows chosen parameters and runs the function again, putting it in the loop
    $("#sharkId").animate({
        top: randomizeHeigth4
        , left: randomizeWidth4
    }, 9000, function () {
        movementShark();
    });
}
//------------------------------------------------------
//Fishing Rod  -----------------------------------------
//Here, the fishing rod appears at the top of the screen at random position. The X is being randomized with a substraction of rod's width, so that it can only appear as a whole on the screen. 
function fishingRod() {
    var randomizeWidth3 = Math.floor(Math.random() * ($(window).width() - $("#rod").width()));
    $("#rod").offset({
        left: randomizeWidth3
    }).css({
        "top": "-360px"
    });
    $("#rod").animate({
        top: 100
    }, 1000)
}
// Interval created to check every 0.1s if the fish is being catched
var myInterval = window.setInterval(getFished, 100);
// --- Source and inspiration by Codepen.io 
// --- https://codepen.io/cmrector/pen/zMmgoz
//Function which detects the possible collision between the rod and the blue fish. It takes X and Y of both objects and creates two rectangles.
function getFished() {
    var rodX = $("#rod").offset().left;
    var rodWidth = 100;
    var rodY = 360;
    var rodHeight = 100;
    var fishX = $("#fish2Id").offset().left;
    var fishWidth = 100;
    var fishY = $("#fish2Id").offset().top;
    var fishHeight = 100;
    if (rodY + rodHeight < fishY || rodY > fishY + fishHeight || rodX > fishX + fishWidth || rodX + rodWidth < fishX) {
        return false;
    }
    //When the rectangles collide the process of checking (interval) is stopped. The timeouts are set to prevent the fish from being catched right after running the code. All the animations of the fish are stopped. Then, the fish goes directly on the hook. After short delay, it follows the rod and they both go outside the screen. The fish itself is being rotated by 20 degrees. It fades out, moves to the new position and fades in. At the end, the fish starts to move as with the movementBlue() function. At the same time, the rod randomly repeats fishingRod() function. 
    else {
        window.clearInterval(myInterval);
        window.setTimeout(function () {
            $("#fish2Id").stop(true).animate({
                top: $("#rod").offset().top + 415
                , left: $("#rod").offset().left
            , }, 2000).delay(1000).animate({
                top: -360
            }, 2000).css({
                "transform": "scale(1, -1)" && "rotate(20deg)"
            });
            $("#rod").delay(3000).animate({
                top: -600
            }, 1900)
        }, 2000)
        window.setTimeout(function () {
            $("#rod").animate({
                top: -2
            }, 500, fishingRod())
            $("#fish2Id").fadeOut().animate({
                top: 400
                , left: 400
            }).delay(2000).css({
                "transform": "rotate(0deg)"
            }).animate({
                top: 450
            }, 500, function () {
                movementBlue();
                myInterval = window.setInterval(getFished, 100);
            }).fadeIn();
        }, 7000)
    }
}
$(document).ready(function () {
    fishingRod();
});
//CEZARY END
//----------------------------------------------------------------------------
// MARIA
// set random coordinates within the window frame
// define max height and width of window taking objects dimensions into account
// generate new coordinates within the window size
// using Math object with .floor method for rounding down and
// .random for generating a random value 0 < 1
function newPosition() {
    $("#fish2Id").stop(true);
    var height = $(window).height() - $("#fish2Id").height();
    var width = $(window).width() - $("#fish2Id").width();
    var newHeight = Math.floor(Math.random() * height);
    var newWidth = Math.floor(Math.random() * width);
    var newDimensions = [newHeight, newWidth];
    $("#fish2Id").animate({
        top: newDimensions[0]
        , left: newDimensions[1]
    });
    window.setTimeout(movementBlue, 500);
}
// set coordinates on mouseover
$("#fish2Id").on("mouseover", function () {
    newPosition();
});
// shark behaviour
movementShark();
// move shark with arrow keys within window
// jQuery window object with .on method with two parameters:
// the first parameter is the event keydown we want to respond to
// the second parameter is an anonymous function executed when keydown event occurs
// when keydown occurs the .stop method stops the currently running sharkMovement animation
// and the .attr method changes the src attribute of the jQuery object
$(window).on("keydown", function (event) {
    var shark = $("#sharkId");
    shark.stop(true).attr("src", "images/excitedShark.svg");
    // variables defining the max width and heigth of the window
    // the .offset method retrieves the current position
    // of the shark object relative to the document
    var maxHeight = $(window).height() - shark.height();
    var maxWidth = $(window).width() - shark.width();
    var sharkX = $("#sharkId").offset().left;
    var sharkY = $("#sharkId").offset().top;
    // decision structure for each key arrow using the keyCode property
    // determing whether the shark object is within the max frame or not
    // adding or removing 7 pixels from current position depending on max width and height of window
    // the value of the  transform property is toggled between 1 and -1 for flipping the shark
    var moveByPixel = 7;
    if (event.keyCode == 39) {
        if (sharkX >= maxWidth) {
            sharkX -= moveByPixel;
        }
        sharkX += moveByPixel;
        shark.css({
            "transform": "scaleX(-1)"
        });
    }
    if (event.keyCode == 37) {
        if (sharkX <= 0) {
            sharkX += moveByPixel;
        }
        sharkX -= moveByPixel;
        shark.css({
            "transform": "scaleX(1)"
        });
    }
    if (event.keyCode == 38) {
        if (sharkY <= 0) {
            sharkY += moveByPixel;
        }
        sharkY -= moveByPixel;
    }
    if (event.keyCode == 40) {
        if (sharkY >= maxHeight) {
            sharkY -= moveByPixel;
        }
        sharkY += moveByPixel;
    }
    // sets the offset coordinates of the shark relative to the document
    shark.offset({
        left: sharkX
    });
    shark.offset({
        top: sharkY
    });
});
// --- Source and inspiration by Codepen.io 
// --- https://codepen.io/cmrector/pen/zMmgoz
// named function detecting collision betweem two objects returning a boolean value
// the two objects detected for collision are passed as parameters to the function
// variables for storing the X and Y coordinates, height and width for each object
// if statement returning a boolean value determined by whether the sum of top + width and
// left + height with respect to the document of the first object is smaller than the coordinates of the second object
function collision(sharkObject, fishObject) {
    var objectOne = $(sharkObject);
    var objectTwo = $(fishObject);
    var objectOneX = objectOne.offset().left;
    var objectOneW = objectOne.width();
    var objectOneY = objectOne.offset().top;
    var objectOneH = objectOne.height();
    var objectTwoX = objectTwo.offset().left;
    var objectTwoW = objectTwo.width();
    var objectTwoY = objectTwo.offset().top;
    var objectTwoH = objectTwo.height();
    if (objectOneY + objectOneH < objectTwoY || objectTwoY + objectTwoH < objectOneY || objectTwoX + objectTwoW < objectOneX || objectOneX + objectOneW < objectTwoX) {
        return false;
    }
    else {
        return true;
    }
}
// document jQuery object with keydown event with an anonymous function
// jQuery selection with all elements with class attribute fish
// .each() method applies the same code to each element in the selection
// if the collision method returs true, stop all currently running animation on the hit
// object and call fadeOut on it
$(document).on("keydown", function () {
    var shark = $("#sharkId");
    $(".fish").each(function () {
        if (collision(shark, $(this))) {
            $(this).stop(true);
            $(this).hide();
            getBiggerPls();
        }
    })
})

function getBiggerPls() {
    $("#sharkId").css({
        "width": "+=45px"
        , "height": "+=45px"
    })
}
//MARIA END