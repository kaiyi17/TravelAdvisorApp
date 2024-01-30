export interface Place {
  name: string;
  price: number;
  rating: number;
  num_reviews: number;
  price_level: string;
  ranking: number;
  open_now_text: string;
  photo?: {
    images: {
      large: {
        url: string;
      };
    };
  };
  dietary_restrictions?: DietaryRestriction[];
  address: string;
  latitude?: number; // 添加纬度属性
  longitude?: number; // 添加经度属性
  location_id?: string;
  website?: string;
  web_url?: string;
}

export interface DietaryRestriction {
  name: string;
}
