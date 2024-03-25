export const OTPexpire = async (otptime) => {
    try {
        console.log(otptime)
        let dateNow = new Date()
        //add otp expiry time to the current time
        const timeDifference = (otptime - dateNow) / 1000
        timeDifference /= 60
        if (Math.abs(timeDifference) > 3) {
            return true
        } else {
            return
        }

    } catch (error) {
        console.log(error)
    }
}

export const TwominOTPexpire = async (otptime) => {
    try {
        console.log(otptime);
        let otpTime = new Date(otptime); // Convert otptime to Date object
        let dateNow = new Date();

        // Calculate time difference in minutes
        const timeDifference = (dateNow - otpTime) / (1000 * 60);

        // Check if time difference is greater than 3 minutes (expiry time)
        if (Math.abs(timeDifference) > 5) {
            return true; // OTP expired
        } else {
            return false; // OTP not expired
        }
    } catch (error) {
        console.log(error);
        return true; // Assume OTP expired in case of error
    }
};
