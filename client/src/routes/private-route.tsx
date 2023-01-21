import React, { ComponentType, FC } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAppSelector } from "../app/store/configure-store";
import * as ROUTES from "./constants";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
}

const PrivateRoute: FC<Props> = ({ component: Component, ...rest }) => {
    const { user } = useAppSelector(state => state.account);

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />)
                    : (
                        <Redirect
                            to={{
                                pathname: ROUTES.HOME,
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
};

export default PrivateRoute;