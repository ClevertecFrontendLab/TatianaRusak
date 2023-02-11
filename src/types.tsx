export interface IBook {
  id: string;
  image: string[];
  category: string;
  author: string;
  title: string;
  rating: number;
  year: number;
  isBooked: boolean;
  bookedTill: string;
}

export type IBookStore = Record<string, IBook[]>;
