import express from 'express';
import cars from '../cars/data.js'
import mostPopularCar from '../function/mostPopularCar.js';





const router = express.Router();

router.get('/', (req, res) => {
    res.send(cars);
})


router.post('/', (req, res) => {
  const car = req.body;
  console.log(car);
  
  const newCar = { ...car};

  cars.push(newCar);

  res.send(`${newCar.make} ${newCar.model} ${newCar.reg_number} ${newCar.color}  has been added to the Database`);
}) 

/* router.get('/reg_Number', (req, res) => {
  const { reg_number } = req.params;

  const foundReg = cars.find((car) => car.reg_number == reg_number)

  res.send(foundReg)
}) */

  router.get('/reg_number', (req, res) => {
    const { reg_number } = req.query;
  
    const foundReg = cars.find((car) => car.reg_number === reg_number);
    console.log(foundReg);
    
  
    if (foundReg) {
      res.json(foundReg);
    } else {
      res.status(404).send({ message: 'Car not found' });
    }
  });
  

  router.delete('/reg_number', (req, res) => {
    const { reg_number } = req.query;
  
    const carIndex = cars.findIndex((car) => car.reg_number === reg_number);
  
    if (carIndex !== -1) {
      const deletedCar = cars.splice(carIndex, 1);
      res.send(`${deletedCar[0].make} ${deletedCar[0].model} ${deletedCar[0].reg_number} ${deletedCar[0].color} has been deleted from the Database`);
    } else {
      res.status(404).send({ message: 'Car not found' });
    }
  });

  // Update a car by reg_number
router.put('/reg_number', (req, res) => {
  const { reg_number } = req.query;
  const updatedCarData = req.body;

  const carIndex = cars.findIndex((car) => car.reg_number === reg_number);

  if (carIndex !== -1) {
      const updatedCar = { ...cars[carIndex], ...updatedCarData };
      cars[carIndex] = updatedCar;
      res.send(`${updatedCar.make} ${updatedCar.model} ${updatedCar.reg_number} ${updatedCar.color} has been updated in the Database`);
  } else {
      res.status(404).send({ message: 'Car not found' });
  }
});


router.get('/mostPopularMake', (req, res) => {
  try {
    const popularCar = mostPopularCar(cars);
    res.json(popularCar); 
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while retrieving the most popular make.' });
  }
});


export default router;