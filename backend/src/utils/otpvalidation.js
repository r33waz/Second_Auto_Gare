export const OTPexpire = async (otptime) => {
    try {
        console.log(otptime)
        let dateNow = new Date()
        //add otp expiry time to the current time
        const timeDifference = (otptime - dateNow) / 1000
        timeDifference /= 60
        if (Math.abs(timeDifference) > 1) {
            return true
        } else {
            return
        }

    } catch (error) {
        console.log(error)
    }
}