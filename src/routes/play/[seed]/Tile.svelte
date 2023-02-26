<script lang="ts" context='module'>
	export let selectedTile = writable(null as null | Tile)

	export function deselect() {
		selectedTile.set(null)
	}
</script>

<script lang="ts">
    import { intersects, type Tile } from "$lib/engine";
    import { writable } from "svelte/store";

	export let tile: Tile
	export let startingTile = false
</script>

<button on:click|stopPropagation={() => $selectedTile = tile} class='tile' 
	class:selected={$selectedTile === tile}
	class:intersecting={selectedTile && intersects($selectedTile, tile)}
	class:same-value={$selectedTile?.value && $selectedTile.value === tile.value}
	class:immutable={startingTile}
>
	{tile.value ?? ''} 
</button>

<style>
	.tile {
		margin: 2px;
		padding: 2px;
		font-weight: 200;
		font-size: 2em;

		display: grid;
		place-items: center;
		background-color: var(--primary);
		color: var(--primary-content);

		transition: 100ms ease-in-out;
		aspect-ratio: 1;

		border: var(--accent) 0px solid;
		border-radius: var(--rounded);
	}

	.intersecting {
		background-color: var(--secondary);
		color: var(--secondary-content);
	}

	.same-value {
		border: var(--accent) 3px solid;
	}

	.selected {
		background-color: var(--accent);
	}

	.immutable {
		background-color: var(--disabled);
		color: var(--accent-content);
		/* border: 4px var(--secondary) solid; */
		/* opacity: 0.5; */
	}
</style>

