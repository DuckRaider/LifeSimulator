import { useEffect, useState } from "react"
import axios from "axios";
import { useUser } from "../../../context/UserContext";
import { parseJwt } from "../../../services/JwtServices";

export function MakeTransaction(){
    const [selectedSource, setSelectedSource] = useState("");
    const [target, setTarget] = useState("");
    const [amount, setAmount] = useState(0);
    const { user, setUser } = useUser();
    const [bankAccounts, setBankAccounts] = useState([])

    useEffect(()=>{

        const fetchData = async() =>{
            // Get user by user id
            if(user){
                const userId = parseJwt(user).id;
                await axios.get('http://localhost:3000/api/users/id?id='+userId)
                .then((res)=>{
                    setBankAccounts([...res.data[0].BankAccounts])
                }).catch((e)=>{
                    console.error(e)
                })
            }
        }

        fetchData()
    },[])

    async function handleSubmit(){
        console.log(bankAccounts)
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
            {bankAccounts &&
                <select onChange={e => handleSelectChange(e)}>
                    <option value="">Select bank account</option>
                    {bankAccounts.map((item, index) => (
                    <option key={index} value={item.iban}>
                        {item.iban}
                    </option>
                    ))}
                </select>
            }
            {bankAccounts==null &&
                <select>
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