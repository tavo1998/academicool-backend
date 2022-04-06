const { updateAssignment, qualifyAssignment } = require('../../services/assignment_service')

const updateAssignmentController = async (req, res) => {
  const { assignmentId } = req.params

  try {
    const assignment = await updateAssignment(parseInt(assignmentId), req.body)
    return res.status(200).json({ data: assignment })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while updating record' })
  }
}

const qualifyAssignmentController = async (req, res) => {
  const { assignmentId } = req.params
  try {
    const assignment = await qualifyAssignment(parseInt(assignmentId), req.body)
    return res.status(201).json({ data: assignment })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while creating records' })
  }
}

module.exports = {
  updateAssignmentController,
  qualifyAssignmentController
}
