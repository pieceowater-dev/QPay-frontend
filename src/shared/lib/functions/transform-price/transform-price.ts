export const transformPrice = (number: string) => parseFloat(number.replace(/[$,]/g, ''))
