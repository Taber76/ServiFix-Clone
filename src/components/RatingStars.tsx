import { Star } from 'lucide-react'

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;

    const stars = [...Array(filledStars).fill(true), ...Array(emptyStars).fill(false)];

    return (
        <div className='flex items-center font-base'>
            {stars.map((filled, index) => (
                <Star
                    key={index}
                    size={18}
                    className="stroke-1 stroke-zinc-500"
                    fill={filled ? 'gold' : 'gray'}
                />
            ))}
        </div>
    );
}

export default RatingStars;