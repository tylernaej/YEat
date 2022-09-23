//FUNCTIONS TO MASK PHONE NUMBER INPUTS:
export const changeToDigits = (phoneNumber) => {
    return phoneNumber.replace(/[^0-9,.]/g, '')
  }

export const phoneNumberFormatter = (phone) => {
    if(!phone){
      return
    }
    const frame = '(___) ___-____'
  
    const digits = changeToDigits(phone)
   
    let i = 0
    let lastIndex = 0
    let formatted = frame.replace(/_/g, (_, j) => {
      if (i >= digits.length) return '_'

      lastIndex = j;

      return digits[i++]
    })
  
    return formatted.substring(0, lastIndex + 1)
  }