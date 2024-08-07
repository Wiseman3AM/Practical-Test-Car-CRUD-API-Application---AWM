import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";


const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));





const PORT = process.env.PORT || 3365;
app.listen(PORT, () => {
    console.log('Port is running on ', PORT)
})