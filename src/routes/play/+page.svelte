<script lang="ts">
    import { randomString } from "$lib/random";
	let fillPercentage = 0.2;
	let seed = ''
</script>


<main class="main">
	<h1> Create new game </h1>

	<form method="get" action="play/{seed || randomString()}">
		<label>
			<div> Fill percentage ({fillPercentage.toFixed(2)}) </div>
			<input type='range' min='0' max='1' step="0.01" name='fillPercentage' bind:value={fillPercentage}>
		</label>
		<button> Start new game </button>
	</form>
</main>

<style>
	form {
		display: flex;
		flex-direction: column;
	}

	label {
		display: block;
	}

	button {
		margin-top: 1rem;
		padding: 1rem;
		border-radius: var(--rounded);
		background-color: var(--primary);
	}
</style>