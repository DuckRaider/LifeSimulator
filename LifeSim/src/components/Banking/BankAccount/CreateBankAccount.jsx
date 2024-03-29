import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import { generateIBan } from "../../../services/IBanGenerator";
import { useUser } from "../../../context/UserContext";
import {parseJwt} from "../../../services/JwtServices"

export function CreateBankAccount(){
    const [bankid,setBankid] = useState("");
    const { user, setUser } = useUser();

    // const [iban,setIban] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(user == null){
            navigate("/login")
        }
    },[])


    async function handleSetBankAccount(){
        if(bankid != null){
            try{
                await axios.get('http://localhost:3000/api/bank/id?id='+bankid)
                .then(async (res)=>{
                    // res.data[0].id
                    const bankAccountModel = {
                        bank:res.data[0],
                        user:parseJwt(user),
                        iban:generateIBan()
                    };

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
            <h2>Set Bank Account</h2>
            <input
            type="text"
            placeholder="Bank ID"
            value={bankid}
            onChange={(e) => setBankid(e.target.value)}
            />
            {/* <input */}
            {/* type="text"
            placeholder="IBAN"
            value={iban}
            onChange={(e) => setIban(e.target.value)} */}
            {/* /> */}
            <button onClick={handleSetBankAccount}>Submit</button>
        </div>
    )
}