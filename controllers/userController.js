const User = require('../models/User')
const httpStatus = require('../constants/httpStatus')
const messages = require('../constants/messages')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const getAllUsers = async(req,res)=>{
    try{ 

            const users = await User.find()  
            return res.status(httpStatus.OK).json({
                success:true,
                data:users
            })
    }
    catch(error){

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:messages.Server_error   
        })

    }
}

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }   


        
        const hashedPassword = await bcrypt.hash(password, 10); 
        const newUser = await User.create({ name, email, password: hashedPassword });
        //we can also use .save first create an instance like this ...
                // const user = new User({
                // name: "Afra",
                // email: "afra@gmail.com", 
                // password: "123456"
                // });

                // user.role = "user";   // you can modify before saving

                // await user.save();


        res.status(201).json({ message:'User registered successfully' });
    }
    catch (error) {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:messages.Server_error   
        })
        
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: messages.Invalid_credentials });
        }   


        const isMatch = await bcrypt.compare(password, user.password);
        // password → plain text (from frontend)
        // user.password → hashed (stored in DB)


        if (!isMatch) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: messages.Invalid_credentials });
        }

        const payload = {user:{id: user.id}};
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });   
        res.status(httpStatus.OK).json({ message: messages.Login_successful , token });    
}
 catch (error) {
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:messages.Server_error   
        })
    }}

    const getProfile = async (req, res) => {
        
        try {
           const user = await User.findById(req.user.id).select('-password'); // Exclude password field

            res.status(httpStatus.OK).json({
                success: true,
                user: user,
               
                message: messages.Profile_fetched_successfully
            }); 
        } 
        
        
        catch (error) {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: messages.Server_error
            });

        }
    }
module.exports = {  
    getAllUsers,
    register,
    login,
    getProfile 
}

