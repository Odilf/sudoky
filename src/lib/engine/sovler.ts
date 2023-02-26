import { shuffler } from "$lib/random";
import { boardState, tile, type Board } from ".";

export function solve(board: Board, seed: string) {
	return solveInternal(board, seed, 0, shuffler(seed));
}

function solveInternal(board: Board, seed: string, index: number, shuffle: (array: number[]) => number[]) {
	const tileValues = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

	if (boardState(board) === 'solved' || index >= 9 * 9 + 1) {
		return true;
	}

	if (boardState(board) === 'invalid') {
		return false;
	}

	const [x, y] = [index % 9, Math.floor(index / 9)];

	for (const tileValue of tileValues) {
		if (board[x][y].value === null) {
			const candidate = tile(tileValue, [x, y]);
			board[x][y] = candidate;
		}

		const solved = solveInternal(board, seed, index + 1, shuffle);

		if (solved) {
			return true;
		}

		board[x][y] = tile(null, [x, y]);
	}

	return false;
}