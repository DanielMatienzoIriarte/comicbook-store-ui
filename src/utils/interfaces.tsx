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