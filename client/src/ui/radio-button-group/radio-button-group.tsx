import { FormControl, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import React from "react";

interface Props {
    options: any[];
    onChange: (event: any) => void;
    selected: string;
}

const RadioButtonGroup: React.FC<Props> = ({ options, onChange, selected }) => {
    return (
        <FormControl>
            <RadioGroup onChange={onChange} value={selected}>
                {options.map(({ value, label }, i) => (<FormControlLabel key={i} value={value} control={<Radio />} label={label} />))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;