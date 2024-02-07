import { Bank } from "../Models/Bank";

export const getAllBanks = async (req, res) => {
    const banks = await Bank.findAll();

    if(banks) res.status(200).json(banks);
    else{
        console.error('Error fetching banks:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const createBank = async (req, res) => {
    const { name, balance} = req.body;

    const newBank = await Bank.create({
        name,
        balance
    });

    if(newBank) res.status(201).json(newBank);
    else{
        console.error('Error creating bank:', error);
        res.status(500).send('Internal Server Error');
    }
};

export const getBankById = async (req, res) => {
    const users = await Bank.findAll({
        where:{
            id:req.query["id"]
        }
    });

    if(users) res.status(200).json(users);
    else{
        console.error('Error fetching banks:', error);
        res.status(500).send('Internal Server Error');
    }
};