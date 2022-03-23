import { Router } from "express";
import { body } from "express-validator";
import institutionController from "./../../controllers/v1/institution_controller";

const router = Router();

router.get("/", institutionController.getInstitutionsController)
router.post(
  "/",
  body("name").isLength({ max: 100 }).notEmpty(),
  body("mision").isLength({ max: 280 }).notEmpty().optional(),
  body("vision").isLength({ max: 280 }).notEmpty().optional(),
  body("address").isLength({ max: 100 }).notEmpty(),
  institutionController.createInstitutionController)

router.put("/:id",
  body("name").isLength({ max: 100 }).notEmpty().optional(),
  body("mision").isLength({ max: 280 }).notEmpty().optional(),
  body("vision").isLength({ max: 280 }).notEmpty().optional(),
  body("address").isLength({ max: 100 }).notEmpty().optional(), 
  institutionController.updateInstitutionController)

router.delete("/:id", institutionController.deleteInstitutionController)
export default router;