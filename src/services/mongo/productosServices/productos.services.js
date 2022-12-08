const productModel = require("../models/product.model")

const _ = require("lodash")

class ProductService{
    constructor(){}

    async create(productData){
        const newProduct = new productModel(productData);
        return await newProduct.save();
    }

    async getCarrito(productUuid) {
        if (_.isNil(productUuid)) {
          throw new Error("product UUID PARAM MISSING");
        }
        try {
          const productData = await productModel.findOne({ uuid: productUuid });
          if (!productData) {
            return {
              success: false,
              data: "product not found",
            };
          }
          return {
            success: true,
            data: productData,
          };
        } catch (err) {
          throw new Error(err);
        }
    }

    async updateCarrito(productUuid, dataToUpdate) {
    if (_.isNil(productUuid) || _.isNil(dataToUpdate)) {
        throw new Error("DATA TO UPDATE OR UUID MISSING");
    }
    try {
        const dataUpdated = await productModel.updateOne(
        { uuid: productUuid },
        { $set: dataToUpdate }
        );
        if (!dataUpdated) {
        return {
            success: false,
            message: "Error updating product",
        };
        }
        return {
        success: true,
        message: `The product ${productUuid} was updated seccessfully`,
        };
    } catch (err) {
        throw new Error(err);
    }
    }
    
    async delete(productUuid) {
    if (_.isNil(productUuid)) {
        throw new Error("USER UUID MISSING");
    }
    try {
        const deletedProduct = await productModel.deleteOne({ uuid: productUuid });
        if (!deletedProduct) {
        return {
            success: false,
            message: "Error deleting product",
        };
        }
        return {
        success: true,
        message: `The product ${productUuid} was deleted seccessfully`,
        };
    } catch (err) {
        throw new Error(err);
    }
    }
}

exports.module = ProductService;