import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { parseJwt } from "../../services/JwtServices";

export function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    async function handleRegister(){
        if(username != "" && email != "" && password != ""){
            const registerModel = {
                username:username,
                email:email,
                password:password
            };
    
            try{
                await axios.post('http://localhost:3000/api/register', registerModel)
                .then((res)=>{
                    setUser(res.data)
                    console.log("Registration successful")

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
            <h2>Register</h2>
            <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
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
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}