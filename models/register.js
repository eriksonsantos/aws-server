
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

class Registers {
    constructor(){
        this.dataset = null
    }

    async createDatabase() {
        try {
            this.dataset = await open({
                filename: 'database.db',
                driver: sqlite3.Database
            })
        } catch (error) {
            console.log(error)
        }
    }

    async insertUsers(query) {
        try {
            await this.dataset.run(query)
        } catch (error) {
            console.log(error)
        }

    }

    async createTable(){
        try{
            await this.dataset.run(`CREATE TABLE Users(
                id integer primary key,
                name varchar(255),
                email varchar(255),
                password varchar(255))`)
        }
        catch(error){
            console.log(error)
        }
    }

    async getValues(query){
        try {
            var result = await this.dataset.all(query)
             console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    async getCountRegister(query){
        try {
            var result = await this.dataset.all(query)
             return result
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = { Registers }


