// export type IBookStore = Record<string, IBook[]>;

export interface IHistory {
  id: number;
  userId: number;
}

export interface IBooking {
  id: number;
  order: boolean;
  dateOrder: Date;
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
}

export interface IDelivery {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number;
  recipientFirstName: string;
  recipientLastName: string;
}

export type IBookCard = Pick<
  IBookDetailed,
  'issueYear' | 'rating' | 'title' | 'authors' | 'image' | 'categories' | 'id' | 'booking' | 'delivery' | 'histories'
>;

export interface IUser {
  commentUserId: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface IComment {
  id: number;
  rating: number;
  text: string;
  createdAt: Date;
  user: IUser;
}

export interface IBookDetailed {
  id: number;
  title: string;
  rating: number;
  issueYear: string;
  description: string;
  publish: string;
  pages: string;
  cover: string;
  weight: string;
  format: string;
  ISBN: string;
  producer: string;
  authors: string[];
  image?: string;
  images: string[];
  categories: string[];
  comments: IComment[];
  booking: string;
  delivery: IDelivery;
  histories: IHistory;
}

export interface IBookState {
  allBooks: IBookCard[];
  loading: boolean;
  selectedBookId: null | number;
  error: boolean;
  errorMessage: string;
}
