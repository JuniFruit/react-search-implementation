import { ChangeEventHandler } from 'react'
import { ISearch } from './Search.interface'

export function useSearch<T>({ transformResponse, onGoTo }: ISearch<T>) {
	const handleInputClick = (value: string) => {
		console.log(value)
	}

	const handleGoTo = () => {
		onGoTo('')
	}
	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		console.log(e.target.value)
	}

	return {
		handlers: {
			handleChange,
			handleGoTo,
			handleInputClick
		}
	}
}
