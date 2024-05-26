import React, { useEffect, useState } from "react";
import fbIcon from "../../assets/icons/fb.svg";
import xIcon from "../../assets/icons/x.svg";
import inIcon from "../../assets/icons/in.svg";
import waIcon from "../../assets/icons/whatsapp.svg";
import viberIcon from "../../assets/icons/viber.svg";
import teleIcon from "../../assets/icons/tele.svg";
import redIcon from "../../assets/icons/red.svg";
import mailIcon from "../../assets/icons/mail.svg";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shadcn_ui/ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "../../shadcn_ui/ui/button";

function SharePoat({ data }) {
  const [path, setPath] = useState("");
  const [isCopied, setCopied] = useState(false);
  console.log("single vehicle", data);

  useEffect(() => {
    setPath(window.location.href);
  }, []);
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <button
          type="button"
          className="inline-flex items-center text-sm font-semibold cursor-pointer text-red gap-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8 text-purple"
          >
            <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
          </svg>
        </button>
      </DialogTrigger>
      <DialogContent
        className={`mt-6  sm:max-w-[425px] left-[50%] p-3 border-2 rounded-md  top-60 bg-white `}
      >
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between gap-1 text-purple">
              <div className="flex  items-center gap-1">
                <p className="text-xl font-medium ">Share</p>
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  fill="purple"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.922 11.76a1.56 1.56 0 0 0-.551-1.208L11.264 6.3a1.35 1.35 0 0 0-1.473-.2 1.542 1.542 0 0 0-.872 1.427v1.221a6.922 6.922 0 0 0-6 7.134v1.33A1.225 1.225 0 0 0 4.143 18.5a1.187 1.187 0 0 0 1.08-.73 4.72 4.72 0 0 1 3.7-2.868v1.085a1.546 1.546 0 0 0 .872 1.428 1.355 1.355 0 0 0 1.472-.2l5.108-4.25a1.56 1.56 0 0 0 .547-1.206Z" />
                  <path d="m21.428 10.205-5.517-4.949a1 1 0 1 0-1.336 1.488l5.517 5.014-5.611 5.088a1 1 0 1 0 1.344 1.482l5.611-5.088a2.049 2.049 0 0 0-.008-3.035Z" />
                </svg>
              </div>
              <DialogClose>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 256 256"
                  className="bg-purple text-white p-1 rounded-full"
                >
                  <path
                    fill="currentColor"
                    d="M204.24 195.76a6 6 0 1 1-8.48 8.48L128 136.49l-67.76 67.75a6 6 0 0 1-8.48-8.48L119.51 128L51.76 60.24a6 6 0 0 1 8.48-8.48L128 119.51l67.76-67.75a6 6 0 0 1 8.48 8.48L136.49 128Z"
                  />
                </svg>
              </DialogClose>
            </div>
          </DialogTitle>

          <DialogDescription>
            <div className="flex justify-around items-center gap-2 pt-2 outline-none">
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.facebook.com/sharer.php?u=${path}`}
              >
                <img height={40} width={40} src={fbIcon} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/intent/tweet?url=${path}&text=${data?.model}`}
              >
                <img height={35} width={35} src={xIcon} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.linkedin.com/shareArticle?url=${path}&title=${data?.model}`}
              >
                <img height={35} width={35} src={inIcon} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/text=${path}`}
              >
                <img height={45} width={45} src={waIcon} />
              </a>
              <a
                target="_blank"
                href={`viber://forward?text=${path}`}
                rel="noreferrer"
              >
                <img height={35} width={35} src={viberIcon} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://telegram.me/share/url/?url=${path}&text=${data?.model}`}
              >
                <img height={40} width={40} src={teleIcon} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://reddit.com/submit?url=${path}&title=${data?.model}`}
              >
                <img height={40} width={40} src={redIcon} />
              </a>
              <a
                target="_blank"
                rel="noreferrer"
                href={`mailto:?subject=I wanted you to see this article&body=Check out this article ${path}`}
              >
                <img height={40} width={40} src={mailIcon} />
              </a>
            </div>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="h-px border-0 w-80 " />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2  left-1/2 ">
                or
              </span>
            </div>
            <div className="flex gap-2 p-1 mt-2 border rounded-lg border-gray">
              <button
                className="w-2/6 text-gray"
                onClick={() => {
                  navigator.clipboard.writeText(`${path}`);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              >
                {isCopied ? (
                  <>
                    <p className="text-sm text-purple ">Link Copied |</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-c-black">Copy Link |</p>
                  </>
                )}
              </button>
              <input
                className="w-full placeholder:text-gray-700 text-sm text-black bg-white outline-none pointer-events-none "
                placeholder={`${path}`}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SharePoat;
