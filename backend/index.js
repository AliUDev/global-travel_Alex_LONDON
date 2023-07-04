const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/configdb');
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require('cors');

// Import Api
const productsRoute = require('./routes/productsRoute');  
const users = require('./routes/usersRoute');  
const hometopslider = require ('./routes/hometopsliderRoute');
const topDestination = require('./routes/topDestinationRoute')
const exploreSlider =  require('./routes/exploreSliderRoute')
const slider =  require('./routes/sliderRoute')
const trips =  require('./routes/TripRoute')
const testimonial =require('./routes/TestimonialRoute') 
const gallery = require('./routes/galleryRoutes')  
// configure env
dotenv.config();
// connection to Mongo DB
connectDb();  
  
const app = express();
//middleware bodyparser 
app.use(cors({
    origin: '*'
}));
app.use(express.json());
 
app.get('/', (rep,res) =>{
    res.send("<h1>Wellcome to Node Server</h1>");
})

// Use Routes 
app.use('/api/products', productsRoute);
app.use('/api/users', users);
app.use('/api/hometopslider', hometopslider); 
app.use('/api/topdestination', topDestination)  
app.use('/api/exploreslider', exploreSlider) 
app.use('/api/slider', slider)
app.use('/api/trip', trips) 
app.use('/api/testimonial', testimonial)
app.use('/api/gallery', gallery) 
     
app.use(errorHandler);
 
//configuring Server Port  
   
const PORT = process.env.PORT || 5000;    

app.listen(PORT, () => { 
    console.log(` 🚀 Server is runnig on Port ${PORT}`);
})  
  
        