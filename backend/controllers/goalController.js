const Goal = require('../models/goalModel')
const asyncHandler = require('express-async-handler')
const { update } = require('../models/goalModel')

// @desc     Get Goals based on user authentication
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})

// @desc     Create Goal based on user authentication
// @route    POST /api/goals
// @access   Private
const postGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    console.log(goal)
    res.status(200).json(goal)
})


// @desc     Change Goal based on user authentication
// @route    PUT /api/goals
// @access   Private
const putGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (req.user.id !== goal.user.id) {
        res.status(400)
        throw new Error('Invalid authentication')
    }

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
 
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new:true})

    res.status(200).json(updatedGoal)
})

// @desc     Delete Goal based on user authentication
// @route    DELETE /api/goals
// @access   Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if (req.user.id != goal.user.id) {
        res.status(400)
        throw new Error('Invalid authentication')
    }

    if (!goal) {
        res.status(400)
        throw new Error('Goal Not found')
    }

    await Goal.findByIdAndDelete(req.params.id)

    res.status(200).json(goal)

})



module.exports = {getGoals, postGoal, putGoal, deleteGoal}