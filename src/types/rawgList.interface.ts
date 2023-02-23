export interface IGameListResponse {
	count: number
	next: string
	results: IGameListItem[]
}
export interface IGameListItem {
	id: number
	slug: string
	name: string
	background_image: string
	rating: number
}
