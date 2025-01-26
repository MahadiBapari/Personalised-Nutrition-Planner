const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

class UserController{

    static async register(req,res){
        const{email, username, password} = req.body;

        try {
            const existingEmail = await User.findOne({ email })

            if(existingEmail){
                return res.status(400).json({error: 'Email already exists'})

            }

            const existingUsername = await User.findOne({ username });
            if(existingUsername){
                return res.status(400).json({error: 'Username already exists'})
            } 


            const user = await User.create({username, email, password});
            res.status(201).json({message: 'Registration Successful', user})
        
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async login(req, res){

        const { email, password } = req.body;

        try {

            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: 'User not found' });

            const isMatch = await user.matchPassword(password);
            if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '12h',
            });

            res.json({ message: 'Login successful', token });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }

    }

    static async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) return res.status(404).json({ error: 'User not found' });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}

module.exports = UserController;