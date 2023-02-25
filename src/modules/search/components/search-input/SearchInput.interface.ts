import { ChangeEvent } from 'react'

export interface ISearchInput {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
	onClick: (value: string) => void
	onSubmit: (value?: string) => void
	isResultsShowing: boolean
}
