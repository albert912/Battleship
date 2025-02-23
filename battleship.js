class Ship {
    constructor(length) {
      this.length = length;
      this.hitNum = 0;
      this.sunk = false;
    }
  
    hit() {
      this.hitNum ++;
    }
  
    isSunk() {
      if (this.length <= this.hitNum) {
       /* this.sunk = true;*/
       return true;
      }
    }
  }

class Gameboard {


    const rows = 3;
    const columns = 3;
    const gameboard = [];









    constructor() {
}



}
  

module.exports = Ship;













/*class Ship {
    constructor(length, hit, sunk) {
      this.length = length;
      this.hit = hit;
      this.sunk = sunk;
    }



    hit() {
    return ${this.hit} ++ ; 
    }

    isSunk() {

        // A ship is considered sunk if the number of hits are equal to its length.
         if ( ${this.length} == ${this.hit} ) {
           return true;
         }

         return false;
      }

  }
  


  const Battleship = new Ship(5,4, yes);


  console.log(Battleship.isSunk()); 



module.exports = Battleship;*/



















  /*class Gameboard {
    // Constructor method to initialize properties
    constructor(parameter1, parameter2) {
      this.property1 = parameter1;
      this.property2 = parameter2;
    }
  
    // Method within the class
    methodName() {
      console.log("This is a method");
    }
  }
  


  class Player {
    // Constructor method to initialize properties
    constructor(parameter1, parameter2) {
      this.property1 = parameter1;
      this.property2 = parameter2;
    }
  
    // Method within the class
    methodName() {
      console.log("This is a method");
    }
  }*/