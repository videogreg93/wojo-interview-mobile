import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import InputSpinner from "react-native-input-spinner";

export type SelectProps<T extends string | number> = {
    value: T;
    onChange: React.Dispatch<React.SetStateAction<T>>;
    labelText?: string;
};

export function Spinner<T extends string | number>({ onChange, value, labelText }: SelectProps<T>) {
    const [open, setOpen] = useState(false);
    return (
        <>
            {labelText ? <Text style={styles.label}>{labelText}</Text> : null}
            <InputSpinner
                style={styles.spinner}
                max={100}
                min={1}
                step={1}
                colorMax={"#f04048"}
                colorMin={"#40c5f4"}
                value={value}
                onChange={onChange}
                skin="clean"
            />
        </>
    );
}

// TODO reuse label style from 'select' component
const styles = StyleSheet.create({
    label: {
        fontWeight: "500",
        marginBottom: 8,
    },
    dropdown: {
        marginBottom: 16,
    },
    spinner: {
        maxWidth: "30%",
        minWidth: "10%"
    }
});
