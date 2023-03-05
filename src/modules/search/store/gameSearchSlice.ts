import { createSlice } from '@reduxjs/toolkit'
import { IGameByIDRes, IGameListItem } from '@/types/rawgList.interface'
import { noDuplicates } from '../utils/general'

export interface IGameSliceState {
	queries: {
		[query: string]: {
			ids: number[]
			next: number | null
		}
	}
	resultsById: {
		[id: string]: IGameListItem
	}
}

interface IGameSearchPayload {
	query: string
	next: number | null
	results: IGameListItem[]
}

interface IUpdatePayload {
	id: number
	item: IGameByIDRes
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

			const idsArr = noDuplicates([
				...(state.queries[query]?.ids || []),
				...payload.results.map(item => item.id)
			])
			// Normalized data
			return {
				queries: {
					...state.queries,
					[query]: {
						ids: idsArr,
						next: payload.next
					}
				},
				resultsById: {
					...state.resultsById,
					...results
				}
			}
		},
		updateItem: (state, action) => {
			const payload: IUpdatePayload = action.payload

			state.resultsById = {
				...state.resultsById,
				[payload.id]: {
					...state.resultsById[payload.id],
					...payload.item
				}
			}
		}
	}
})

export default gameSearchSlice.actions
