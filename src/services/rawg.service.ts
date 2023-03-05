import { axiosRequest } from '@/api/axios.setup'
import {
	IGameByIDRes,
	IGameListItem,
	IGameListResponse
} from '@/types/rawgList.interface'

const BASE = 'https://api.rawg.io/api'
const GAMES_LIST = 'games'

export const RawgService = {
	async getGameList(searchTerm = '', page_size = 5, page = 1) {
		const res = await axiosRequest.get<string, IGameListResponse>(
			`${BASE}/${GAMES_LIST}`,
			{
				params: {
					key: process.env.NEXT_PUBLIC_RAWG_KEY,
					search: searchTerm,
					page_size,
					page
				}
			}
		)

		return res
	},
	async getById(id: number): Promise<IGameByIDRes> {
		const res = await axiosRequest.get(`${BASE}/${GAMES_LIST}/${id}`, {
			params: {
				key: process.env.NEXT_PUBLIC_RAWG_KEY
			}
		})
		return res.data
	}
}
