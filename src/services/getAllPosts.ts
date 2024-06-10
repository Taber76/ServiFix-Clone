import { allServices } from "@/lib/data";
import allCities from "@/../public/data/cities.json";

export interface AllPosts {
    id: number;
    username: string; // changed "by" to "username"
    user_id: number;
    isVerified: boolean;
    service_type_id: string;
    category: string;
    title: string;
    description: string;
    url_image: string;
    hourly_price: string;
    rating: number;
    num_reviews: number;
    //country_id: string;
    //country_name: string;
    city_id: string;
    city_name: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}


const URL = process.env.NODE_ENV === 'production' ? `https://servi-fix-clone.vercel.app/api/service/getall` : 'http://localhost:3000/api/service/getall';

export const getAllPosts = async () => {
    try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        const posts: AllPosts[] = data.map((post: any) => {
            const service = allServices.find(service => service.id === post.service_type_id);
            const city_name = allCities.find(city => city.id === post.city_id)?.name;
            const { service_type_id, country_id, ...rest } = post;
            return {
                ...rest,
                category: service ? service.name : null,
                city_name: city_name ? city_name : null
            };
        });
        return posts;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
