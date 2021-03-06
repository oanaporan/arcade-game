'use strict';
// Enemies the player must avoid
class Enemy { 
    constructor (x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for the enemies, this uses a helper provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        //Multiplies the enemy speed with the dt parameter which ensures the game runs at the same speed for all computers.
        this.x += this.speed * dt;
        //Once the enemies dissapear off board, reappear with random speed each. 
        if (this.x > 505) {
            this.x = -50;
            this.speed = 120 + Math.floor(Math.random()* 200);
        }
        //Check for collision with player.
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            player.x = 202;
            player.y = 404;
            lifes--;
        };
    };

    // Draw the enemy on screen
        render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

//Initialize an empty array for all enemies on board.
let allEnemies = [];
let enemyLocations = [63, 146, 230].forEach(enemyLocation => {
    const enemy = new Enemy (0, enemyLocation, 160);
    allEnemies.push(enemy);
});

// Player 
class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    };
    update(dt) {
        //Increse lifes if player gets to the top of the board (river)
        if (this.y < 0) {
            let a = this.y - 83;
            this.y = a > 0 ? a : 0;
            lifes ++;
        //And reinitialize its location
         setTimeout(() => {
            player.x = 202;
            player.y = 404; 
        }, 500);
    }
        
    };
    // Draw the player on screen
    render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            ctx.font = "30px Handlee";
            ctx.fillText(`Lifes: ${lifes}`, 10, 40);

    }
    //Allows the player to move across the board using the keysAllowed variable
    //and enables the player to move off board
    handleInput(keyPress) {
        if (keyPress == 'left' && this.x > 0) {
           this.x -= 101;
       };
       if (keyPress == 'right' && this.x < 404) {
            this.x += 101;
        };
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
        };
        if (keyPress == 'down' && this.y < 404) {
            this.y += 83;
        }; 
    }
};



//Initialize the player and it's location on board.
const player = new Player(202, 404);
let lifes = 3;


// This listens for key presses and sends the keys to Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
