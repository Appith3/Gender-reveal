import { uniqueNamesGenerator, adjectives, colors } from 'unique-names-generator'

export const createSessionId = () => {
	
  const sessionId = uniqueNamesGenerator({
		dictionaries: [adjectives, colors],
		separator: '',
		style: 'capital'
	})
	console.log('sessionId: ', sessionId);

  return sessionId
}