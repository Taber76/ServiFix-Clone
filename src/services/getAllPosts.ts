import { allServices } from "@/lib/data";
import allCities from "@/../public/data/cities.json";
import { type Post } from "@/types/front.types";

const URL = process.env.NODE_ENV === 'production' ? `https://servi-fix-clone.vercel.app/api/service/getall` : 'http://localhost:3000/api/service/getall';

export const getAllPosts = async () => {
    try {
        const res = await fetch(`/api/service/getall`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        const posts: Post[] = data.map((post: Post) => {
            const service = allServices.find(service => service.id === post.service_type_id);
            const city = allCities.find(city => city.id === post.city_id)?.name;
            const { service_type_id, country_id, ...rest } = post;
            return {
                ...rest,
                stars: post.rating,
                category: service ? service.name : null,
                city: city ? city : null
            };
        });
        return posts;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}
