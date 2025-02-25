const { Ship, Gameboard, Player } = require('./battleship');

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard(10, 10);  
  });

  describe('placeShip', () => {
    test('should place ship horizontally within bounds', () => {
      const ship = new Ship(4);  
      expect(gameboard.placeShip(ship, 5, 5, 'horizontal')).toBe(true);
      expect(gameboard.gameboard[5][5]).toHaveProperty('ship');
      expect(gameboard.gameboard[5][6]).toHaveProperty('ship');
      expect(gameboard.gameboard[5][7]).toHaveProperty('ship');
      expect(gameboard.gameboard[5][8]).toHaveProperty('ship');
    });

    test('should not place ship if out of bounds horizontally', () => {
      const ship = new Ship(4); 
      expect(gameboard.placeShip(ship, 5, 7, 'horizontal')).toBe(false);
    });

    test('should place ship vertically within bounds', () => {
      const ship = new Ship(4);  
      expect(gameboard.placeShip(ship, 5, 5, 'vertical')).toBe(true);
      expect(gameboard.gameboard[5][5]).toHaveProperty('ship');
      expect(gameboard.gameboard[6][5]).toHaveProperty('ship');
      expect(gameboard.gameboard[7][5]).toHaveProperty('ship');
      expect(gameboard.gameboard[8][5]).toHaveProperty('ship');
    });

    test('should not place ship if out of bounds vertically', () => {
      const ship = new Ship(4);  
      expect(gameboard.placeShip(ship, 7, 5, 'vertical')).toBe(false);
    });

    test('should not place ship if space is occupied', () => {
      const ship1 = new Ship(4);  
      gameboard.placeShip(ship1, 5, 5, 'horizontal');
      
      const ship2 = new Ship(3);  
      expect(gameboard.placeShip(ship2, 5, 6, 'vertical')).toBe(false);
    });
  });

  describe('receiveAttack', () => {
    test('should register a hit on the ship', () => {
      const ship = new Ship(4);  
      gameboard.placeShip(ship, 5, 5, 'horizontal');
      gameboard.receiveAttack(5, 5);
      const cell = gameboard.gameboard[5][5];
      expect(cell.ship.hits[cell.partIndex]).toBe(true);  
    });

    test('should register a miss when no ship is present', () => {
      gameboard.receiveAttack(0, 0); 
      expect(gameboard.gameboard[0][0]).toBe('miss');
    });

    test('should not register a hit if already hit', () => {
      const ship = new Ship(4);  
      gameboard.placeShip(ship, 5, 5, 'horizontal');
      gameboard.receiveAttack(5, 5);  
      gameboard.receiveAttack(5, 5);  
      const cell = gameboard.gameboard[5][5];
      expect(cell.ship.hits[cell.partIndex]).toBe(true);  
    });

    test('should register a hit on vertical ship', () => {
      const ship = new Ship(4);  
      gameboard.placeShip(ship, 5, 5, 'vertical');
      gameboard.receiveAttack(5, 5);
      const cell = gameboard.gameboard[5][5];
      expect(cell.ship.hits[cell.partIndex]).toBe(true);  
    });

    test('test if a missed attack is recorded', () => {
      const ship = new Ship(4);  
      gameboard.placeShip(ship, 5, 5, 'horizontal');
      gameboard.receiveAttack(2, 2);
      
      expect(gameboard.missed.some(miss => miss.x === 2 && miss.y === 2)).toBe(true);  
    });

    test('test if the second missed attack at the same coordinate is recorded', () => {
      const ship = new Ship(4);  
      gameboard.placeShip(ship, 5, 5, 'horizontal');
      gameboard.receiveAttack(2, 2); 
      gameboard.receiveAttack(2, 2); 
    
      expect(gameboard.missed.filter(miss => miss.x === 2 && miss.y === 2).length).toBe(1);
    });
  });

  describe('checkIfAllShipsSunk', () => {
    let ship1;
    let ship2;

    beforeEach(() => {
      ship1 = new Ship(3);  
      ship2 = new Ship(2);  

      
      gameboard.placeShip(ship1, 0, 0, 'horizontal');  
      gameboard.placeShip(ship2, 3, 0, 'vertical');    
    });

    test('should return false if any ship is not sunk', () => {
     
      gameboard.receiveAttack(0, 0); 
      gameboard.receiveAttack(3, 0); 

      expect(gameboard.checkIfAllShipsSunk()).toBe(false); 
    });

    test('should return true when all ships are sunk', () => {
     
      gameboard.receiveAttack(0, 0); 
      gameboard.receiveAttack(0, 1); 
      gameboard.receiveAttack(0, 2); 

      gameboard.receiveAttack(3, 0); 
      gameboard.receiveAttack(4, 0); 

      expect(gameboard.checkIfAllShipsSunk()).toBe(true); 
    });

    test('should return false if not all ships are sunk (even if one is)', () => {
    
      gameboard.receiveAttack(0, 0); 
      gameboard.receiveAttack(0, 1); 
      gameboard.receiveAttack(0, 2); 

      
      expect(gameboard.checkIfAllShipsSunk()).toBe(false); 
    });
  });


describe('Player', () => {
  test('should create a player with a gameboard', () => {
    const realPlayer = new Player('real');
    expect(realPlayer.gameboard).toBeInstanceOf(Gameboard);
  });

  test('should set the type to real when the player is real', () => {
    const realPlayer = new Player('real');
    expect(realPlayer.type).toBe('real');
  });

  test('should set the type to computer when the player is computer', () => {
    const computerPlayer = new Player('computer');
    expect(computerPlayer.type).toBe('computer');
  });

  test('should create a computer player with a gameboard', () => {
    const computerPlayer = new Player('computer');
    expect(computerPlayer.gameboard).toBeInstanceOf(Gameboard);
  });
});
});
