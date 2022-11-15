const fs = require('fs');


class CarritoService{
    constructor(){}

    async createCarrito(data){
        try {
            console.log(data)
            let dataTo = data;
            dataTo.admin = true;
            const carrito = await fs.promises.readFile(__dirname + '/carrito.json');
            const carritoObject = JSON.parse(carrito);
            carritoObject.push(dataTo);
         
            
            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(carritoObject, null, 2));  
            return {
                success: true,
                data
            }
        } catch (err) {
            console.error(err);

            return {
                success: false,
                message: err.message
            }
        }
    
    }
    async getCarritos(){
        try {
            const carrito = await fs.promises.readFile(__dirname + '/carrito.json');
            return {
                success: true,
                data: JSON.parse(carrito)
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

    async getCarrito(uuid){
     try {
        const carritos = await fs.promises.readFile(__dirname + '/carrito.json')
        const carritosObject = JSON.parse(carritos)
        const carrito = carritosObject.filter(i => i.uuid == uuid)
        
        return {
            success: true,
            data: carrito
        }
     } catch (err) {
        console.error(err);
            return {
                success: false,
                message: err.message
            }
     }
    }   
    
    async updateCarrito(uuid, data){
        try {
            // console.log('data que llega primero',data.name)

            const carritos = await this.getCarritos();
            const newList = await carritos.data.map(i => {
                if(i.uuid == uuid){
                    return {
                        name: data.name,
                        uuid
                    }
                }
                return i;
            });

            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(newList, null, 2)); 
            return {
                success: true,
                data: `Carrito ${uuid} updated successfully`
            }
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }

    }
    


    async addProductsToCart(uuid, data){
        try {
           

            const carritos = await this.getCarritos();

            const newList = await carritos.data.map(i => {
                if(i.uuid == uuid){
                    let productUpdate = [];
                   
                    if(i.product == "" || i.product == undefined){        
                        productUpdate[0] = data;
                    }else{
                        productUpdate = i.product;
                        productUpdate.push(data)
                    }

                    return {
                        name:i.name,
                        product: productUpdate,
                        uuid:i.uuid
                    }
                }
                return i;
            });

            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(newList, null, 2)); 
            return {
                success: true,
                data: `Producto added to cart ${uuid} successfully`
            }
        
        
        } catch (err) {
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }
    }

 

    async deleteProductToCart(uuid, id_product){
        try{
            
            console.log(uuid, id_product)

            const carritos = await this.getCarritos();

            const newList = await carritos.data.map( i => {
                if(i.uuid == uuid){
                 
                    const newProductLIst = i.product.filter(i => i.uuid != id_product);
                       return {
                        name: i.name,
                        product: newProductLIst,
                        uuid: i.uuid,
                    }
                }
                return i;
            });
              
            await fs.promises.writeFile(__dirname + '/carrito.json', JSON.stringify(newList, null, 2)); 
            return {
                success: true,
                data: `Producto added to cart ${uuid} successfully`
            }
        }catch(err){
            console.error(err);
            return {
                success: false,
                message: err.message
            }
        }


    }



}



module.exports = CarritoService