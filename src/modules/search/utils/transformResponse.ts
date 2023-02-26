import { IResultItem } from '@/components/search-results/Results.interface'
import { IGameListItem } from '@/types/rawgList.interface'

export const transformResponse = (res: IGameListItem[]): IResultItem[] => {
	const transformed: IResultItem[] = []

	for (let result of res) {
		transformed.push({
			value: result.name,
			description: result.rating ? `rating: ${result.rating}/5` : 'No rating',
			thumbnail: result.background_image,
			resid: result.id
		})
	}

	return transformed
}
