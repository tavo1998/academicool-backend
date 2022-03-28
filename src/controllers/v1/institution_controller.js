const { createInstitution, getInstitutions, updateInstiution, deleteInstitution } = require('../../services/institution_service')
const { validationResult } = require('express-validator')

async function getInstitutionsController (req, res) {
  console.log(req.user)
  try {
    const institutions = await getInstitutions()
    return res.status(200).json({ data: institutions })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while processing the request' })
  }
}

async function createInstitutionController (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const createdInstitution = await createInstitution(req.body)
    return res.status(201).json({ data: createdInstitution })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while creating record' })
  }
}

async function updateInstitutionController (req, res) {
  const { id } = req.params

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const updatedInstitution = await updateInstiution(parseInt(id), req.body)
    return res.status(200).json({ data: updatedInstitution })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while updating record' })
  }
}

async function deleteInstitutionController (req, res) {
  const { id } = req.params

  try {
    const deletedInstitution = await deleteInstitution(parseInt(id))
    return res.status(200).json({ data: deletedInstitution })
  } catch (e) {
    return res.status(500).json({ error: 'An error has occurred while deleting record' })
  }
}

module.exports = {
  getInstitutionsController,
  createInstitutionController,
  updateInstitutionController,
  deleteInstitutionController
}
