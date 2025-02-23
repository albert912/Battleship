const Ship = require('./battleship');





beforeEach(() => {
    myShip = new Ship(5);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
  });
  


test('Ship length is 5', () => {
  expect(myShip.length).toBe(5);  
});


test('Hit number is 5', () => {
  
    expect(myShip.hitNum).toBe(5);  
  });

  test('Ship is sunk', () => {
  
    expect(myShip.isSunk).toBeTruthy();
  });
  
  

  

