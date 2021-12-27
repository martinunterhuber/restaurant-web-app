export interface Category {
    id: number;
    name: string;
    type: CategoryType;
}

export enum CategoryType {
    food = "food",
    beverage = "beverage",
    special = "special",
}
