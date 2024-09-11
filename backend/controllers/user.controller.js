const { User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { BadRequestError, generateAccessToken, generateRefreshToken } = require('../helpers')
const { userSchema } = require('../Schemas')
const { default: mongoose } = require('mongoose')

const createUser = async (req, res) => {
    try {

        const { value, error } = userSchema.userRegisterSchema.validate(req.body)

        if (error) {
            return BadRequestError(error)
        }

        const { name, email, address, phone, password } = value

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ status: 'fail', message: "user already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            address,
            phone,
            password: hashedPassword
        })

        if (!user) {
            return res.status(400).json({ status: 'fail', message: "user cannot create" })
        }

        await user.save()

        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
        }

        res
            .status(201)
            .json({
                status: 'success',
                data: userData,
                message: "user created successfully"
            })

    } catch (error) {
        console.log(error);
        res
            .status(400)
            .json({
                error: error.message,
                message: "Your request cannot be processed. Please try again",
            })
    }
}

const getAllUsers = async (req, res) => {
    try {

        if (!req.user.isAdmin) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to perform this action'
            })
        }

        const users = await User.find()

        res.status(200).json({
            status: 'success',
            data: users,
            message: 'Users retrieved successfully'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during the logout process. Please try again."
        });
    }
}

const getUserById = async (req, res) => {

    try {

        if (req.user.id !== req.params.id) {
            return res.status(403).json({
                status: 'fail',
                message: 'You are not authorized to perform this action'
            })
        }

        const user = await User.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: user,
            message: 'User retrieved successfully'
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during the logout process. Please try again."
        });
    }
}

const login = async (req, res) => {
    try {
        const { value, error } = userSchema.userLoginSchema.validate(req.body);

        if (error) {
            return BadRequestError(res, error);
        }
        const { email, password } = value;
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return res.status(404).json({ status: 'fail', message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, validUser.password);

        if (!validPassword) {
            return res.status(401).json({ status: 'fail', message: "Invalid password" });
        }

        const accessToken = generateAccessToken(validUser);
        const refreshToken = generateRefreshToken(validUser);

        console.log(accessToken, refreshToken);

        const userData = {
            id: validUser._id,
            name: validUser.name,
            email: validUser.email,
            phone: validUser.phone,
            address: validUser.address,
            accessToken,
            refreshToken
        };

        res
            .status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' })
            .cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' }) // Set the access token as a secure HTTP-only cookie
            .json({
                status: 'success',
                data: userData,
                message: "User logged in successfully"
            });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Your request cannot be processed. Please try again"
        });
    }
}

const logout = (req, res) => {
    try {
        // Set the tokens to an empty string and expire them immediately
        res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'Strict' });
        res.cookie('refreshToken', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'Strict' });

        res.status(200).json({ status: 'success', message: "Logged out successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during the logout process. Please try again."
        });
    }
}

const updateUser = async (req, res) => {

    try {

        const { id } = req.params
        const userId = req.user.id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 'fail', message: 'No such user' })
        }

        const { value, error } = userSchema.userUpdateSchema.validate(req.body)

        if (error) {
            return BadRequestError(error)
        }


        if (userId !== id) {
            return res.status(401).json({ status: 'fail', message: 'You are not authorized to update this user' })
        }

        const updateUser = await User.findByIdAndUpdate(id, value, { new: true })

        if (!updateUser) {
            return res.status(404).json({ status: 'fail', message: 'No such user' })
        }

        res.status(200).json({ status: 'success', data: updateUser, message: 'User updated successfully', data: updateUser })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during the logout process. Please try again."
        });
    }
}

const deleteUser = async (req, res) => {

    try {

        const { id } = req.params
        const userId = req.user.id

        if (userId !== id) {
            return res.status(401).json({ status: 'fail', message: 'You are not authorized to delete this user' })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ status: 'fail', message: 'No such user' })
        }

        const deleteUser = await User.findByIdAndDelete(id)

        if (!deleteUser) {
            return res.status(404).json({ status: 'fail', message: 'Failed to delete user' })
        }

        res.status(200).json({ status: 'success', message: 'User deleted successfully' })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred during the logout process. Please try again."
        });
    }

}




module.exports = {
    createUser,
    login,
    logout,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
}
