// Function to identify the most popular car make
function mostPopularCar(cars) {
    const makeCounter = {};
  
    for (const car of cars) {
      if (!makeCounter[car.make]) {
        makeCounter[car.make] = 1;
      } else {
        makeCounter[car.make]++;
      }
    }
  
    let mostPopular = null;
    let maxCount = 0;
  
    for (const [make, count] of Object.entries(makeCounter)) {
      if (count > maxCount) {
        maxCount = count;
        mostPopular = make;
      }
    }
  
    return mostPopular;
  }

  export default mostPopularCar;