import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../shadcn_ui/ui/input-otp";
import {  useSelector } from "react-redux";
import { Button } from "../shadcn_ui/ui/button";
import { SucessToast } from "./common/toast";
import { postData } from "../service/axiosservice";
import { useNavigate } from "react-router-dom";

function Otpvalidation({data}) {
  const [value, setValue] = useState("");
  console.log(value);
  const navigate = useNavigate();
  const { login } = useSelector((state) => state.login);
  console.log("login", login);
  const handelValidate = async () => {
    const resp = await postData("/api/v1/verify_otp", {
      userId: login?.id,
      token: value,
    });
    if (resp?.status) {
      navigate(`/vehicle/${data}`);
      SucessToast({ message: resp.message });
    }
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
                className="text-black bg-white rounded-md"
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
                className="text-black bg-white rounded-md"
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
