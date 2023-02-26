import { combineReducers } from '@reduxjs/toolkit'
import { gameSearchSlice } from '@/modules/search/store/gameSearchSlice'

const rootReducer = combineReducers({
	gameSearch: gameSearchSlice.reducer
})

export default rootReducer
