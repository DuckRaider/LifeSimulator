import { sequelize } from "../sequelize/sequelize";
import { DataTypes } from "sequelize";
import { Bank } from "./Bank";
import { User } from "./User";

export const BankAccount = sequelize.define("BankAccounts", {
    iban:{
        type:DataTypes.STRING,
        allowNull:false
    },
    balance:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    BankId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Bank,
            key:"id"
        }
    }
})

