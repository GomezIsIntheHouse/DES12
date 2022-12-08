const carritoModel = require("../models/carrito.model")

const _ = require("lodash")

class CarritoService{
    constructor(){}

    async create(carritoData){
        const newCarrito = new carritoModel(carritoData);
        return await newCarrito.save();
    }

    async getCarrito(carritoUuid) {
        if (_.isNil(carritoUuid)) {
          throw new Error("carrito UUID PARAM MISSING");
        }
        try {
          const carritoData = await carritoModel.findOne({ uuid: carritoUuid });
          if (!carritoData) {
            return {
              success: false,
              data: "carrito not found",
            };
          }
          return {
            success: true,
            data: carritoData,
          };
        } catch (err) {
          throw new Error(err);
        }
    }

    async updateCarrito(carritoUuid, dataToUpdate) {
    if (_.isNil(carritoUuid) || _.isNil(dataToUpdate)) {
        throw new Error("DATA TO UPDATE OR UUID MISSING");
    }
    try {
        const dataUpdated = await carritoModel.updateOne(
        { uuid: carritoUuid },
        { $set: dataToUpdate }
        );
        if (!dataUpdated) {
        return {
            success: false,
            message: "Error updating carrito",
        };
        }
        return {
        success: true,
        message: `The carrito ${carritoUuid} was updated seccessfully`,
        };
    } catch (err) {
        throw new Error(err);
    }
    }
    
    async delete(carritoUuid) {
    if (_.isNil(carritoUuid)) {
        throw new Error("CARRITO UUID MISSING");
    }
    try {
        const deletedCarrito = await carritoModel.deleteOne({ uuid: carritoUuid });
        if (!deletedCarrito) {
        return {
            success: false,
            message: "Error deleting carrito",
        };
        }
        return {
        success: true,
        message: `The carrito ${carritoUuid} was deleted seccessfully`,
        };
    } catch (err) {
        throw new Error(err);
    }
    }
}

module.exports = CarritoService;
/*
   lo exportamos para usar en donde ? definimos rutas y desde alli lo importamos y dependiendo la ruta definida a la que llamamos
  el servicio hara lo que se le pida
  */