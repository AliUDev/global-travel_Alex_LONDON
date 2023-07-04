const bcrypt = require("bcryptjs");
const Users =[
    {name:"admin",email:"admin@admin.com",password: bcrypt.hashSync("12345678",10),isAdmin:true,},
    {name:"hamza",email:"hamza@gmail.com",password: bcrypt.hashSync("12345678",10)},
    {name:"user",email:"user@user.com",password: bcrypt.hashSync("12345678",10)},
]

module.exports = Users;