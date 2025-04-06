export type People = {
    gender: string;
    name:string;
    state: string;
    phoneNumber: string;
    picture:Picture;
    email:string;
    id: string;
    age: Age;
    address: Address;
    country: string;
}

type Picture = {
    large: string,
    thumbnail: string
}

type Age = {
    age: string,
    yearOfBirth: number
}

type Address = {
    street: string,
    city: string,
    state:string
}