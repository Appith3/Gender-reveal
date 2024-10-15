import { create } from 'zustand'

const useGameStore = create((set) => ({
	sessionID: '1a2b3c-4d5e6f',
	sessionCode: 123456,
	babyGender: '',
	setBabyGender: (babyGender) => {
		set(() => ({babyGender: babyGender}))
	},

	ballonLife: 5
}))

export default useGameStore

/**
 * {
 * 		sessionId: UUID,
 * 		sessionCode: number,
 * 		babyGender: string,
 * 		
 * }
 */