document.addEventListener("DOMContentLoaded", () => {
    const GRID = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const SCORE_DISPLAY = document.querySelector("#score");
    const START_BUTTON = document.querySelector("#start-button");
    const WIDTH = 10;
    const L_SHAPE =[
        [1, WIDTH+1, WIDTH*2+1, 2],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2+2],
        [1, WIDTH+1, WIDTH*2+1, WIDTH*2],
        [WIDTH, WIDTH*2, WIDTH*2+1, WIDTH*2+2]
    ];
    const T_SHAPE =[
        [1, WIDTH, WIDTH+1, WIDTH+2],
        [1, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [1, WIDTH, WIDTH+1, WIDTH*2+1]
    ];
    const O_SHAPE = [
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1]
    ];
    const I_SHAPE = [
        [1, WIDTH+1, WIDTH*2+1, WIDTH*3+1],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH+3],
        [1, WIDTH+1, WIDTH*2+1, WIDTH*3+1],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH+3]
    ];
    const Z_SHAPE = [
        [0, WIDTH, WIDTH+1, WIDTH*2+1],
        [WIDTH+1, WIDTH+2, WIDTH*2, WIDTH*2+1],
        [0, WIDTH, WIDTH+1, WIDTH*2+1],
        [WIDTH+1, WIDTH+2, WIDTH*2, WIDTH*2+1]
    ];
    const ALL_SHAPES = [L_SHAPE, T_SHAPE, O_SHAPE, I_SHAPE, Z_SHAPE];

    function getRandomShape(){
       return Math.floor(Math.random()*ALL_SHAPES.length);
    }

    var randomPosition = getRandomShape();
    let currentPosition = 5;
    let currentRotation = 0;
    let currentShape = ALL_SHAPES[randomPosition][currentRotation];

    function draw(cP) {  
        currentShape.forEach(index => {
            squares[cP + index].classList.add("shape");
        });
    }

    function undraw(cP) {  
        currentShape.forEach(index => {
            squares[cP + index].classList.remove("shape");
        });
    }

    let downTimer = setInterval(moveDown, 1000);

    function control(e){
        if(e.keyCode === 37){
            moveLeft();
        } else if (e.keyCode === 39){
            moveRight();
        } else if (e.keyCode === 40){
            moveDown();
        } else if (e.keyCode === 38){
            rotate();
        }
    }
    document.addEventListener('keyup', control);

    draw(currentPosition);
    function moveDown() {  
        undraw(currentPosition);
        currentPosition += WIDTH;
        draw(currentPosition);
        freeze();
    }

    function moveLeft() {
        undraw(currentPosition);
        const isItAtLeftEnd = currentShape.some(index => (currentPosition + index) % WIDTH === 0);
        if(!isItAtLeftEnd){
            currentPosition -= 1;
        }
        if(currentShape.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition += 1;
        }
        draw(currentPosition);
    }

    function moveRight() {
        undraw(currentPosition);
        const isItAtRightEnd = currentShape.some(index => (currentPosition + index) % WIDTH === WIDTH - 1);
        if(!isItAtRightEnd){
            currentPosition += 1;
        }
        if(currentShape.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition -= 1;
        }
        draw(currentPosition);
    }


    function freeze(){
        if(currentShape.some(
            index => squares[currentPosition + index + WIDTH].classList.contains("taken")
        )){
            //freeze the current shape
            currentShape.forEach(index => squares[currentPosition + index].classList.add("taken"));
            //start a new shape
            randomPosition = getRandomShape();
            currentShape = ALL_SHAPES[randomPosition][currentRotation];
            currentPosition = 4;
            draw(currentPosition);

        }
    }
    // draw(currentPosition);
    // console.log(squares);

});