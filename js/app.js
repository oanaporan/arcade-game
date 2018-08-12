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
        this.x += this.speed * dt;
          // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        
    }
    // Draw the enemy on screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};
let allEnemies = [];
let enemyLocations = [63, 146, 230].forEach(enemyLocation => {
    const enemy = new Enemy (0, enemyLocation, 140);
    allEnemies.push(enemy);
});

// Player 
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    };
    update(dt) {
        //if player get to the top of the board reinitialize its location
        if (this.y < 0) {
            setTimeout(() => {
            player.x = 202;
            player.y = 404;
        }, 600);
        }

    };
    // Draw the player on screen
    render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
//Initialize the player and it's location on board, x=202, y=404;
const player = new Player(202, 404);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
