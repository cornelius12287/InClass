// imports mysql connection
// 'require' is part of common-js node-module-system
const conn = require('./mysql_connection');
const bcrypt = require('bcryptjs');
const SALT_ROUNDS = 8;

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'some long string here';

const axios = require('axios');

// model JSON object
// each method takes a cb callback function parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Spring2019_Persons");
    },

    async get(id){
        const data = await conn.query("SELECT * FROM Spring2019_Persons WHERE Id=?", id);
        if(!data){
            throw Error('User not found');
        }
        return data[0];
    },

    async add(input){
        if(!input.Password){
            throw Error('Password Required');
        }
        if(input.Password.length < 8){
            throw Error('A Longer Password is Required');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO Spring2019_Persons (FirstName,LastName,Birthday,Password,created_at) VALUES (?)",
                    [[input.FirstName, input.LastName, input.Birthday, hashedPassword, new Date()]]
        );
        return await model.get(data.insertId);
    },

    getFromToken(token){
        return jwt.verify(token, JWT_SECRET);
    },

    //REGULAR LOGIN
    async login(email, password){
        const data = await conn.query(`SELECT * FROM Spring2019_Persons P Join
            Spring2019_ContactMethods CM On CM.Person_Id = P.id
            WHERE CM.Value=?`, email);
        if (data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].Password);
        if(x){
            //user contains everything from data
            //plus password property equal to null which replaces the actual password so it is not visible
            const user = {...data[0], Password: null};
            return {user, token: jwt.sign(user, JWT_SECRET)};
        }else{
            throw Error('Wrong Password');
        }
    },

    //FACEBOOK LOGIN
    async facebookLogin(token, fbid){
        const fbme = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        console.log({fbme});
        const data = await conn.query(`SELECT * FROM Spring2019_Persons P Join
            Spring2019_ContactMethods CM On CM.Person_Id = P.id
            WHERE CM.Type='Facebook' AND CM.Value=?`, fbme.data.id);
        if (data.length == 0){
            //insert statement that creates a new user with data from fbme, instead of error below
            throw Error('User Not Found');
        }
        const user = {...data[0], Password: null};
        return {user, token: jwt.sign(user, JWT_SECRET)};
    },

    async changePassword(email, oldPassword, newPassword){
        const data = await conn.query(`SELECT * FROM Spring2019_Persons P Join
            Spring2019_ContactMethods CM On CM.Person_Id = P.id
            WHERE CM.Value=?`, email);
        if(data.length == 0){
            throw Error('User Not Found')
        }
        if(data[0].Password == "" || await bcrypt.compare(oldPassword, data[0].password)){
            const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
            await conn.query(`Update Spring2019_Persons P Set ? WHERE P.id=?`,
                [ {Password: hashedPassword }, data[0].id]);
            return { status: "success", message: "Password Successfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }


};

// returns above model object
module.exports = model;
