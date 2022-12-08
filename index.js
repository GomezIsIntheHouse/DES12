import dotenv from "dotenv";

dotenv.config();
import  CarritoService from "./src/daos/carrito/config/index.js";
import ProductService from "./src/daos/productos/config/index.js";

ProductService();
CarritoService();