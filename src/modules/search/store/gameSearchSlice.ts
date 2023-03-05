import { createSlice } from '@reduxjs/toolkit'
import { IGameListItem } from '@/types/rawgList.interface'

export interface IGameSliceState {
	queries: {
		[query: string]: number[]
	}
	resultsById: {
		[id: string]: IGameListItem
	}
}

interface IGameSearchPayload {
	query: string
	results: IGameListItem[]
}

interface IGameSeachAction {
	type: string
	payload: IGameSearchPayload
}

const initialState: IGameSliceState = {
	queries: {},
	resultsById: {}
}

export const gameSearchSlice = createSlice({
	name: 'gameSearch',
	initialState,
	reducers: {
		storeResults: (state, { payload }: IGameSeachAction) => {
			type QueryKey = keyof typeof state.queries
			const query: QueryKey = payload.query

			const results = {}
			payload.results.forEach(item => {
				;(results as any)[item.id] = { ...item }
			})

			// Normalized data
			return {
				queries: {
					...state.queries,
					[query]: [
						...(state.queries[query] || []),
						...payload.results.map(item => item.id)
					]
				},
				resultsById: {
					...state.resultsById,
					...results
				}
			}
		}
	}
})

export default gameSearchSlice.actions
