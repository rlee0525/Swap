export interface IStoreState {
  user: IUser | null;
  post: IPost | null;
  searchResult: IPost[];
  dashboard: IDashboard;
  currentQuery: any;
}

export interface IPost {
  active: boolean;
  category_id: number;
  condition: string;
  course_id?: number;
  created_at: string;
  deleted: boolean;
  description: string;
  id: any;
  img_url1: string;
  img_url2?: string;
  img_url3?: string;
  price: number;
  relevance: number;
  title: string;
  updated_at: string;
  user_id: number;
  views: number;
  zipcode: string;
  seller_fb_picture: string;
  seller_name: string;
}

export interface IUser {
  auth: {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
  }
  status: string;
  userFB: {
    email: string;
    id: string;
    link: string;
    name: string;
    picture: {
      data: {
        is_silhouette: boolean;
        url: string;
      }
    }
  }
}

export interface IDashboard {
  bookmarks: {
    fetched: boolean;
    list: IPost [];
  },
  myPosts: {
    fetched: boolean;
    list: IPost [];
  },
  rfps: {
    fetched: boolean;
    list: any[];
  },
  myCourses: {
    fetched: boolean;
    list: any[];
  },
  courses: {
    fetched: boolean;
    list: any[];
  }
}
