import { uniqueNamesGenerator, adjectives, animals, NumberDictionary} from 'unique-names-generator'

export const createHostID = () => {
	const number = NumberDictionary.generate({min: 100, max: 999})

	const hostId = uniqueNamesGenerator({
		dictionaries: [adjectives, animals, number],
		separator: '-',
		seed: Math.floor(100 + Math.random() * 900)
	})
	console.log('hostId: ', hostId)

	return hostId
}