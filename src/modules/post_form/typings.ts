export interface IState {
  id?: number;
  title: string;
  description: string;
  category: string;
  condition: string;
  course?: string;
  price: string;
  img_url1?: string;
  img_url2?: string;
  img_url3?: string;
  courses: object[];
  errors?: string[];
}

export const _defaultState = {
  id: null,
  title: "",
  description: "",
  category: "Textbooks",
  condition: "Brand New",
  course: "",
  price: "",
  img_url1: "",
  img_url2: "",
  img_url3: "",
  courses: null,
  errors: []
}