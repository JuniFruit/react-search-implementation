import { IResultItem } from '@/modules/search/components/search-results/Results.interface'
import { IGameListResponse } from '@/types/rawgList.interface'

export const transformResponse = (res: IGameListResponse): IResultItem[] => {
	const transformed: IResultItem[] = []

	for (let result of res.data.results) {
		transformed.push({
			value: result.name,
			description: result.rating.toString(),
			thumbnail: result.background_image,
			id: result.id
		})
	}

	return transformed
}
