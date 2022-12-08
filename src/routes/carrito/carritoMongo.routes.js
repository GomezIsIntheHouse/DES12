const express = require("express");
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const CarritoService = require('../../services/mongo/carritoServices/carrito.services')
const router = express.Router();

const carritoService = new CarritoService();
