import { BankAccount } from "../Models/BankAccount"
import { Transaction } from "../Models/Transaction"
import { sequelize } from "../sequelize/sequelize";

export const getAllTransactions = async (req,res) => {
    const transactions = await Transaction.findAll({
        include:[{model:BankAccount, as:"BankAccount"}]
    })

    if(transactions) res.status(200).json(transactions);
    else{
        res.status(500).send('Internal Server Error');
    }
}
export const createTransaction = async (req, res) => {
    const {source,target,amount} = req.body;

    const t1 = transferMoney(source, target, -amount)
    const t2 = transferMoney(target, source, amount)

    if(t1 && t2) res.status(200).json([t1,t2])
    else{
        res.status(500).send('Internal Server Error');
    }
}
const transferMoney = async (source, target, amount) => {
    const BankAccoountObj = await BankAccount.findAll({
        where:{
            iban:source
        }
    });

    const newTransaction = await Transaction.create({
        source:source,
        target:target,
        amount:amount,
        BankAccountId:BankAccoountObj[0].dataValues.id
    })

    if(newTransaction){
        const bankAccountSource = await BankAccount.update(
            {balance:sequelize.literal(`balance + ${amount}`)},
            {where:{iban:source}}
        )

        console.log(bankAccountSource)
        return bankAccountSource
    }
}