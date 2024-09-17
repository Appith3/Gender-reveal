import { create } from 'zustand'

const useGameStore = create((set) => ({
	sessionID: '1a2b3c-4d5e6f',
	sessionCode: 123456,
	babyGender: '',
	setBabyGender: (babyGender) => {
		console.log('babyGender(store): ', babyGender);
		set(() => ({babyGender: babyGender}))
	}
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