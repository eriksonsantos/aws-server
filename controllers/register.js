const { json } = require('express')
const { Registers } = require('../models/register')
const { acceptRegisterData } = require('../validators/register')
const { acceptLoginData } = require('../validators/login')
const database = new Registers


exports.register = async (req, res) => {

    const { name, email, password } = req.body
    var result = await database.getCountRegister(`SELECT COUNT(*) as result FROM Users where email = '${email}'`)
    let obj = JSON.parse(JSON.stringify(result))[0]

    if (acceptRegisterData(name, email, password)) {
        if (obj["result"] == 0) {
            database.insertUsers(`INSERT INTO Users(name,email,password) VALUES ("${name}","${email}","${password}")`)
                .then(
                    database.getValues(`SELECT * FROM Users where id > 0 order by id asc`))
                .then(res.json({
                    data: 'User registered'
                }))
                .catch(err => console.log(err))
        }
        else {
            res.status(402).json({
                error: 'Email already registered.Please, put other email'
            })
        }
    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body

    if (acceptLoginData(email, password)) {
        var result = await database.getCountRegister(`SELECT COUNT(*) as result FROM Users 
    where email = '${email}'`)
        let obj = JSON.parse(JSON.stringify(result))[0]
        if (obj["result"] >= 1) {
            var result = await database.getCountRegister(`SELECT COUNT(*) as result FROM Users 
        where email = '${email}' and password = '${password}'`)
            
            let obj = JSON.parse(JSON.stringify(result))[0]

            if (obj["result"] >= 1) {
                res.status(200).json({
                    data: `Login done`
                })

            } else {
                res.status(400).json({
                    error: `Email and password don't match. Attention with your email and password and repeat again`
                })
            }


        } else {
            res.status(400).json({
                error: `User don't registered. Please, create your account`
            })
        }
    }
}

exports.database = database