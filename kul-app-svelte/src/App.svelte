<script lang="ts">
  import { writable } from "svelte/store";

  type Appstate = {
    name: string;
    erKul: boolean;
  };

  const initialState: Appstate = {
    name: "Hello",
    erKul: true,
  };

  function useAppstate(initialState: Appstate) {
    const { subscribe, update } = writable(initialState);
    return {
      subscribe,
      settNavn: (name: string) =>
        update((state) => {
          const nyErKul = "øyvind" === name.toLowerCase() ? true : state.erKul;
          return { name, erKul: nyErKul };
        }),
      toggleKul: () => update((state) => ({ ...state, erKul: !state.erKul })),
    };
  }

  let appState = useAppstate(initialState);
</script>

<h1>
  {$appState.name} er {$appState.erKul ? "" : "IKKE"} kul!
</h1>

<label>
  Navn:{" "}
  <input
    value={$appState.name}
    on:input={(event) => appState.settNavn(event.target["value"])}
  />
</label>
<label>
  Er kul?
  <input
    type="checkbox"
    checked={$appState.erKul}
    on:change={() => appState.toggleKul()}
    disabled={$appState.name.toLowerCase() === "øyvind"}
  />
</label>
