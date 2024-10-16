const User = require('../model/apiModel');  //for import model of mongoose schema here


// for register data
const userCreate = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: 'User Created Successfully' })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// for delete data
const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            res.status(404).json({ message: "User not Found" })
        } else {
            res.status(200).json({ message: 'User Deleted Successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
// 

// for update data 
const userPut = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body)
        if (!user) {
            res.status(404).json({ message: 'User not Found' })
        }
        const updateUser = await User.findById(user);
        res.status(200).json({ updateUser, message: 'User update' })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// for all user
const userLogin = async (req, res) => {


    try {
        const user = await User.findByCredentials(req.body.email, req.body.password,req.body.role);
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    }


    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


// for all user data to get 
const userGet = async (req, res) => {
    try {
        const user = await User.find();
        res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// for get on user
const userGetById = async (req, res) => {


    try {
        const { id } = req.params
        const user = await User.findById(id);
        res.status(200).json(user);
    }


    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    userCreate,
    userDelete,
    userGet,
    userLogin,
    userGetById,
    userPut
}

