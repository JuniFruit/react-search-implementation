import React, { FC } from 'react'
import { IImage } from './Image.interface'

const Image: FC<IImage> = ({ ...props }) => {
	return <img {...{ ...props }} />
}

export default Image
