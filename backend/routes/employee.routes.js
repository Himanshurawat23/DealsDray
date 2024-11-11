import express from "express";
import { singleUpload } from "../middlewares/multer.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { create_employee, delete_employee, edit_employee, fetchallemployee } from "../controller/employee.controller.js";

const router = express.Router()

router.route("/createEmployee").post(isAuthenticated,singleUpload,create_employee)
router.route("/extractEmployee").get(isAuthenticated,fetchallemployee)
router.route("/editProfile/:id").put(isAuthenticated,singleUpload,edit_employee)
router.route("/deleteProfile/:id").delete(isAuthenticated,delete_employee)

export default router