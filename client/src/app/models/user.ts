export interface User {
    userId: number;
    name: string;
    role: UserRole[];
    password: string;
}

export enum UserRole {
    Kitchen = "Kitchen",
    Waiter = "Waiter",
    Backoffice = "Backoffice"
}
