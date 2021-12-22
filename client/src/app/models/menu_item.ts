export interface MenuItem {
    itemId: number;
    title: string;
    desc: string;
    price: number;
    category: number[];
    allergens: Allergen[];
    status: string;
}

export enum Allergen {
    A = "Gluten",
    B = "Crustaceans",

}
