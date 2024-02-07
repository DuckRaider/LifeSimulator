import { Bank } from "../Models/Bank";
import { BankAccount } from "../Models/BankAccount";
import { User } from "../Models/User"

export const getAllUsers = async (req, res) => {
    const users = await User.findAll({
        include:[{model:BankAccount, as:"BankAccounts"}]
    });

    if(users) res.status(200).json(users);
    else{
        console.error('Error fetching users:', error);
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
        console.error('Error fetching users:', error);
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
        console.error('Error creating user:', error);
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
        console.error('Error creating bankaccount:', error);
        res.status(500).send('Internal Server Error');
    }
}
export const getAllBankAccounts = async (req, res) => {
    const users = await BankAccount.findAll({
        include:[{model:Bank, as:"Bank"},{model:User, as:"User"}]
    });

    if(users) res.status(200).json(users);
    else{
        console.error('Error fetching users:', error);
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
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
}