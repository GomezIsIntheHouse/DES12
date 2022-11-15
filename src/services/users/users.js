const fs = require('fs');

class Users {

    constructor(){}

    async createSuperUser(data){
        try {
            const users = await fs.promises.readFile(__dirname + '/users.json');
            const usersObject = JSON.parse(users);
            usersObject.push(data);
            usersObject.push({"super":"true"})
            await fs.promises.writeFile(__dirname + '/users.json', JSON.stringify(productsObject, null, 2));  
            return {
                success: true,
                data
            }
        } catch (error) {
            
        }
        
    }
    async createUser(data){
        try {
            const users = await fs.promises.readFile(__dirname + '/users.json');
            const usersObject = JSON.parse(users);
            usersObject.push(data);
            usersObject.push({"super":"false"})
            await fs.promises.writeFile(__dirname + '/users.json', JSON.stringify(productsObject, null, 2));  
            return {
                success: true,
                data
            }
        } catch (error) {
            
        }
        
    }


}

module.exports = Users;