import { Button } from "../../shadcn_ui/ui/button";
import React, { useState } from "react";

function Chat({ data }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!isOpen)}
        className="py-3 text-lg h-12 text-center text-white rounded-xl bg-purple"
      >
        Message Dealer
      </Button>
      <div
        className={`fixed z-50 right-14 duration-500 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bottom-0 bg-white ${
          isOpen ? "h-[400px] w-96"  : "h-0 w-96"
        }`}
      >
        <div className="flex flex-col justify-between">
          <div className="h-16 flex justify-between items-center w-full bg-purple/50 px-2">
            <img
              className="h-10 w-10 rounded-full"
              src={data?.photo?.url}
              alt="image"
            />

            <span onClick={() => setOpen(!isOpen)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 32 32"
                className="text-white"
              >
                <path
                  fill="currentColor"
                  d="M17.414 16L24 9.414L22.586 8L16 14.586L9.414 8L8 9.414L14.586 16L8 22.586L9.414 24L16 17.414L22.586 24L24 22.586z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
