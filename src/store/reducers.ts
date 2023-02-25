import { combineReducers } from '@reduxjs/toolkit'
import { gameSearchSlice } from '@/widgets/game-search/store/gameSearchSlice'

const rootReducer = combineReducers({
	gameSearch: gameSearchSlice.reducer
})

export default rootReducer
