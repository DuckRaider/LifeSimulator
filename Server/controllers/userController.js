import { Bank } from "../Models/Bank";
import { BankAccount } from "../Models/BankAccount";
import { User } from "../Models/User"

export const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        include:[{model:BankAccount, as:"BankAccounts"}]
    });

    if(users) res.status(200).json(users);
    else{
        res.status(500).send('Internal Server Error');
    }
};

export const getUserById = async (req, res) => {
    const user = await User.findAll({
        where:{
            id:req.query["id"]
        },
        include:[{model:BankAccount, as:"BankAccounts"}]
    });

    if(user) res.status(200).json(user);
    else{
        res.status(500).send('Internal Server Error');
    }
};

export const createUser = async (req, res) => {
    const { username, email, password} = req.body;

    const newUser = await User.create({
        username,
        email,
        password
        /* other fields */
    });

    if(newUser) res.status(201).json(newUser);
    else{
        res.status(500).send('Internal Server Error');
    }
};




// Bank Account Functions -> refactor into new controller reasonable
export const setBankAccountOfUser = async (req, res) => {
    const {bank, user, iban} = req.body;

    const bankAccount = await BankAccount.create({
        iban:iban,
        balance:1000,
        UserId:user.id,
        BankId:bank.id
    })

    console.log(bankAccount)

    if(bankAccount){
        res.status(201).json(bankAccount)
    }
    else{
        res.status(500).send('Internal Server Error');
    }
}
export const getAllBankAccounts = async (req, res) => {
    const users = await BankAccount.findAll({
        include:[{model:Bank, as:"Bank"},{model:User, as:"User"}]
    });

    if(users) res.status(200).json(users);
    else{
        res.status(500).send('Internal Server Error');
    }
};
export const deleteAllBankAccounts = async (req, res) => {
    const msg = await BankAccount.destroy({
        where:{},
        truncate:true
    })

    if(msg) res.status(200).json(msg)
    else{
        res.status(500).send('Internal Server Error');
    }
}
export const getBankAccountById = async (req, res) => {
    const bankAccount = await BankAccount.findAll({
        where:{
            id:req.query["id"]
        },
        include:[{model:Bank, as:"Bank"},{model:User, as:"User"}]
    });

    if(bankAccount) res.status(200).json(bankAccount);
    else{
        res.status(500).send('Internal Server Error');
    }
};