// imports mysql connection
// 'require' is part of common-js node-module-system
const conn = require('./mysql_connection');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 8;

// model JSON object
// each method takes a cb callback function parameter for asynchronous programming
const model = {
    async getAll(){
        return await conn.query("SELECT * FROM Spring2019_Persons");
    },

    async get(id){
        return await conn.query("SELECT * FROM Spring2019_Persons WHERE Id=?", id);
    },

    async add(input){
        if(!input.Password){
            cb(Error('Password Required'));
            return;
        }
        if(input.Password.length < 8){
            throw Error('A Longer Password is Required');
        }
        const hashedPassword = await bcrypt.hash(input.Password, SALT_ROUNDS)
        const data = await conn.query(
            "INSERT INTO Spring2019_Persons (FirstName,LastName,Birthday,Password,created_at) VALUES (?)",
                    [[input.FirstName, input.LastName, input.Birthday, hashPassword, new Date()]]
        );
        return await model.get(data.insertId);
    },

    async login(email, password){
        const data = await conn.query(`SELECT * FROM Spring2019_Persons P Join
            Spring2019_ContactMethods CM On CM.Person_Id = P.id
            WHERE CM.Value=?`, email);
        if (data.length == 0){
            throw Error('User Not Found');
        }
        const x = await bcrypt.compare(password, data[0].Password);
        if(x){
            return data[0];
        }else{
            throw Error('Wrong Password');
        }
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
            return { status: "success", msg: "Password Successfully Changed" };
        }else{
            throw Error('Wrong Password');
        }
    }


};

// returns above model object
module.exports = model;
