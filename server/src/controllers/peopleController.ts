import express from "express";
import { PeopleService } from "../services/peopleService";

const router = express.Router();

router.get('/',PeopleService.getPeoples);
router.get('/history',PeopleService.getHistoryPeoples);
router.post('/',PeopleService.savePeople);
router.delete('/:id',PeopleService.removePeople);
router.patch('/:id',PeopleService.updatePeople);

export default router;