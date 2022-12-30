import { BasketItem } from "./basket-item";

interface Basket {
    id?: number;
    buyerId?: string;
    items: BasketItem[];
}

export type { Basket };
