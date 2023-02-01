import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode, useState, useEffect } from "react";
import { apiService } from "../../api-services";
import { useAppDispatch } from "../../app/store/configure-store";
import { Loader } from "../../ui";
import { setBasket } from "../basket/data/basket-slice";
import { Checkout } from "./";

interface Props {
    children: ReactNode;
}

const stripePromise = loadStripe("pk_test_51MVdPqJ97kqFDFqpwjvIJqlHx4kGcjU2r8j9n4i58FngVF6kfSWGK51LSMaQOO7XGkTpxwlCInQksStrgNu4rsnG004Rb5kv28");

const CheckoutWrapper: React.FC<Props> = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        apiService.Payment.createPaymentIntent()
            .then((basket) => dispatch(setBasket(basket)))
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <Loader message="Loading checkout..." />;

    return (
        <Elements stripe={stripePromise}>
            <Checkout />
        </Elements>
    );
};

export default CheckoutWrapper;