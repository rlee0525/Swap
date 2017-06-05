export interface IState {
  id?: number;
  title: string;
  description: string;
  category: string;
  course?: string;
  price: string;
  img_url1?: string;
  img_url2?: string;
  img_url3?: string;
  courses: object[];
  errors?: string[];
  startDate?: any;
  endDate?: any;
  address?: string;
  lat?: number;
  lng?: number;
  focusedInput?: any;
}

export const _defaultState = {
  id: null,
  title: "",
  description: "",
  category: "Course Material",
  course: "",
  price: "",
  img_url1: "",
  img_url2: "",
  img_url3: "",
  startDate: "",
  endDate: "",
  address: "",
  lat: 37.8719,
  lng: -122.2585,
  focusedInput: "startDate",
  courses: null,
  errors: []
}