import { CreateBankAccount } from "../Banking/BankAccount/CreateBankAccount";

export function Home(){
    return(
        <div>
            <h2>The Home</h2>
            <CreateBankAccount/>
        </div>
    )
}