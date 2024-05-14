export const unixDate = (
  value: string | number,
  type: 'DHMS' | 'DM' | 'HM' | 'HMS' | 'DMY' | 'DMYNUM' | 'DMYHM',
  inSeconds = false,
  monthsArr = [
    'янв.',
    'фев.',
    'мар ',
    'апр.',
    'май ',
    'июнь',
    'июль',
    'авг.',
    'сент.',
    'окт.',
    'нояб.',
    'дек.',
  ],
): string => {
  const date =
    typeof value === 'string'
      ? new Date(+value * (inSeconds ? 1000 : 1))
      : new Date(value * (inSeconds ? 1000 : 1))
  const minutes = '0' + date.getMinutes()
  const hours = '0' + date.getHours()
  const seconds = '0' + date.getSeconds()
  const month = '0' + date.getMonth()
  const dayDate = '0' + date.getDate()

  let day: number | string = date.getDay()
  let minutesZero: number | string = date.getMinutes()
  let secondsZero: number | string = date.getSeconds()
  let hoursZero: number | string = date.getHours()

  switch (type) {
    case 'DHMS':
      day = day > 0 ? day + ' дн.' : ''
      hoursZero = hoursZero > 0 ? hoursZero + ' ч.' : ''
      minutesZero = minutesZero > 0 ? minutesZero + ' мин.' : ''
      secondsZero = secondsZero > 0 ? secondsZero + ' сек.' : ''
      return `${day} ${hoursZero} ${minutesZero} ${secondsZero}`
    case 'DM':
      return `${date.getDate()} ${monthsArr[date.getMonth()]}`
    case 'HM':
      return `${hours.substr(-2)}:${minutes.substr(-2)}`
    case 'HMS':
      return `${hours.substr(-2)}:${minutes.substr(-2)}:${seconds.substr(-2)}`
    case 'DMY':
      return `${date.getDate()} ${monthsArr[date.getMonth()]} ${date.getFullYear()}`
    case 'DMYNUM':
      return `${dayDate.substr(-2)}.${month.substr(-2)}.${date.getFullYear()}`
    case 'DMYHM':
      return `${date.getDate()} ${monthsArr[date.getMonth()]} ${date.getFullYear()} ${hours.substr(
        -2,
      )}:${minutes.substr(-2)}`
    default:
      return 'Missing type param in func'
  }
}
