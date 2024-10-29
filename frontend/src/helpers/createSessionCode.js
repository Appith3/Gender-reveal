import { uniqueNamesGenerator, NumberDictionary } from 'unique-names-generator'

export const createSessionCode = () => {
	const part1 = NumberDictionary.generate({length: 3})
	const part2 = NumberDictionary.generate({length: 3})
  const code = uniqueNamesGenerator({
		dictionaries: [part1, part2],
		separator: '-',
	})

  return code
}