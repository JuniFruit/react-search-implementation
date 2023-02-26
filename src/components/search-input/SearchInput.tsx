import Field from '@/ui/field/Field'
import { forwardRef, KeyboardEventHandler, MouseEventHandler } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { ISearchInput } from './SearchInput.interface'
import styles from './SearchInput.module.scss'

const SearchInput = forwardRef<HTMLInputElement, ISearchInput>(
	({ onChange, onClick, onSubmit, isResultsShowing, searchString }, ref) => {
		const handleClick: MouseEventHandler<HTMLInputElement> = e => {
			e.preventDefault()
			onClick((e.target as HTMLInputElement).value)
		}

		const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = e => {
			if (e.code === 'Enter') onSubmit((e.target as HTMLInputElement).value)
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
					ref={ref}
					value={searchString}
					type='text'
					role='combobox'
					maxLength={2048}
					aria-haspopup='true'
					aria-autocomplete='both'
					aria-label='Search'
					spellCheck='false'
					aria-expanded={isResultsShowing}
					onChange={onChange}
					onClick={handleClick}
					onKeyDown={handleKeyDown}
				/>
			</div>
		)
	}
)

export default SearchInput
