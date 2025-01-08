import { View, ScrollView } from "react-native";
import { RoomingList, Selection, SelectTravelers } from "../components";
import { useEffect, useState } from "react";
import { Stack } from "expo-router";

export default function Index() {
    const [nbTravelers, setNbTravelers] = useState(2);
    const [selection, setSelection] = useState<string | undefined>();
    useEffect(() => {
        setSelection(undefined);
    }, [nbTravelers]);
    return (
        <>
            <Stack.Screen options={{ title: "Select rooms" }} />
            <View
                style={{
                    flex: 1,
                    padding: 32,
                }}
            >
                <SelectTravelers nbTravelers={nbTravelers} setNbTravelers={setNbTravelers} />
                <ScrollView>
                    <RoomingList nbTravelers={nbTravelers} selectedId={selection} setSelection={setSelection} />
                    <Selection selection={selection} />
                </ScrollView>
            </View>
        </>
    );
}
