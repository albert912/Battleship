export class Ship {
    constructor(length) {
        this.length = length;
        this.hits = new Array(length).fill(false);  
        this.sunk = false;
    }

    hit(index) {
        if (!this.hits[index]) {
            this.hits[index] = true;
        }
    }

    isSunk() {
        return this.hits.every(part => part === true); 
    }
}

export class Gameboard {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.gameboard = Array.from({ length: rows }, () => Array(cols).fill(null));
        this.missed = [];
        this.ships = [];
    }

    placeShip(ship, x, y, direction) {
        if (direction === "horizontal") {
            if (y + ship.length > this.cols) return false;

            for (let i = 0; i < ship.length; i++) {
                if (this.gameboard[x][y + i] !== null) return false;
            }

            for (let i = 0; i < ship.length; i++) {
                this.gameboard[x][y + i] = { ship: ship, partIndex: i };
            }
        } else if (direction === "vertical") {
            if (x + ship.length > this.rows) return false;

            for (let i = 0; i < ship.length; i++) {
                if (this.gameboard[x + i][y] !== null) return false;
            }

            for (let i = 0; i < ship.length; i++) {
                this.gameboard[x + i][y] = { ship: ship, partIndex: i };
            }
        }

        this.ships.push(ship);
        return true; 
    }

    receiveAttack(x, y) {
        const cell = this.gameboard[x][y];

        if (cell !== null && cell !== "miss") {
            const { ship, partIndex } = cell;

            if (ship.hits[partIndex]) {
               
            }

            ship.hit(partIndex);

            if (ship.isSunk()) {
                console.log('The ship is sunk!');
            }
        } else if (cell === null) {
            if (this.missed.some(miss => miss.x === x && miss.y === y)) {
                return; 
            }

            this.gameboard[x][y] = "miss";  
            this.missed.push({ x, y }); 
        }
    }

    checkIfAllShipsSunk() {
        const allSunk = this.ships.every(ship => ship.isSunk()); 

        if (allSunk) {
            console.log("All ships are sunk!");
        }

        return allSunk;
    }
}




export class Player {
    constructor(type) {
      this.type = type;  
      this.gameboard = new Gameboard(10, 10);  
    }
  
}  



const place = new Gameboard(10, 10);

place.placeShip(new Ship(5), 5, 5, "vertical");

module.exports = {
    Ship,
    Gameboard,
    Player
};
