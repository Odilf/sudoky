import { shuffler } from "$lib/random";
import { tile, type Board } from ".";
import { solve } from "./sovler";

function generateEmptyBoard(): Board {
	return Array.from({ length: 9 }, (_, y) => (
		Array.from({ length: 9 }, (_, x) => tile(null, [x, y]))
	));
}


function generateFullBoard(seed: string): Board {
	const board = generateEmptyBoard();
	solve(board, seed);
	return board;
}

export function generateBoard(seed: string, fillPercentage: number = 0.2): Board {
	const board = generateFullBoard(seed);

	const length = 9 * 9;
	const indices = shuffler<number>(seed)(Array.from({ length }, (_, i) => i));

	for (let i = 0; i < length * (1 - fillPercentage); i++) {
		const index = indices[i];

		const [x, y] = [index % 9, Math.floor(index / 9)];
		const tile = board[x][y];
		board[x][y] = { ...tile, value: null };
	}

	return board;
}