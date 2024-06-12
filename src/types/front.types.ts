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

export interface DetailedPost {
  id: number;
  postedBy: PostedBy;
  category: string;
  service_type_id: number;
  title: string;
  description: string;
  url_image: string;
  price: number;
  currency: string;
  location: string;
  stars: number;
  city: string;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PostedBy {
  id: number;
  username: string;
  password: null;
  name: string;
  surname: string;
  email: string;
  photo: string;
  phone: null;
  description: null;
  personal_id: null;
  rating: null;
  role: string;
  key: null;
  password_reset_key: null;
  verified: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: number;
  rating: number;
  title: null;
  comment: string;
  active: boolean;
  by: string;
  user_id: number;
  service_id: number;
  service_title: string;
  createdAt: Date;
  updatedAt: Date;
  commentarie: string;
  url_image: null;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  url_image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat {
  chat_id: number;
  user_id: number;
  user_image: string;
  username: string;
  service_id: number;
  service_image: string;
  service_title: string;
  last_message: string;
  createdAt: Date;
  updatedAt: Date;
}