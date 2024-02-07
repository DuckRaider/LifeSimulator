import { CreateBankAccount } from "../Banking/BankAccount/CreateBankAccount";
import { MakeTransaction } from "../Banking/Transactions/MakeTransaction";

export function Home(){
    return(
        <div>
            <h2>The Home</h2>
            <CreateBankAccount/>
            <MakeTransaction/>
        </div>
    )
}