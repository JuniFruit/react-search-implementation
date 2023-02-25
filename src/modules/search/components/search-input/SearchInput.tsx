import Field from '@/ui/field/Field'
import { FC, KeyboardEventHandler, MouseEventHandler } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { ISearchInput } from './SearchInput.interface'
import styles from './SearchInput.module.scss'

const SearchInput: FC<ISearchInput> = ({
	onChange,
	onClick,
	onSubmit,
	isResultsShowing
}) => {
	const handleClick: MouseEventHandler<HTMLInputElement> = e => {
		e.preventDefault()
		onClick((e.target as HTMLInputElement).value)
	}

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
		if (e.code === 'Enter') onSubmit()
	}

	return (
		<div
			className={`${styles.input_container} ${
				isResultsShowing ? styles.border_transformed : ''
			}`}
			tabIndex={0}
		>
			<IoSearchOutline />
			<Field
				type='text'
				role='combobox'
				maxLength={2048}
				aria-haspopup='false'
				aria-autocomplete='both'
				aria-label='Search'
				spellCheck='false'
				onChange={onChange}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			/>
		</div>
	)
}

export default SearchInput
