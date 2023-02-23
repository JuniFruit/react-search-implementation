import { IResultItem } from '@/components/search-results/Results.interface'
import { IGameListResponse } from '@/types/rawgList.interface'

export const transformResponse = (data: IGameListResponse): IResultItem[] => {
	const transformed: IResultItem[] = []

	for (let result of data.results) {
		transformed.push({
			value: result.name,
			description: result.rating.toString(),
			thumbnail: result.background_image
		})
	}

	return transformed
}
