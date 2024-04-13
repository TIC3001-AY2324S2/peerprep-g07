const Collab = require('../models/collabModels')

// @desc    Create a room
// @route   POST /api/collab
// @access  Public
const createRoom = async (req, res)=>{
  const { users, questionID } = req.body

  const sortedUsers = users.sort()

  if ( users.length != 2){
    return res.status(400).json({ message: 'Please give exactly 2 users.' })
  }
  
  try{
    const query = await Collab.where({
      users: sortedUsers,
      questionID: questionID
    }).findOne()
    
    if (query) {
      // room with the 2 users + same qn id already exists
      return res.status(201).json({
        _id: query._id,
        users: query.users,
        questionID: query.questionID
      });
    }
    
    const collabRoom = await Collab.create({
      users,
      questionID
    })

    res.status(201).json({
      _id: collabRoom._id,
      users: collabRoom.users,
      questionID: collabRoom.questionID,
    })

  } catch (error){
    res.status(400).json({ message: 'Error Creating New Room.' })
  }
}

module.exports = { createRoom }