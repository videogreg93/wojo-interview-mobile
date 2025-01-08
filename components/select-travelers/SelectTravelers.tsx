import { Dispatch, SetStateAction } from "react";
import { Select, Spinner } from "@/ui";

export type SelectTravelersProps = {
    nbTravelers: number;
    setNbTravelers: Dispatch<SetStateAction<number>>;
};
export const SelectTravelers: React.FC<SelectTravelersProps> = ({ nbTravelers, setNbTravelers }) => {
    return (
        <Spinner
        value={nbTravelers}
        onChange={setNbTravelers}
        labelText="How many travelers?"
        />
    );
};
