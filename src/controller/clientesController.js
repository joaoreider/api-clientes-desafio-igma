
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import cpfIsValid from '../utils/utils.js';



class ClienteController{

    
    //  buscar todos os clientes
    static listarClientes = async (req, res) => {
        
        // configurações de paginação
        const { pagina = 1, limite = 10 } = req.query;
        const offset = (Number(pagina) - 1) * Number(limite);
        
        // busca no banco
        try {
            
            const clientes = await prisma.cliente.findMany({
                skip: offset,
                take: Number(limite),
              });
    
            return res.status(200).json(clientes);
        
            
          } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro ao buscar clientes' });
        }


    }

    static listarCliente = async (req, res) => {
        
        const cpfCliente = req.params.cpf.replace(/\D/g, "");;
    
        // busca no banco
        try {
            const cliente = await prisma.cliente.findUnique({
              where: { cpf: cpfCliente },
            });
            if (!cliente) {
              return res.status(404).json({ mensagem: 'Cliente não encontrado' });
            }
            return res.json(cliente);
          } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro ao buscar cliente' });
          }

    }

    static cadastrarCliente = async (req, res) => {
        
        const { name, cpf, dataNascimento } = req.body;

        const cpf_so_numero = cpf.toString().replace(/\D/g, "");
        
        if (!cpfIsValid(cpf_so_numero)){
            return res.status(422).json({ mensagem: 'CPF inválido' });
        }

        try {
            const novoCliente = await prisma.cliente.create({
              data: {
                name: name,
                cpf: cpf_so_numero,
                dataNascimento: new Date(dataNascimento)
              },
            });

            console.log(novoCliente)
            return res.json(novoCliente);
          } catch (error) {
            console.log(error);
            return res.status(500).json({ mensagem: 'Erro ao criar cliente' });
          }

    }
    

}


export default ClienteController