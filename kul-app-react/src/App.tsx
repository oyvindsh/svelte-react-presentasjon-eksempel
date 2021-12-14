import { useReducer } from "react";

export type Appstate = {
  name: string;
  erKul: boolean;
};

export const initialState: Appstate = {
  name: "Hello",
  erKul: true,
};

export type AppAction =
  | {
      type: "SETT_NAVN";
      payload: string;
    }
  | {
      type: "TOGGLE_KUL";
    };

export function reducer(state: Appstate, action: AppAction): Appstate {
  switch (action.type) {
    case "SETT_NAVN":
      const nyErkul =
        "øyvind" === action.payload.toLowerCase() ? true : state.erKul;
      return {
        ...state,
        name: action.payload,
        erKul: nyErkul,
      };
    case "TOGGLE_KUL":
      return {
        ...state,
        erKul: !state.erKul,
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <h1>
        {state.name} er {state.erKul ? "" : "IKKE"} kul!
      </h1>

      <label>
        Navn:{" "}
        <input
          value={state.name}
          onChange={(event) =>
            dispatch({ type: "SETT_NAVN", payload: event.target.value })
          }
        />
      </label>
      <label>
        Er kul?
        <input
          type="checkbox"
          checked={state.erKul}
          onChange={() => dispatch({ type: "TOGGLE_KUL" })}
          disabled={state.name.toLowerCase() === "øyvind"}
        />
      </label>
    </>
  );
}

export default App;
