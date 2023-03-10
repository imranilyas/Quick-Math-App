import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		difficulty: "easy",
		darkMode: false,
		rounds: 10,
		roundProgress: 1,
		expressions: [],
	},
	reducers: {
		incrementRound: (state) => {
			state.roundProgress += 1;
		},

		resetRound: (state) => {
			state.roundProgress = 1;
			state.expressions = [];
		},

		setRounds: (state, action) => {
			state.rounds = action.payload;
		},

		appearance: (state, action) => {
			state.darkMode = action.payload;
		},

		setDifficulty: (state, action) => {
			state.difficulty = action.payload;
		},
		addExpression: (state, action) => {
			state.expressions.push(action.payload);
		},
	},
});

export const incrementRound = settingsSlice.actions.incrementRound;
export const resetRound = settingsSlice.actions.resetRound;
export const setRounds = settingsSlice.actions.setRounds;
export const appearance = settingsSlice.actions.appearance;
export const setDifficulty = settingsSlice.actions.setDifficulty;
export const addExpression = settingsSlice.actions.addExpression;

export default settingsSlice.reducer;
