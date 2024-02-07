import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize/sequelize";
import { BankAccount } from "./BankAccount";

export const Transaction = sequelize.define("Transactions",{
    source:{
        type:DataTypes.STRING,
        allowNull:false
    },
    target:{
        type:DataTypes.STRING,
        allowNull:false
    },
    amount:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    BankAccountId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:BankAccount,
            key:"id"
        }
    }
})