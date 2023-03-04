import { createSlice } from '@reduxjs/toolkit'
import { IGameListItem } from '@/types/rawgList.interface'

export interface IGameSliceState {
	query: {
		resultsIds: number[]
		id: IGameListItem | {}
	}
}

const initialState: IGameSliceState = {
	query: {
		resultsIds: [],
		id: {}
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

export const gameSearchSlice = createSlice({
	name: 'gameSearch',
	initialState,
	reducers: {
		storeResults: (state, { payload }: IGameSeachAction) => {
			const byId = {}
			payload.results.forEach(res => {
				;(byId as any)[res.id.toString()] = { ...res }
			})
			const obj = {
				...((state as any)[payload.query] || {}),
				resultsIds: payload.results.map(item => item.id),
				...byId
			}

			;(state as any)[payload.query] = obj
		}
	}
})

export default gameSearchSlice.actions
