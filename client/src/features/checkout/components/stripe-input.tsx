import { InputBaseComponentProps } from "@mui/material";
import React, { forwardRef, useImperativeHandle, useRef } from "react";

interface Props extends InputBaseComponentProps {
}

type Ref = unknown;

const StripeInput = forwardRef<Ref, Props>(({ component: Component, ...props }, ref) => {

    const elementRef = useRef<HTMLInputElement>();

    useImperativeHandle(ref, () => ({
        focus: () => elementRef.current?.focus
    }));

    return (
        <Component
            onReady={(element: HTMLInputElement) => elementRef.current = element}
            {...props}
        />
    );
});

export default StripeInput;