import { Router } from "express";
import institutionController from "./../../controllers/v1/institution_controller";

const router = Router();

router.get("/", institutionController.getInstitutionsController)
router.post("/", institutionController.createInstitutionController)

export default router;