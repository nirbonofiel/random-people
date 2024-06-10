import axios from "axios";
import { Request, Response } from "express";
export class ShowService {

    static async getShows(req: Request, res: Response) {
        try {
            const { q } = req.query;
            const API = 'http://api.tvmaze.com/search/shows';
            const respose = await axios.get(API + `?q=${q}`);
            res.json(respose.data);
        } catch (error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}