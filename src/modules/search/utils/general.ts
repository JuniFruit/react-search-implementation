export const noDuplicates = (arr: number[]) => {
	if (arr.length > 100) return arr
	let seen = {}
	return arr.filter(function (item) {
		return seen.hasOwnProperty(item) ? false : ((seen as any)[item] = true)
	})
}
