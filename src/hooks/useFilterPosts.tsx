import { useStore } from '@/store/serviceStore';
//import { type Posts, posts } from '@/lib/data'
import { type AllPosts } from '@/services/getAllPosts';



const useFilterPosts = () => {
    const { filterConfig, setFilterConfig } = useStore(state => ({
        filterConfig: state.filterConfig,
        setFilterConfig: state.setFilterConfig
    }));

    const filterPosts = (posts: AllPosts[]) => {
        const sortPosts = (posts: AllPosts[]) => {
            if (filterConfig.sort === 'newest') {
                return posts.sort((a, b) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                })
            } else if (filterConfig.sort === 'oldest') {
                return posts.sort((a, b) => {
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                })
            } else if (filterConfig.sort === 'bestrated') {
                return posts.sort((a, b) => {
                    return b.rating - a.rating;
                })
            } else if (filterConfig.sort === 'worstrated') {
                return posts.sort((a, b) => {
                    return a.rating - b.rating;
                })
            }
            return posts
        };
        const sortedPosts = sortPosts(posts)

        return sortedPosts.filter(post => {
            const newCity = post.city_name

            return (
                (filterConfig.priceRange[0] <= Number(post.hourly_price) &&
                    filterConfig.priceRange[1] >= Number(post.hourly_price)) &&
                (filterConfig.category === 'all' || filterConfig.category === post.category.toLowerCase().replaceAll(' ', '-'))
                && (filterConfig.city === 'all' || filterConfig.city === newCity) &&
                (filterConfig.currency === 'all' || filterConfig.currency === post.currency.toLowerCase()) && (
                    filterConfig.verifiedOnly ? post.isVerified : post
                )

            )
        });
    };
    return { filterPosts, filterConfig, setFilterConfig }

}

export default useFilterPosts