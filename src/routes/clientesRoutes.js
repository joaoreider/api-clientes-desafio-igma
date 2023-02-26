
import express from "express";
import ClienteController from "../controller/clientesController.js";

const router = express.Router();

router 
    .get("/clientes", ClienteController.listarClientes)
    .get("/clientes/:cpf", ClienteController.listarCliente)
    .post("/clientes", ClienteController.cadastrarCliente)


export default router