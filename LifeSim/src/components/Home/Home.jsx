import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { parseJwt } from "../../services/JwtServices";

let jwt = "";

export function Home(){
    const [bankid,setBankid] = useState("");
    const [iban,setIban] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        jwt = localStorage.getItem("jwt");

        if(jwt == null){
            navigate("/login")
        }
    },[])


    async function handleSetBankAccount(){
        if(iban != null && bankid != null){
            try{
                await axios.get('http://localhost:3000/api/bank/id?id='+bankid)
                .then(async (res)=>{
                    // res.data[0].id
                    const bankAccountModel = {
                        bank:res.data[0],
                        user:parseJwt(jwt),
                        iban:iban
                    };

                    console.log(bankAccountModel)

                    await axios.post('http://localhost:3000/api/bankaccount',bankAccountModel)
                    .then((res)=>{
                        console.log(res)
                    })
                }).catch((e)=>{
                    console.error(e)
                })
            }catch(e){
                console.error(e)
            }
        }
    }


    return(
        <div>
            <h2>The Home</h2>
            <h2>Set Bank Account</h2>
            <input
            type="text"
            placeholder="Bank ID"
            value={bankid}
            onChange={(e) => setBankid(e.target.value)}
            />
            <input
            type="text"
            placeholder="IBAN"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            />
            <button onClick={handleSetBankAccount}>Login</button>
        </div>
    )
}