export { generateBoard } from "./generation";

export type Tile = {
	value: number | null;
	flatCoord: [number, number];
	blockCoord: [number, number];
}

export function tile(value: number | null, [x, y]: [number, number]): Tile {
	return {
		value,
		flatCoord: [x, y],
		blockCoord: [Math.floor(x / 3), Math.floor(y / 3)],
	}
}

export type Board = Tile[][];

export function findTile(board: Board, number: number) {
	const spots: Tile[] = [];

	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (board[i][j].value === number) {
				spots.push(board[i][j]);
			}
		}
	}

	return spots;
}

export type BoardState = 'solved' | 'unsolved' | 'invalid';

export function boardState(board: Board): BoardState {
	// This will be set to `unsolved` if any tile is empty
	let output: BoardState = 'solved';

	const tiles: Tile[][] = Array.from({ length: 9 }, () => []);

	for (const tile of board.flat()) {
		if (tile.value === null) {
			output = 'unsolved';
			continue;
		}
		
		const sameValuedTiles = tiles[tile.value - 1];
		if (sameValuedTiles.some(sameValuedTile => intersects(sameValuedTile, tile))) {
			return 'invalid';
		}

		sameValuedTiles.push(tile)
	}

	return output;
}

export function intersects(a: Tile | null, b: Tile | null) {
	if (a === null || b === null) {
		return false;
	}

	return a.flatCoord[0] === b.flatCoord[0] ||
		a.flatCoord[1] === b.flatCoord[1] ||
		(a.blockCoord[0] === b.blockCoord[0] &&
		a.blockCoord[1] === b.blockCoord[1]);
}

type Block = Tile[][];
type BlockBoard = Block[][];

export function intoBlockBoard(board: Board): BlockBoard {
	const blockBoard: BlockBoard = new Array(3);

	for (let i = 0; i < 3; i++) {
		blockBoard[i] = new Array(3);
		for (let j = 0; j < 3; j++) {
			blockBoard[i][j] = new Array(3);
			for (let k = 0; k < 3; k++) {
				blockBoard[i][j][k] = new Array(3);
				for (let l = 0; l < 3; l++) {
					blockBoard[i][j][k][l] = board[i * 3 + k][j * 3 + l];
				}
			}
		}
	}

	return blockBoard;
}
