import pluralize from "pluralize";
import { StyleSheet, Text, View } from "react-native";
import { RadioGroup } from "@/ui";
import { useRooms } from "@/hooks";
import { Room } from "@/app/rooming+api";

type Combination = {
    S?: number;
    D?: number;
    F?: number;
    Q?: number;
};
type Config = Combination[][];

function combinationsAreEqual(x: Combination, y: Combination): boolean {
    return (
        x.S === y.S && x.D === y.D && x.F === y.F && x.Q === y.Q
    )
}

// TODO gives incorrect value for 0 travelers, but this is disabled from the UI anyhow.
export function calculateConfigs(nbTravelers: number, currentCombination: Combination = {}): Array<Combination> {
    var array: Array<Combination> = []
    if (nbTravelers == 0) {
        var existsAlready = array.some((v) => {
            combinationsAreEqual(v, currentCombination)
        })
        if (existsAlready == false) {
            array.push(currentCombination)
        }
    }
    if (nbTravelers >= 4) {
        const newCombination = structuredClone(currentCombination)
        newCombination.Q = (newCombination.Q ?? 0) + 1
        array = array.concat(calculateConfigs(nbTravelers - 4, newCombination))
    }
    if (nbTravelers >= 3) {
        const newCombination = structuredClone(currentCombination)
        newCombination.F = (newCombination.F ?? 0) + 1
        array = array.concat(calculateConfigs(nbTravelers - 3, newCombination))
    }
    if (nbTravelers >= 2) {
        const newCombination = structuredClone(currentCombination)
        newCombination.D = (newCombination.D ?? 0) + 1
        array = array.concat(calculateConfigs(nbTravelers - 2, newCombination))
    }
    if (nbTravelers >= 1) {
        const newCombination = structuredClone(currentCombination)
        newCombination.S = (newCombination.S ?? 0) + 1
        array = array.concat(calculateConfigs(nbTravelers - 1, newCombination))
    }


    return array.filter((value, index, array) => {
        return array.findIndex((combination) => {
            return combinationsAreEqual(value, combination)
        }) === index
    });
}

export type RoomingListProps = {
    nbTravelers: number;
    selectedId?: string;
    setSelection: React.Dispatch<React.SetStateAction<string | undefined>>;
};
export const RoomingList: React.FC<RoomingListProps> = ({ nbTravelers, selectedId, setSelection }) => {
    const { rooms, loading } = useRooms();
    if (loading) {
        return <Text>Loading...</Text>;
    }
    if (!rooms) {
        // TODO nbTravelers doesn't seem relevant here.
        return <Text>{`There are no rooms for ${nbTravelers} ${pluralize("traveler", nbTravelers)}`}</Text>;
    }
    console.log(calculateConfigs(nbTravelers))
    const combos =
        calculateConfigs(nbTravelers).map((combination) =>
            Object.entries(combination).reduce<{ count: number; room: Room }[]>((prev, [curr, count]) => {
                const room = rooms?.find((room: Room) => room.sku === curr);
                return room ? [...prev, { count, room }] : prev;
            }, [])
        ) ?? [];

    const items = combos.map((combos) => {
        const combination = combos.reduce((prev, curr) => {
            return `${prev ? `${prev}, ` : ""}${curr.count} ${curr.room.name} ${pluralize("room", curr.count)}`;
        }, "");
        return { id: combination, label: combination, value: combination };
    });

    return (
        <View testID="rooming-list" style={styles.container}>
            <RadioGroup items={items} selectedId={selectedId} onChange={setSelection} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
});
