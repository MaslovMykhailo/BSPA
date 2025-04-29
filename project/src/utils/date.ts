import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

export const parseDate = (dateString: string): Date => dayjs(dateString, 'DD.MM.YYYY HH:mm:ss').toDate()

export const formatDate = (date: Date): string => dayjs(date).format('DD.MM.YYYY')

export const fromISOString = (dateString: string): Date => new Date(dateString)

export const toISOString = (date: Date): string => date.toISOString()
