import express from 'express';
import { ShowController } from '../controllers/showController';

const router = express.Router();
const showController = new ShowController();

router.get('/',showController.handleGetShows);

export default router;