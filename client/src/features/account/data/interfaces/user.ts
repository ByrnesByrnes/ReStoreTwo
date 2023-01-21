import { Basket } from "../../../basket/interfaces";

interface User {
    email: string;
    token: string;
    basket?: Basket;
}

export default User;
