import { useState } from 'react'

interface IInfoMsg {
	type: 'success' | 'error' | 'warning'
	message: string
}

export const useToast = () => {
	const [infoMsg, setInfoMsg] = useState<IInfoMsg>({
		type: 'error',
		message: ''
	})

	return {
		type: infoMsg.type,
		message: infoMsg.message
	}
}
