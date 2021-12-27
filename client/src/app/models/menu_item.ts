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
    A = "Gluten-containing grains",
    B = "Crustaceans",
    C = "Egg",
    D = "Fish",
    E = "Peanut",
    F = "Soy",
    G = "Milk or lactose",
    H = "Nuts",
    L = "Celery",
    M = "Mustard",
    N = "Sesame",
    O = "Sulphites",
    P = "Lupines",
    R = "Molluscs",
}
