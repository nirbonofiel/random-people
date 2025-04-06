import axios from "axios";
import { Request, Response } from "express";
import { People } from "../types/types";
import { readJsonFile, writeJsonFile } from "../helpers/fsFunctions";
export class PeopleService {
  
  static async getPeoples(req: Request, res: Response) {
    try {
      const API = "https://randomuser.me/api/?results=10";
      const respose = await axios.get(API);
      const mappedData: People[] = PeopleService.mapToPeopleList(respose.data);
      res.json(mappedData);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static savePeople(req: Request, res: Response) {
    try {
      const peopleReq = req.body;
      const filePath = "./db/history.json";
      writeJsonFile(
        filePath,
        "Create",
        peopleReq,
        (err: any, jsonData: People[]) => {
          if (err) {
            return res.status(404).json({ error: "Error reading JSON file" });
          }
          return res.status(201).json(jsonData);
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "cannot create post" });
    }
  }

  static removePeople(req: Request, res: Response) {
    try {
      const {id} = req.params;
      const filePath = "./db/history.json";
      writeJsonFile(
        filePath,
        "Delete",
        id,
        (err: any, jsonData: People[]) => {
          if (err) {
            return res.status(404).json({ error: "Error reading JSON file" });
          }
          return res.status(200).json(jsonData);
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "cannot create post" });
    }
  }

  static updatePeople(req: Request, res: Response) {
    try {
      const peopleReq = req.body;
      const filePath = "./db/history.json";
      writeJsonFile(
        filePath,
        "Update",
        peopleReq,
        (err: any, jsonData: People[]) => {
          if (err) {
            return res.status(404).json({ error: "Error reading JSON file" });
          }
          return res.status(200).json(jsonData);
        }
      );
    } catch (error) {
      return res.status(500).json({ error: "cannot create post" });
    }
  }

  static getHistoryPeoples(req: Request, res: Response) {
    try {
      const filePath = "./db/history.json";
      readJsonFile(filePath, (err: any, jsonData: People[]) => {
        if (err) {
          res.status(404).json({ error: "Error reading JSON file" });
        }
        res.json(jsonData);
      });
    } catch (error) {
      return res.status(500).json({ error: "cannot create post" });
    }
  }

  static mapToPeopleList(data: any): People[] {
    return data.results.map(
      (item: any): People => ({
        gender: item.gender,
        name: `${item.name.title} ${item.name.first} ${item.name.last}`,
        state: item.location.country,
        phoneNumber: item.phone,
        picture: {
          large: item.picture.large,
          thumbnail: item.picture.thumbnail,
        },
        email: item.email,
        id: item.login.uuid,
        age: {
          age: item.dob.age,
          yearOfBirth: new Date(item.dob.date).getFullYear(),
        },
        address: {
          street: `${item.location.street.number} ${item.location.street.name}`,
          city: item.location.city,
          state: item.location.state,
        },
        country: item.location.country,
      })
    );
  }
}
