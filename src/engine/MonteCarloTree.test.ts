import {MonteCarloTreeSearchParams} from '../types.js';
import MonteCarloTreeSearch from './MonteCarloTree.js';
import ResNet from './ResNet.js';
import Game, {Player, State} from './games/TicTacToe.js';

describe('MonteCarloTreeSearch', () => {
	let game: Game;
	let model: ResNet;
	let params: MonteCarloTreeSearchParams;
	let monteCarloTreeSearch: MonteCarloTreeSearch;

	beforeEach(() => {
		game = new Game();
		model = new ResNet(game, {numResBlocks: 4, numHiddenChannels: 64});
		params = {
			numSearches: 100,
			explorationConstant: 1.0,
		};
		monteCarloTreeSearch = new MonteCarloTreeSearch(game, model, params);
	});

	// Add test cases for MonteCarloNode methods here

	describe('search', () => {
		it('should return an array of action probabilities', () => {
			// Set up a test state
			const testState: State = [
				[Player.None, Player.None, Player.None],
				[Player.None, Player.None, Player.None],
				[Player.None, Player.None, Player.None],
			];

			// Execute the search
			const actionProbabilities: number[] =
				monteCarloTreeSearch.search(testState);

			// Make assertions on the returned action probabilities
			expect(actionProbabilities).toHaveLength(game.getActionSize());
			expect(actionProbabilities.every(probability => probability >= 0)).toBe(
				true,
			);
			expect(
				actionProbabilities.reduce((sum, value) => sum + value, 0),
			).toBeCloseTo(1, 5); // Close to 1 due to rounding errors
		});
	});
});
