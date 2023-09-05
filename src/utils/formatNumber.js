export const formatNumber = (number) => {
  const parseIntNumber = parseInt(number)
  if (parseIntNumber < 1000 ) {
    return parseIntNumber +''
  } else if (parseIntNumber < 10000) {
    const num = parseIntNumber / 1000
    return num.toFixed(1) + 'K'
  } else if (parseIntNumber < 1000000) {
    const num = parseIntNumber / 1000
    return num.toFixed(0) + 'K'
  } else if (parseIntNumber < 10000000) {
    const num = parseIntNumber / 1000000
    return num.toFixed(1) + 'M'
  } else if (parseIntNumber < 1000000000) {
    const num = parseIntNumber / 1000000
    return num.toFixed(0) + 'M'
  } else if (parseIntNumber < 10000000000) {
    const num = parseIntNumber / 1000000000
    return num.toFixed(1) + 'B'
  } else {
    const num = parseIntNumber / 1000000000
    return num.toFixed(0) + 'B'
  }
}