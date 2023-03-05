import { images } from '@/assets/images'
import React, { FC } from 'react'
import { IImage } from './Image.interface'

const Image: FC<IImage> = ({ ...props }) => {
	return (
		<img
			{...{ ...props }}
			src={props.src || images.defaultPreview.src}
			onError={e => {
				e.currentTarget.onerror = null
				e.currentTarget.src = images.defaultPreview.src
			}}
		/>
	)
}

export default Image
