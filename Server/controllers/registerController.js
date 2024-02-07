import { User } from "../Models/User"
import { generateAccessToken } from "../utils/jwtGenerator";

// Controller function to create a new user
export const register = async (req, res) => {
    const { username, email, password} = req.body;

    const newUser = await User.create({
        username,
        email,
        password
        /* other fields */
    });


    if(newUser){
        const token = generateAccessToken(newUser.dataValues);
        res.status(201).json(token);
    }
    else{
        res.status(500).send('Internal Server Error');
    }
};