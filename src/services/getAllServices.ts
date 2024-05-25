export interface AllServices {
    id: number;
    name: string;
    description: string;
    url_image: string;
    createdAt: Date;
    updatedAt: Date;
}

const URL = process.env.NODE_ENV === 'production' ? 'https://c18-21-ft-node-react.onrender.com/api/servicetype/getall' : 'http://localhost:3000/api/servicetype/getall';

export const getAllServices = async (): Promise<AllServices[] | undefined> => {
    try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data: AllServices[] = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
