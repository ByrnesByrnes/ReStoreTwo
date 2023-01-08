import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState } from "react";

interface Props {
    options: string[];
    checked?: string[];
    onChange: (options: string[]) => void;
}

const CheckboxButtons: React.FC<Props> = ({ options, checked, onChange }) => {
    const [checkedOptions, setCheckedOptions] = useState<string[]>(checked || []);

    const handleChecked = (value: string) => {
        const currentIndex = checkedOptions.findIndex(option => option === value);

        let newChecked: string[] = [];

        if (currentIndex === -1) {
            newChecked = [...checkedOptions, value];            
        } else {
            newChecked = checkedOptions.filter(option => option !== value);
        }

        setCheckedOptions(newChecked);
        onChange(newChecked);
    };

    return (
        <FormGroup>
            {options.map((option, i) => (
                <FormControlLabel
                    label={option}
                    key={i}
                    control={
                        <Checkbox
                            checked={checkedOptions.indexOf(option) !== -1}
                            onChange={() => handleChecked(option)}
                        />
                    }
                />
            ))}
        </FormGroup>
    );
};

export default CheckboxButtons;