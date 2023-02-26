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
	export let invalid = false
</script>

<button on:click|stopPropagation={() => $selectedTile = tile} class='tile' on:mouseenter={() => $selectedTile = tile}
	class:selected={$selectedTile === tile}
	class:intersecting={selectedTile && intersects($selectedTile, tile)}
	class:same-value={$selectedTile?.value && $selectedTile.value === tile.value}
	class:immutable={startingTile}
>	
	<span> {tile.value ?? ''} </span>
	<div class="red-tint" class:show-red-tint={invalid}/>
</button>

<style>
	.tile {
		margin: 2px;
		padding: 2px;
		font-weight: 200;
		font-size: 2em;

		width: 60px;
		height: 60px;

		--outline-size: 3px;
		margin: var(--outline-size);

		display: grid;
		place-items: center;
		background-color: var(--primary);
		color: var(--primary-content);

		transition: 100ms ease-in-out;
		aspect-ratio: 1;

		outline: var(--accent) 0px solid;
		border-radius: var(--rounded);

		position: relative;
	}

	@media (max-width: 900px) {
		.tile {
			font-size: 1em;
			width: 20px;
			height: 20px;
		}
	}


	.intersecting {
		background-color: var(--secondary);
		color: var(--secondary-content);
	}

	.same-value {
		outline: var(--accent) var(--outline-size) solid;
	}

	.selected {
		background-color: var(--accent);
	}

	.immutable {
		background-color: var(--disabled);
		color: var(--accent-content);
	}

	.red-tint {
		position: absolute;
		inset: 0;
		background-color: var(--error);
		color: var(--error-content);
		opacity: 0.0;
		transition: 300ms ease-out;
	}
	
	.show-red-tint {
		opacity: 0.2;
	}
</style>

