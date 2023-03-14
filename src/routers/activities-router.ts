import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getDatesActivities, getDatesWithActivities, postChosenActivites } from "@/controllers/activities-controller";

const activitiesRouter = Router();

activitiesRouter
  .all("/*", authenticateToken)
  .get("/", getDatesActivities)
  .get("/:dateId", getDatesWithActivities)
  .post("/:activityId", postChosenActivites);

export { activitiesRouter };
