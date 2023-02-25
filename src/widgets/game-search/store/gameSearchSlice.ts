import { createSlice } from '@reduxjs/toolkit'
import { IGameListItem } from '@/types/rawgList.interface'

interface IinitialState {
	term: IGameListItem[]
}

const initialState: IinitialState = {
	term: []
}

export const gameSearchSlice = createSlice({
	name: 'gameSearch',
	initialState,
	reducers: {
		addToCache: (state, { payload }) => {
			console.log(payload)
			let copy: any = { ...state }

			copy[payload.searchTerm] = payload.results
			return copy
		}
	}
})

export default gameSearchSlice.actions
