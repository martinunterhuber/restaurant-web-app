export interface MenuItem {
    id: number;
    title: string;
    description: string;
    price: number;
    categories: number[];
    allergens: Allergen[];
    status: string;
}

export enum Allergen {
    A = "Gluten",
    B = "Crustaceans",

}
