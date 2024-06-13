import { type Service } from "@/types/front.types";

export const getAllServices = async (): Promise<Service[] | undefined> => {
    try {
        const res = await fetch(`/api/servicetype/getall`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data: Service[] = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
