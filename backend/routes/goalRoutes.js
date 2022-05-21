const express = require('express')
const router = express.Router()

const {getGoals, postGoal, putGoal, deleteGoal} = require('../controllers/goalController')


router.route('/')
    .get(getGoals)
    .post(postGoal)

router.route('/:id')
    .put(putGoal)
    .delete(deleteGoal)



module.exports = router