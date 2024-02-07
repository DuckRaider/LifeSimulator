import { User } from "../Models/User"
import { generateAccessToken } from "../utils/jwtGenerator";

// Controller function to create a new user
export const login = async (req, res) => {
    console.log(req.body)
    const { email, password} = req.body;

    const users = await User.findAll();

    if(users){
        let userFound = false;

        for (const user of users){
            console.log(email)
            console.log(password)


            if(user.dataValues.email == email && user.dataValues.password == password){
                const token = generateAccessToken(user.dataValues);
                res.status(201).json(token);
                userFound = true;
                break;
            }
        };

        if(userFound==false){
            res.status(500).send('Internal Server Error');
        }
    }
    else{
        res.status(500).send('Internal Server Error');
    }
};