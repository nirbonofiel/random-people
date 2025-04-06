import fs from "fs";
import { People } from "../types/types";

export function readJsonFile(fileName: string, callback: any) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    } catch (error) {
      callback(error, null);
    }
  });
}

export function writeJsonFile(fileName: string, methodType: string ,peopleReq:any, callback: any) {
  fs.readFile(fileName, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      console.error('Error reading file:', err);
      return;
    }
    try {
      let jsonData = JSON.parse(data);
      switch(methodType){
        case 'Create':
          jsonData.push(peopleReq);
          break;
        case 'Delete':
          jsonData = jsonData.filter((people:People)=>people.id !== peopleReq)
          break;
        case 'Update':
          {
            jsonData = jsonData.map((people:People) => {
              if (people.id === peopleReq.id) {
              return {...peopleReq};
            }
            return people;
          });
          break;
        }
      }
      fs.writeFile(fileName, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing file:', err);
          callback(err, null);
          return;
        }
      });
      callback(null, jsonData);
    } catch (error) {
      console.error('Error reading file:', err);
      callback(error, null);
    }
  });
}