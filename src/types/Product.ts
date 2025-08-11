export type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
};

export type APIProduct = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

export type APIResponse = {
  products: APIProduct[];
  total: number;
  skip: number;
  limit: number;
};
