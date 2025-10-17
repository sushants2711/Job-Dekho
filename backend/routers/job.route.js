import express from "express";
import { createJobMiddleware } from "../middlewares/job.middleware.js";
import { addJobController, deleteJobcontroller, getJobByIdController, getJobDataController } from "../controllers/job.controller.js";

const jobRoute = express.Router();

jobRoute.route("/add").post(createJobMiddleware, addJobController);
jobRoute.route("/all").get(getJobDataController);
jobRoute.route("/details/:id").get(getJobByIdController);
jobRoute.route("/delete/:id").delete(deleteJobcontroller);

export default jobRoute;