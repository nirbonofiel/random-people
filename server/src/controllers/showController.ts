import { Request, Response } from "express";
import { ShowService } from "../services/showService";

export class ShowController {
    async handleGetShows(req:Request,res:Response){
        return ShowService.getShows(req,res);
    }
}