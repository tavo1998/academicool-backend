const { updateAssistanceStudents } = require('./../../services/assistance_service')

const updateAssistanceStudentsController = async (req, res) => {
  const { assistanceId } = req.params

  try {
    const assistances = await updateAssistanceStudents(parseInt(assistanceId), req.body)
    return res.status(200).json({ data: assistances })
  } catch (e) {
    return res.status(500).json({ error: 'An error ocurred while updating records' })
  }
}

module.exports = {
  updateAssistanceStudentsController
}
