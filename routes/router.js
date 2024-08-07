import express from 'express';
import cars from '../cars/data.js'





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
  



export default router;