import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../shadcn_ui/ui/input-otp";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../shadcn_ui/ui/button";
import { VerifyOtp } from "../redux/sendotp/otpthunk";
import { SucessToast } from "./common/toast";
import loginslice from "../redux/loginslice/loginslice";

function Otpvalidation() {
  const [value, setValue] = useState("");
  console.log(value);
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.login);
  console.log("login", login);
  const handelValidate = () => {
    dispatch(
      VerifyOtp({
        data: {
          userId: login?.id,
          token: parseInt(value),
        },
      }).then(() => {
          dispatch(loginslice())
      })
    );
  };
  return (
    <>
      <div className="flex flex-col justify-center gap-2">
        <InputOTP
          value={value}
          onChange={(value) => setValue(value)}
          maxLength={6}
        >
          <InputOTPGroup className="flex gap-1">
            {/* Render the first three InputOTPSlot components */}
            {[0, 1, 2].map((index) => (
              <InputOTPSlot
                className="bg-white rounded-md text-black"
                key={index}
                index={index}
              />
            ))}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup className="flex gap-1">
            {/* Render the last three InputOTPSlot components */}
            {[3, 4, 5].map((index) => (
              <InputOTPSlot
                className="bg-white rounded-md text-black"
                key={index}
                index={index}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <Button
          onClick={handelValidate}
          className="px-2 py-0.5 border rounded-md text-sm hover:bg-white hover:text-black"
        >
          Verify OTP
        </Button>
      </div>
    </>
  );
}

export default Otpvalidation;
