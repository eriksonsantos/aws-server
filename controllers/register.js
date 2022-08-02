const { Registers } = require('../models/register')
const {acceptData} = require('../validators/register')
const database = new Registers

exports.register = (req, res) => {

    const { name, email, password } = req.body

    if (acceptData(name,email,password)){
    database.insertUsers(`INSERT INTO Users(name,email,password) VALUES ("${name}","${email}","${password}")`)
        .then(
            database.getValues(`SELECT * FROM Users where id > 0 order by id asc`))
        .then(res.json({
            data: 'Data received'
        }))
        .catch(err => console.log(err))
    }
}

exports.database = database