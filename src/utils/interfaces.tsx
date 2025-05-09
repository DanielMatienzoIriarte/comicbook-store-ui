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
}

export interface bookDetailsInterface {
    id: number,
    name: string,
    description: string,
    format: string,
    category: string,
    price: number
}

export interface paginateLinks {
    active: boolean,
    label: string,
    url: string|null,
}

export interface booksResponse {
    current_page: Number,
    data: bookInterface[],
    first_page_url: string,
    from:Number,
    last_page: Number,
    last_page_url: string,
    links: paginateLinks[],
    next_page_url: string|null,
    path: string, 
    per_page: Number,
    prev_page_url: string|null
    to: Number,
    total: Number,
}

export interface categoryInterface {
    id: Number,
    name: string,
    description: string,
}

export interface bookForSearchInterface {
    searchCriteria: string,
}