import { BasketItem } from "./basket-item";

interface Basket {
    id?: number;
    buyerId?: string;
    items: BasketItem[];
    paymentIntentId?: string;
    clientSecret?: string;
}

export type { Basket };
