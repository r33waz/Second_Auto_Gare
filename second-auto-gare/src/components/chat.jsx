import { Button } from "../shadcn_ui/ui/button";
import React, { useEffect, useState } from "react";
import { singleUserConvo } from "../redux/conversation/conversationThunk";
import logo from "../assets/images/kidmfond.jpg";
import {
  createMessage,
  getMessagesByConvId,
} from "../redux/message/messageThunk";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { SucessToast } from "./common/toast";
import { useNavigate } from "react-router-dom";

function Chat({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [reciverName, setReciverName] = useState(
    user?.firstname + " " + user?.lastname
  );
  const [onlieUser, setOnlineUser] = useState([]);
  const [messgae, setMesssage] = useState({});
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const { login: userData } = useSelector((state) => state.login);
  const { data: conversations } = useSelector((state) => state.connvo);
  const { data: message } = useSelector((state) => state.message);
  console.log("message", messgae);
  console.log("onlieUser", onlieUser);
  console.log(conversations);
  console.log("user", userData);
  useEffect(() => {
    dispatch(singleUserConvo({ id: userData?.id }));
  }, [dispatch, userData?.id]);

  useEffect(() => {
    setMesssage({ messages: message, reciverName });
  }, [message, reciverName]);

  useEffect(() => {
    setSocket(io(`${import.meta.env.VITE_SOCKET_URL}`));
  }, []);

  // socket addUser
  useEffect(() => {
    socket?.emit("addUser", userData?.id);
    socket?.on("getOnlineUser", (users) => {
      setOnlineUser(users);
    });
    socket?.on("getMessage", (data) => {
      console.log("data>>>", data);
      setMesssage((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          {
            userId: data?.user?._id,
            mesg: data?.message,
            firstname: data?.user?.firstname,
            lastname: data?.user?.lastname,
          },
        ],
      }));
    });

    return () => {
      socket?.off("getOnlineUser");
    };
  }, [socket, user?.id]);

  const onsubmit = async () => {
    socket?.emit("sendMessage", {
      senderId: userData?.id,
      recieverId: user?._id,
      message: "Hello 👋",
      conversationId: selectedConversationId,
    });
    dispatch(
      createMessage({
        data: {
          conversationId: selectedConversationId,
          senderId: userData?.id,
          reciverId: user?._id,
          message: "Hello 👋",
        },
      })
    );
    SucessToast({ message: "Conservation started" });
    navigate("/inbox");
  };

  return (
    <>
      <Button
        onClick={onsubmit}
        className="h-12 py-3 text-lg text-center text-white rounded-xl bg-purple"
      >
        Message Dealer
      </Button>
      {/* <div
        className={`fixed z-50 right-14 duration-500 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bottom-1 bg-white ${
          isOpen
            ? "h-[400px] flex flex-col justify-between w-96"
            : "flex flex-col justify-between w-96 h-0"
        }`}
      >
        <div className="relative flex flex-col justify-between ">
          <div className="flex items-center justify-between w-full h-16 px-2 bg-purple/50">
            <div className="flex items-center gap-1">
              <img
                className="w-10 h-10 rounded-full"
                src={user?.photo?.url}
                alt="image"
              />
              <h1 className="text-white">
                {user?.firstname} {user?.lastname}
              </h1>
            </div>

            <span onClick={() => setOpen(!isOpen)}>
              {isOpen ? (
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 32 32"
                  className="text-white"
                >
                  <path
                    fill="currentColor"
                    d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6l-6 6z"
                  />
                </svg>
              )}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="flex items-center w-full">
            <div className="flex flex-col w-full">
              <input
                id="message"
                placeholder="Enter your message "
                type="text"
                className="h-10 pl-2 text-xs border border-gray-600"
                {...register("message", { required: true })}
              />
              {errors?.message && (
                <span className="text-xs text-red">
                  Can't send empty message
                </span>
              )}
            </div>
            <Button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="p-2 text-white rounded-full bg-purple"
              >
                <path
                  fill="currentColor"
                  d="M4 18.5v-5.154L9.846 12L4 10.654V5.5L19.423 12z"
                />
              </svg>
            </Button>
          </div>
        </form>
      </div> */}
    </>
  );
}

export default Chat;
