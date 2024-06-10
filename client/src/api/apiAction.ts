import axiosInstance from './axiosInstanse';

export const getTvShows = async(path: string) => {
    try{
        const res = await axiosInstance.get(path);
        return res.data
    }catch (error){
        console.error('Error:', error);
    }
}

