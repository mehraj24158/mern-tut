
const asyncHandler = require('express-async-handler')

// @desc     Get Goals based on user authentication
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({msg: 'get goals'})
})

// @desc     Create Goal based on user authentication
// @route    POST /api/goals
// @access   Private
const postGoal = asyncHandler(async (req, res) => {
    
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    

    res.status(200).json({msg: 'post goals'})

})


// @desc     Change Goal based on user authentication
// @route    PUT /api/goals
// @access   Private
const putGoal = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `Updated ${req.params.id}`})
})

// @desc     Delete Goal based on user authentication
// @route    DELETE /api/goals
// @access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({msg: `Deleted ${req.params.id}`})

})



module.exports = {getGoals, postGoal, putGoal, deleteGoal}