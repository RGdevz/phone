export const myGroups = ["No Group","Friends","Family"] as const

export type MyGroupEnum = typeof myGroups[number] | (string & {})