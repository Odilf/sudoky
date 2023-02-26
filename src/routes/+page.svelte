<script>
    import { randomString } from "$lib/random";
</script>

<main class='main'>
	<h1> Sudoky </h1>
	<span> Simple sudoku, on Svelte </span>
	
	<div>
		<a href="/play/{randomString()}"> New game </a>
		<a href="/play"> Customize </a>
	</div>
</main>

<style>
	main {
		justify-content: center;
		height: 100vh;
	}

	h1 {
		font-size: 5em;
		font-weight: 700;
		margin-bottom: 1rem;
	}
	
	span {
		font-size: 1.5em;
		font-weight: 100;
		margin-bottom: 1rem;
	}

	a {
		font-size: 1.5em;
	}

	div {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1rem;
	}
</style>