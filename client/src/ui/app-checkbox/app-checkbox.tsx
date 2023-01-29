import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { UseControllerProps, useController } from "react-hook-form";

interface Props extends UseControllerProps {
    label: string;
    disabled: boolean;
}

const AppCheckbox: React.FC<Props> = (props) => {
    const { field } = useController({ ...props, defaultValue: false });

    return (
        <FormControlLabel
            label={props.label}
            control={
                <Checkbox
                    {...field}
                    checked={field.value}
                    color="secondary"
                    disabled={props.disabled}
                />
            }
        />
    );
};

export default AppCheckbox;