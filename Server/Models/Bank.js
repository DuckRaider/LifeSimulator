import { sequelize } from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
import { BankAccount } from "./BankAccount";

export const Bank = sequelize.define("Bank", {
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    balance:{
        type:DataTypes.DOUBLE,
        allowNull:false
    }
})