import { axiosRequest } from '@/api/axios.setup'
import { IGameListResponse } from '@/types/rawgList.interface'

const BASE = 'https://api.rawg.io/api'
const GAMES_LIST = 'games'

export const RawgService = {
	async getGameList(searchTerm = '', page_size = 5) {
		const res = await axiosRequest.get<string, IGameListResponse>(
			`${BASE}/${GAMES_LIST}`,
			{
				params: {
					key: process.env.NEXT_PUBLIC_RAWG_KEY,
					search: searchTerm,
					page_size
				}
			}
		)

		return res
	}
}
