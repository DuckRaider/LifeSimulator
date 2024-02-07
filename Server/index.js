const express = require('express');
const Sequelize = require('sequelize');
const { sequelize } = require('./sequelize/sequelize');
const { CREATE_USER, REGISTER, LOGIN, BANK, BANKACCOUNT, BANK_BY_ID, TRANSACTION } = require('./api');
const { tryCatch } = require('./utils/tryCatchFunction');
const { createUser, getAllUsers, setBankAccountOfUser, getUserById, getAllBankAccounts, deleteAllBankAccounts, getBankAccountById } = require('./controllers/userController');
const { register } = require('./controllers/registerController');
const cors = require("cors");
const { generateAccessToken } = require('./utils/jwtGenerator');
const dotenv = require('dotenv');
const { login } = require('./controllers/loginController');
const { getAllBanks, createBank, getBankById } = require('./controllers/bankController');
const { User } = require('./Models/User');
const { BankAccount } = require('./Models/BankAccount');
const { Bank } = require('./Models/Bank');
const { getAllTransactions, createTransaction } = require('./controllers/transactionController');
const { Transaction } = require('./Models/Transaction');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())
// Connect to the SQLite database

sequelize.sync()
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .then(() => {
    console.log('User table synchronized successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


// For some reason, it doesn't work in the User.js File
User.hasMany(BankAccount, {
  foreignKey: "UserId",
  as: "BankAccounts"
});
Bank.hasMany(BankAccount, {
  foreignKey: "BankId",
  as: "BankAccounts"
})
BankAccount.belongsTo(User,{
  foreignKey: "UserId",
  as: "User"
})
BankAccount.belongsTo(Bank,{
  foreignKey:"BankId",
  as:"Bank"
})
Transaction.belongsTo(BankAccount,{
  foreignKey:"BankAccountId",
  as: "BankAccount"
})
BankAccount.hasMany(Transaction, {
  foreignKey: "BankAccountId",
  as: "Transactions"
})
  




// Define routes or other middleware as needed
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Users
app.get(CREATE_USER, async(req, res) =>{
  await tryCatch(getAllUsers, req, res)
})
app.get(CREATE_USER+"/:id", async(req, res) =>{
  await tryCatch(getUserById, req, res)
})
app.post(CREATE_USER, async(req,res) =>{
  await tryCatch(createUser, req, res)
})

// Auth
app.post(REGISTER, async(req, res)=>{
  await tryCatch(register, req, res)
})
app.post(LOGIN, async(req, res)=>{
  await tryCatch(login, req,res)
})

// Bank
app.post(BANK, async(req, res)=>{
  await tryCatch(createBank, req,res)
})
app.get(BANK, async(req, res)=>{
  await tryCatch(getAllBanks, req,res)
})
app.get(BANK+"/:id", async(req, res)=>{
  await tryCatch(getBankById, req,res)
})

// Bank Account
app.post(BANKACCOUNT, async(req, res)=>{
  await tryCatch(setBankAccountOfUser, req,res)
})
app.get(BANKACCOUNT, async(req, res)=>{
  await tryCatch(getAllBankAccounts, req,res)
})
app.delete(BANKACCOUNT, async(req, res)=>{
  await tryCatch(deleteAllBankAccounts, req,res)
})
app.get(BANKACCOUNT+"/:id", async(req, res)=>{
  await tryCatch(getBankAccountById, req,res)
})

// Transaction
app.get(TRANSACTION, async(req, res)=>{
  await tryCatch(getAllTransactions, req, res)
})
app.post(TRANSACTION, async(req, res)=>{
  await tryCatch(createTransaction, req,res)
})




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});