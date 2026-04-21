import React from "react";

export interface LoginFormProps {
  submitHandler: (data: userLoginInterface) => void | Promise<void>;
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: string;
  error?: string;
}

export interface userInterface {
    id: number,
    fullname: string,
    email: string,
    password: string,
};

export interface userLoginInterface {
    email: string,
    password: string,
}

export interface bookInterface {
    id: number,
    name: string,
    description: string,
    author: string,
    price: number,
    slug?: string;
}

export interface bookDetailsInterface {
    id: number,
    name: string,
    description: string,
    author: string,
    format: string,
    category: string,
    quantity: number,
    price: number
}

export interface getLatestBooksInterface {
    status: string,
    books: bookInterface[],
}

export interface paginateLinks {
    active: boolean,
    label: string,
    url: string|null,
}

export interface paginateLinks {
  url: string | null;
  label: string;
  active: boolean;
}

export interface BookResponseInterface {
    current_page: number,
    data: bookInterface[],
    first_page_url: string,
    from:number,
    last_page: number,
    last_page_url: string,
    links: paginateLinks[],
    next_page_url: string|null,
    path: string, 
    per_page: number,
    prev_page_url: string|null
    to: number,
    total: number,
}

export interface categoryInterface {
    id: number,
    name: string,
    description: string,
    slug?: string;
}

export interface getCategoriesResultInterface {
    status: string,
    categories: categoryInterface[],
}

export interface bookForSearchInterface {
    searchCriteria: string,
}

export interface SearchState {
  query: string;
  results: bookInterface[];
  isSearching: boolean;
  error: string | null;
}