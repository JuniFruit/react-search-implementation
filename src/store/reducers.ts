import { gameSearchSlice } from '@/modules/search/store/gameSearchSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
	gameSearch: gameSearchSlice.reducer
})

export default rootReducer
