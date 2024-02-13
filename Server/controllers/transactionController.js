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

    const t1 = await transferMoney(source, target, -amount)

    console.log(t1)
    if(t1 != null){
        const t2 = await transferMoney(target, source, amount)

        if(t2) res.status(200).json([t1,t2])
        else{
            res.status(500).send('Internal Server Error');
        }
    }else{
        res.status(400).send('Not enough money on account with IBan ' + source);
    }
}
const transferMoney = async (source, target, amount) => {
    const BankAccoountObj = await BankAccount.findAll({
        where:{
            iban:source
        }
    });

    let enoughMoneyOnAccount = true;
    if(amount < 0 && BankAccoountObj[0].dataValues.balance < Math.abs(amount)) enoughMoneyOnAccount = false;

    if(enoughMoneyOnAccount){
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
    }else{
        return null
    }
}