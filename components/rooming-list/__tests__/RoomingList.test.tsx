import { render, waitFor } from "@testing-library/react-native";
import { RoomingList, calculateConfigs } from "../RoomingList";

jest.mock("@/hooks", () => ({
    useRooms: jest.fn(() => ({
        rooms: [],
        loading: false,
    })),
}));

it("Renders the component.", async () => {
    const component = render(<RoomingList nbTravelers={0} setSelection={jest.fn()} />);
    await waitFor(() => expect(component.getByTestId("rooming-list")).toBeTruthy());
});

it("Provides correct combination for 3 travelers", () => {
    const combinations = calculateConfigs(3)
    expect(combinations).toContainEqual({S:3})
    expect(combinations).toContainEqual({S:1, D:1})
    expect(combinations).toContainEqual({F:1})
    expect(combinations.length).toBe(3)
});

it("Provides correct combination for 6 travelers", () => {
    const combinations = calculateConfigs(6)
    expect(combinations).toContainEqual({S:6})
    expect(combinations).toContainEqual({Q: 1, S: 2})
    expect(combinations).toContainEqual({Q: 1, D: 1})
    expect(combinations).toContainEqual({F: 2,})
    expect(combinations).toContainEqual({F: 1, D: 1, S: 1})
    expect(combinations).toContainEqual({F: 1, S: 3})
    expect(combinations).toContainEqual({D: 3,})
    expect(combinations).toContainEqual({D: 2, S: 2})
    expect(combinations).toContainEqual({D: 1, S: 4})
    expect(combinations.length).toBe(9)
});

it("Provides correct combination for 1 traveler", () => {
    const combinations = calculateConfigs(1)
    expect(combinations).toContainEqual({S:1})
    expect(combinations.length).toBe(1)
});
