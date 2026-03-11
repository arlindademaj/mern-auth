import { Router } from "express";
import {
  deleteSessionHandler,
  getSessionsHandler,
} from "../controllers/session.controller";
import authenticate from "../middleware/authenticate";

const sessionRoutes = Router();

// prefix: /sessions
sessionRoutes.get("/", authenticate, getSessionsHandler);
sessionRoutes.delete("/:id", authenticate, deleteSessionHandler);

export default sessionRoutes;
