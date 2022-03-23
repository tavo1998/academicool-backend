import { Request, Response } from "express";
import { createInstitution, getInstitutions, updateInstiution, deleteInstitution } from "../../services/institution_service";
import { validationResult } from "express-validator";

async function getInstitutionsController(req: Request, res: Response) {
  try {
    const institutions = await getInstitutions();
    return res.status(200).json({ data: institutions })
  }catch(e) {
    return res.status(500).json({ error: "An error has occurred while processing the request"})
  }
}

async function createInstitutionController(req: Request, res: Response) {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const createdInstitution = await createInstitution(req.body);
    return res.status(201).json({ data: createdInstitution })
  }catch(e) {
    return res.status(500).json({ error: "An error has occurred while creating record"})
  }
}

async function updateInstitutionController(req: Request, res: Response) {
  const { id } = req.params;

  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const updatedInstitution = await updateInstiution(parseInt(id), req.body)
    return res.status(200).json({ data: updatedInstitution })
  }catch(e) {
    return res.status(500).json({ error: "An error has occurred while updating record"})
  }
}

async function deleteInstitutionController(req: Request, res: Response){
  const { id } = req.params;

  try {
    const deletedInstitution = await deleteInstitution(parseInt(id))
    return res.status(200).json({ data: deletedInstitution })
  }catch(e) {
    return res.status(500).json({ error: "An error has occurred while deleting record"})
  }
}

export default {
  getInstitutionsController,
  createInstitutionController,
  updateInstitutionController,
  deleteInstitutionController
}