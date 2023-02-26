import { LiHTMLAttributes } from 'react'

export interface ISearchResults {
	searchResults: IResultItem[]
	suggestions?: string[]
	onItemClick: (query: string) => void
	onItemDelete?: (query: string) => void
}

export interface IResultItem {
	value: string
	description?: string
	thumbnail?: string
	resid: number
}

type IResultProps = IResultItem & LiHTMLAttributes<HTMLLIElement>

export interface IResultItemComponent extends IResultProps {
	isFromCache?: boolean
	onDeleteCached?: (query: string) => void
}
