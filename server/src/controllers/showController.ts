import express from "express";
import { ShowService } from "../services/showService";

const router = express.Router();

router.get('/',ShowService.getShows);

export default router;