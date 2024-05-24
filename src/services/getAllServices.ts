export interface AllServices {
    id: number;
    name: string;
    description: string;
    url_image: string;
    createdAt: Date;
    updatedAt: Date;
}


export const getAllServices = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/servicetype/getall');
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
