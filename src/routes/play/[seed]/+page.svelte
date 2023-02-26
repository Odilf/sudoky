<script lang="ts">
	import { boardState, intoBlockBoard } from "$lib/engine";
	import type { PageData } from './$types';
	import Tile, { deselect as deselectTile, selectedTile } from './Tile.svelte';

	export let data: PageData

	function clamp(min: number, num: number, max: number) {
		return Math.min(Math.max(num, min), max)
	}
    
	function handleKeydown(event: KeyboardEvent) {
		if (!$selectedTile) {
			return;
		}
		
		// Input numbers
		const key = parseInt(event.key)
		if (key >= 1 && key <= 9) {
			$selectedTile.value = key
		} else if (event.key == 'Backspace' || event.key == 'x') {
			$selectedTile.value = null
		} else {
			// Move selected with arrow keys
			let delta = null
			if (event.key == 'ArrowUp') delta = [0, -1]
			if (event.key == 'ArrowDown') delta = [0, 1]
			if (event.key == 'ArrowLeft') delta = [-1, 0]
			if (event.key == 'ArrowRight') delta = [1, 0]

			if (delta != null) {
				const [deltaY, deltaX] = delta
				const [x, y] = [
					clamp(0, $selectedTile.flatCoord[0] + deltaX, 8),
					clamp(0, $selectedTile.flatCoord[1] + deltaY, 8),
				]

				selectedTile.set(data.board[x][y])
			}
		}

		data.board = data.board
	}
</script>

<svelte:window on:keydown={handleKeydown} on:click={deselectTile}/>

<main class:invalid={boardState(data.board) === 'invalid'}>
	{#each intoBlockBoard(data.board) as blockRow}
		{#each blockRow as block}
		<div class='block'>
			{#each block as row}
				{#each row as tile}
					<Tile {tile} startingTile={data.startingTiles.includes(tile)}/>
				{/each}
			{/each}
		</div>
		{/each}
	{/each}
</main>

<style>
	main {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		margin-top: 1rem;
		
		--max-size: 700px;
		max-height: var(--max-size);
		max-width: var(--max-size);
		margin-inline: auto;
	}

	.block {
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		margin: 2px;
	}

	.invalid {
		/* background-color: rgb(28, 17, 99); */
	}
</style>