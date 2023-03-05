export interface IGameListResponse {
	data: {
		count: number
		next: string
		results: IGameListItem[]
	}
}

export interface IPlatform {
	platform: {
		id: number
		name: string
		image_background: string | null
	}
	released_at: string
	requirements_en: string | null
}

export interface IGameListItem {
	id: number
	slug: string
	name: string
	background_image: string
	rating: number
	metacritic: number
	playtime: number
	platforms: IPlatform[]
}
