export interface Category {
    name: string;
    type: CategoryType;
}

export enum CategoryType {
    food = "food",
    beverage = "beverage",
    special = "special",
}
