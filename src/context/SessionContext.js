import React, { createContext, useState } from 'react'

export const SessionContext = createContext()

const SessionProvider = ({ children }) => {
	const [duration, setDuration] = useState(1)
	const [members, setMembers] = useState('1')
	const [value, setValue] = useState('')
	const [role, setRole] = useState('joiner')
	return (
		<SessionContext.Provider
			value={{ duration, setDuration, members, setMembers, value, setValue, role, setRole }}
		>
			{children}
		</SessionContext.Provider>
	)
}

export default SessionProvider
