import { generateBoard } from '$lib/engine';
import type { PageLoad } from './$types';

export const load = (async ({ params, url }) => {
    const fillPercentageParam = url.searchParams.get('fillPercentage') ?? '0.2';
    let fillPercentage: number | undefined = parseFloat(fillPercentageParam);
    if (Number.isNaN(fillPercentage)) {
        fillPercentage = undefined;
    }

    const seed = params.seed + fillPercentageParam;
    const board = generateBoard(seed, fillPercentage);

    return {
        board,
        startingTiles: board.flat().filter(tile => tile.value != null)
    };
}) satisfies PageLoad;