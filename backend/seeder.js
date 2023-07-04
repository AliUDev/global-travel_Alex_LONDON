const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/ProductModel");
const User = require("./models/UserModel");
const products = require("./data/products");
const users = require("./data/users");
const connectDb = require("./config/configdb");
require('colors');

dotenv.config();
connectDb();

const importData = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        const createUser = await User.insertMany(users)
        const adminUser = createUser[0]._id
        const sampleData = products.map(product => {
            return{...product, user:adminUser}
        })
        await Product.insertMany(sampleData)
        console.log(`data Imported`.bgGreen)
        process.exit()
    } catch (error) {
        console.log(`${error}`.bgRed)
        process.exit(1)
    }
};

const dataDestroy = async () => {
    try {
        await Product.deleteMany()
        await User.deleteMany()
        console.log(`Data Destroy`.bgGreen);
        process.exit()
    } catch (error) {
        console.log(`${error}`.bgRed);
        process.exit(1)
    }
};

if(process.argv[2] === "-d"){
    dataDestroy();
}else{
    importData();
}
