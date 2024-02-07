import { useState } from "react"
import axios from "axios";
import { useUser } from "../../../context/UserContext";

export function MakeTransaction(){
    const [selectedSource, setSelectedSource] = useState("");
    const [target, setTarget] = useState("");
    const [amount, setAmount] = useState(0);
    const { user, setUser } = useUser();

    async function handleSubmit(){
        if(target != null && amount > 0){
            const transactionModel = {
                source:selectedSource,
                target:target,
                amount:amount
            }

            try{
                await axios.post('http://localhost:3000/api/transaction',transactionModel)
                .then((res)=>{
                    console.log(res)
                })
            }catch(e){
                console.error(e)
            }
        }
    }
    function handleSelectChange(event){
        setSelectedSource(event.target.value)
    }

    return(
        <div>
            <h2>Make Transaction</h2>
            {user.BankAccounts &&
                <select onChange={e => handleSelectChange(e)}>
                    <option value="">Select bank account</option>
                    {user.BankAccounts.map((item, index) => (
                    <option key={index} value={item.iban}>
                        {item.iban}
                    </option>
                    ))}
                </select>
            }
            {user==null &&
                <select value="">
                </select>
            }
            <input
            type="text"
            placeholder="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            />
            <input
            type="number"
            min={0}
            placeholder="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}