import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";

import carRoutes from './routes/router.js'





const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));




app.use('/cars/carsData', carRoutes);
app.use('/filter', carRoutes);





const PORT = process.env.PORT || 3365;
app.listen(PORT, () => {
    console.log('Port is running on ', PORT)
})