import { People } from '../types/types';
import axiosInstance from './axiosInstanse';

export const fetchRandomPeoples = async(path: string) => {
    try{
        const res = await axiosInstance.get(path);
        return res.data
    }catch (error){
        console.error('Error:', error);
    }
}

export const fetchHistoryPeoples = async(path: string) => {
    try{
        const res = await axiosInstance.get(path);
        return res.data
    }catch (error){
        console.error('Error:', error);
    }
}

export const savePeople = async(path: string, people: People) =>{
    try{
        await axiosInstance.post(path,people)
    }catch (error){
        console.error('Error:', error);
    }
}

export const removePeople = async(path: string) =>{
    try{
        await axiosInstance.delete(path)
    }catch (error){
        console.error('Error:', error);
    }
}

export const updatePeople = async(path: string, people: People) =>{
    try{
        await axiosInstance.patch(path,people)
    }catch (error){
        console.error('Error:', error);
    }
}
