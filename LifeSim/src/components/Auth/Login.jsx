import { useState } from "react"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useUser } from "../../context/UserContext";
import { parseJwt } from "../../services/JwtServices";

export function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { user, setUser } = useUser();


    async function handleLogin(){
        if(email != "" && password != ""){
            const loginModel = {
                email:email,
                password:password
            };
    
            try{
                await axios.post('http://localhost:3000/api/login', loginModel)
                .then((res)=>{
                    setUser(parseJwt(res.data))
                    console.log("Login successful")

                    navigate('/home')
                }).catch((e)=>{
                    console.error(e)
                })
            }catch(e){
                console.error(e);
            }
        }
    }

    return(
        <div>
            <h2>Login</h2>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}