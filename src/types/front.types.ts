export interface Post {
  id: number;
  username: string;
  user_id: number;
  title: string;
  description: string;
  category: string;
  service_type_id: number;
  city_id: number;
  city: string;
  country_id: number;
  location: string;
  currency: string;
  hourly_price: number;
  price: string;
  stars: number;
  rating: number;
  num_reviews: number;
  times_hired: number;
  url_image: string;
  isVerified: boolean;
  shown: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostedBy {
  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  description: string;
  photo: string;
  role: string;
  rating: number;
  verified: boolean;
  active: boolean;
}

export interface Reviews {
  id: number;
  by: string;
  title: string;
  comment: string;
  commentarie: string;
  rating: number;
  service_id: number;
  user_id: number;
  url_image: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DetailedPost {
  id: number;
  postedBy: PostedBy;
  description: string;
  category: string;
  service_type_id: number;
  title: string;
  city: string;
  location: string;
  currency: string;
  price: string;
  stars: number;
  reviews: Reviews[];
  url_image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  url_image: string;
  createdAt: Date;
  updatedAt: Date;
}