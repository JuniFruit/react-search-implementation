import { createSlice } from '@reduxjs/toolkit'
import { IGameListItem } from '@/types/rawgList.interface'

interface IinitialState {
	latest: IGameListItem[]
}

const initialState: IinitialState = {
	latest: []
}

export const gameSearchSlice = createSlice({
	name: 'gameSearch',
	initialState,
	reducers: {
		storeResults: (state, { payload }) => {
			return {
				...state,
				latest: payload.results
			}
		}
	}
})

export default gameSearchSlice.actions
