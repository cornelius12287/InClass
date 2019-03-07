// imports mysql connection
// 'require' is part of common-js node-module-system
const conn = require('./mysql_connection');

// model JSON object
// each method takes a cb callback function parameter for asynchronous programming
const model = {
    getAll(cb){
        conn.query("SELECT * FROM Spring2019_Persons", (err, data) => {
            cb(err, data);
        })
    },

    get(id, cb){
        conn.query("SELECT * FROM Spring2019_Persons WHERE Id=?", id, (err, data) => {
            cb(err, data[0]);
        });
    },

    add(input, cb){
        if(!input.Password){
            cb(Error('Password Required'));
            return;
        }
        if(input.Password < 8){
            cb(Error('A Longer Password is Required'));
            return;
        }
        conn.query("INSERT INTO Spring2019_Persons (FirstName,LastName,Birthday,Password,created_at) VALUES (?)",
                    [[input.FirstName, input.LastName, input.Birthday, input.Password, new Date()]],
                    (err, data) => {
                        if(err){
                            cb(err);
                            return;
                        }
                        model.get(data.insertId, (err, data) => {
                            cb(err, data);
                        })
                    });
    }
};

// returns above model object
module.exports = model;
