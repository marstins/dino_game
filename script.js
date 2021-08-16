
function start() {
    const START_SCREEN = document.querySelector('.screen');
    START_SCREEN.classList.add('hidden');

    let points = 0;  
    
    const SCOREBOARD = document.createElement('p');
    SCOREBOARD.classList.add('scoreboard');
    SCOREBOARD.innerHTML = `Score: ${points}`;
    document.body.appendChild(SCOREBOARD);
    
    const BACKGROUND = document.createElement('div');
    BACKGROUND.classList.add('background');
    document.body.appendChild(BACKGROUND);
    
    const DINO = document.createElement('div');
    DINO.classList.add('dino');
    BACKGROUND.appendChild(DINO);
    
    let position = 0;
    let isJumping = false;
    let speed = 10;

    let score = setInterval(() => {
        points += 1;
        SCOREBOARD.innerHTML = `Score: ${points}`;
    },150);
     

    setInterval(() => {
        speed += .5;
    }, 10000);

    function handleKeyDown(event) {
        if(event.keyCode === 32) {
            if(!isJumping) {
                jump();
            }
        }
    }

    function jump() {   
        isJumping = true;
        
        let upInterval = setInterval(() => {
            if(position >= 160) {
                clearInterval(upInterval);

                let downInterval = setInterval(() => {
                    if(position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    } else {
                        position -= 30;
                        DINO.style.bottom = position + 'px';
                    }
                }, 20);
            } else {
                position += 30;
                DINO.style.bottom = position + 'px';
            }
        }, 20);
    }

    function createCactus() {
        const CACTUS = document.createElement('div');
        let cactusPosition = 1500;
        let randomTime = Math.random() * 6000;

        CACTUS.classList.add('cactus');
        CACTUS.style.left = cactusPosition + 'px';
        BACKGROUND.appendChild(CACTUS);

        let leftInterval = setInterval(() => {
            if(cactusPosition <= -60) {
                clearInterval(leftInterval);
                BACKGROUND.removeChild(CACTUS);
            } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
                clearInterval(leftInterval);
                clearInterval(score);
                gameOver(); 
            } else {
                cactusPosition -= speed;
                CACTUS.style.left = cactusPosition + 'px'; 
            }
        }, 20);

        setTimeout(createCactus, randomTime);
    }

    function gameOver() {
        BACKGROUND.remove();
        SCOREBOARD.remove();
        document.body.innerHTML = 
        `<h1>Game Over</h1>
        <p>Your score was: ${points}`;
    }

    createCactus();
    document.addEventListener('keydown', handleKeyDown); 
}


