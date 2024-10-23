import { create } from 'zustand'

const useGameStore = create((set) => ({
	isAuth: false,
	setIsAuth: (authStatus) => set(() => ({ isAuth: authStatus })),

	isMobile: false,
	setIsMobile: (mobileStatus) => set(() => ({ isMobile: mobileStatus })),

	hostId: '',
	setHostId: (id) => {
		set(() => ({hostId: id}))
	},

	sessionId: '',
	setSessionId: (id) => {
		set(() => ({sessionId: id}))
	},

	sessionCode: '',
	setSessionCode: (code) => {
		set(() => ({sessionCode: code}))
	},

	babyGender: '',
	setBabyGender: (babyGender) => {
		set(() => ({babyGender: babyGender}))
	},

	ballonLife: 5,
	setBallonLife: (life) => {
		set(() => ({ballonLife: life}))
	}
}))

export default useGameStore