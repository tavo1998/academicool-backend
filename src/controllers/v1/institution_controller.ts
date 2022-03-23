import { Request, Response } from "express";
import { createInstitution, getInstitutions } from "../../services/institution_service";

async function getInstitutionsController(req: Request, res: Response) {
  try {
    const institutions = await getInstitutions();
    return res.status(200).json({ data: institutions })
  }catch(e) {
    return res.status(500).json({ error: "An error has occurred while processing the request"})
  }
}

async function createInstitutionController(req: Request, res: Response) {
  try {
    const institution = await createInstitution(req.body);
    return res.status(201).json({ data: institution })
  }catch(e) {
    return res.status(500).json({ error: "An error has occurred while creating record"})
  }
}

export default {
  getInstitutionsController,
  createInstitutionController
}