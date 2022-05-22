const express = require('express')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')


// @desc    Register a new user 
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please included all fields')
    }

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('Email is already registered')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({name, email, password:hashedPassword})

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })   
    }
    else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })   
    }
    else {
        res.status(400)
        throw new Error('Invalid Login')
    }


})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id:_id,
        name,
        email,
    })

})


// create jwt token
const generateToken = (id) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'10h',
    })
    return token
}

module.exports = {registerUser, loginUser, getMe}