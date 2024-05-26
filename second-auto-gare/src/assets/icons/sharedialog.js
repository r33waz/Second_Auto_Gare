"use client";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import fbIcon from "@/assets/icons/fb.svg";
import xIcon from "@/assets/icons/x.svg";
import inIcon from "@/assets/icons/in.svg";
import waIcon from "@/assets/icons/whatsapp.svg";
import viberIcon from "@/assets/icons/viber.svg";
import teleIcon from "@/assets/icons/tele.svg";
import redIcon from "@/assets/icons/red.svg";
import mailIcon from "@/assets/icons/mail.svg";

function Sharedialoge({ blog, slug }) {
  const [path, setPath] = useState("");
  const [isCopied, setCopied] = useState(false);
  useEffect(() => {
    setPath(window.location.href);
  }, []);
  return (
    <>
      <div>
        <Dialog.Root>
          <Dialog.Trigger asChild className="cursor-pointer">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-8 h-8 text-green"
              >
                <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
              </svg>
            </div>
          </Dialog.Trigger>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 " />
          <Dialog.Content className=" fixed top-[45%] left-[50%]  translate-x-[-50%] translate-y-[-60%] rounded-[6px] bg-white p-[10px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-50 ">
            <div className="flex items-center gap-1">
              <p className="text-xl font-medium text-green">Share</p>
              <svg
                className="w-5 h-5 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="green"
                viewBox="0 0 24 24"
              >
                <path d="M16.922 11.76a1.56 1.56 0 0 0-.551-1.208L11.264 6.3a1.35 1.35 0 0 0-1.473-.2 1.542 1.542 0 0 0-.872 1.427v1.221a6.922 6.922 0 0 0-6 7.134v1.33A1.225 1.225 0 0 0 4.143 18.5a1.187 1.187 0 0 0 1.08-.73 4.72 4.72 0 0 1 3.7-2.868v1.085a1.546 1.546 0 0 0 .872 1.428 1.355 1.355 0 0 0 1.472-.2l5.108-4.25a1.56 1.56 0 0 0 .547-1.206Z" />
                <path d="m21.428 10.205-5.517-4.949a1 1 0 1 0-1.336 1.488l5.517 5.014-5.611 5.088a1 1 0 1 0 1.344 1.482l5.611-5.088a2.049 2.049 0 0 0-.008-3.035Z" />
              </svg>
            </div>

            <div className="flex justify-around items-center gap-2 pt-2 outline-none">
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer.php?u=${path}`}
              >
                <Image height={40} width={40} src={fbIcon} />
              </a>
              <a
                target="_blank"
                href={`https://twitter.com/intent/tweet?url=${path}&text=${blog?.title}`}
              >
                <Image height={35} width={35} src={xIcon} />
              </a>
              <a
                target="_blank"
                href={`https://www.linkedin.com/shareArticle?url=${path}&title=${blog?.title}`}
              >
                <Image height={35} width={35} src={inIcon} />
              </a>
              <a target="_blank" href={`https://wa.me/text=${path}`}>
                <Image height={45} width={45} src={waIcon} />
              </a>
              <a target="_blank" href={`viber://forward?text=${path}`}>
                <Image height={35} width={35} src={viberIcon} />
              </a>
              <a
                target="_blank"
                href={`https://telegram.me/share/url/?url=${path}&text=${blog?.title}`}
              >
                <Image height={40} width={40} src={teleIcon} />
              </a>
              <a
                target="_blank"
                href={`https://reddit.com/submit?url=${path}&title=${blog?.title}`}
              >
                <Image height={40} width={40} src={redIcon} />
              </a>
              <a
                target="_blank"
                href={`mailto:?subject=I wanted you to see this article&body=Check out this article ${path}`}
              >
                <Image height={40} width={40} src={mailIcon} />
              </a>
            </div>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="h-px border-0 w-80 bg-gray dark:bg-gray" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-gray dark:bg-gray-900">
                or
              </span>
            </div>
            <div className="flex gap-2 p-1 mt-2 border rounded-lg border-gray">
              <button
                className="w-2/6 text-gray"
                onClick={() => {
                  navigator.clipboard.writeText(`${path}#${slug}`);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 1000);
                }}
              >
                {isCopied ? (
                  <>
                    <p className="text-sm text-green ">Link Copied |</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-c-black">Copy Link |</p>
                  </>
                )}
              </button>
              <input
                className="w-full text-sm text-black bg-white outline-none pointer-events-none "
                placeholder={`${path}#${slug}`}
              />
            </div>
            <Dialog.Close asChild>
              <button
                className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px]  items-center justify-center rounded-full "
                aria-label="Close"
              >
                <svg
                  className="w-4 h-4 text-gray active:text-green"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </>
  );
}

export default Sharedialoge;
