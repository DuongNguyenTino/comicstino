export const formatNumberDetail = (number) => {
  const num = parseInt(number)
  let formattedNumber = num.toLocaleString('vi-VN')
  return formattedNumber
}