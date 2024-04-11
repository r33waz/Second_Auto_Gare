import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../shadcn_ui/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { singleUserConvo } from "../../redux/conversation/conversationThunk";
import logo from "../../assets/images/kidmfond.jpg";
import {
  createMessage,
  getMessagesByConvId,
} from "../../redux/message/messageThunk";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import ErrorImg from "../../assets/images/ErrorImage.png";

function Inbox() {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(true);
  const [socket, setSocket] = useState(null);
  const [reciverId, setReciverId] = useState();
  const [reciverName, setReciverName] = useState();
  const [onlieUser, setOnlineUser] = useState([]);
  const [reviverImage, setReciverImage] = useState();
  const [currentDate] = useState(getDate());
  console.log(reciverName);
  const [messgae, setMesssage] = useState({});
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const { login: user } = useSelector((state) => state.login);
  const { data: conversations } = useSelector((state) => state.connvo);
  const { data } = useSelector((state) => state.message);
  const scrollRef = useRef();
  console.log("message", messgae);
  console.log("onlieUser", onlieUser);
  console.log(conversations);

  useEffect(() => {
    dispatch(singleUserConvo({ id: user?.id }));
  }, [dispatch, user?.id]);

  useEffect(() => {
    setMesssage({ messages: data, reciverName });
  }, [data, reciverName]);

  useEffect(() => {
    setSocket(io(`${import.meta.env.VITE_SOCKET_URL}`));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messgae]);

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  //socket addUser
  useEffect(() => {
    socket?.emit("addUser", user?.id);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openMessage = ({ i }) => {
    console.log("i", i);
    console.log(i?.userId);
    setReciverId(i?.userId);
    setReciverName(i?.firstname + " " + i?.lastname);
    setReciverImage(i?.photo);
    setSelectedConversationId(i?.conversationId);
    dispatch(getMessagesByConvId({ id: i?.conversationId }));
  };

  const onsubmit = async (data) => {
    socket?.emit("sendMessage", {
      senderId: user?.id,
      recieverId: reciverId,
      message: data?.message,
      conversationId: selectedConversationId,
    });
    dispatch(
      createMessage({
        data: {
          conversationId: selectedConversationId,
          senderId: user?.id,
          reciverId: reciverId,
          message: data?.message,
        },
      })
    );
    reset();
  };

  return (
    <div className="container flex flex-col h-screen ">
      <div className="flex h-full ">
        <div
          className={` h-screen overflow-y-auto overflow-x-hidden  flex flex-col shadow-lg relative duration-700 ${
            isOpen ? "w-[400px]" : "w-12"
          }`}
        >
          <Button
            onClick={() => setOpen(!isOpen)}
            className="absolute left-0 pr-2 mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              className={`${isOpen ? "" : "rotate-180"}`}
            >
              <path
                fill="currentColor"
                d="M4 17v-1h11.423v1zm15.292-.904L15.158 12l4.134-4.077l.708.708L16.573 12L20 15.388zM4 12.5v-1h8.577v1zM4 8V7h11.423v1z"
              />
            </svg>
          </Button>
          <div className="flex flex-col mt-16">
            {conversations.length <= 0 ? (
              <div className="text-sm text-gray-300">No chats</div>
            ) : (
              conversations?.map((i, idx) => {
                const isOnline = onlieUser?.some(
                  (user) => user?.userId === i?.userId
                );
                return (
                  <div
                    key={idx}
                    className="relative flex justify-between py-3 pr-2 border border-gray-300 cursor-pointer"
                    onClick={() => openMessage({ i })}
                  >
                    <span className="absolute top-14 left-10">
                      <span className="relative flex w-3 h-3">
                        <span
                          className={`absolute inline-flex w-full h-full rounded-full opacity-75 ${
                            isOnline ? "animate-ping bg-green" : "bg-black"
                          }`}
                        ></span>

                        <span
                          className={`relative inline-flex w-3 h-3 rounded-full  ${
                            isOnline ? " bg-green" : "bg-gray-500"
                          }`}
                        ></span>
                      </span>
                    </span>
                    <div className="flex items-center gap-2">
                      <img
                        src={i?.photo ? i?.photo : ErrorImg}
                        alt={i?.firstname[0]}
                        className="object-cover text-center border-2 rounded-full w-14 h-14"
                      />
                      <h1>{i?.firstname + "" + i?.lastname}</h1>
                    </div>
                    <div className=" flex flex-col items-end gap-2.5">
                      <span className="relative flex w-5 h-5 text-center">
                        <span className="absolute inline-flex w-full h-full text-center rounded-full opacity-75 animate-ping bg-purple"></span>
                        <span className="relative inline-flex w-5 h-5 pt-0.5 pl-1.5 text-xs text-white rounded-full bg-purple">
                          2
                        </span>
                      </span>
                      <span className="text-sm text-purple">{currentDate}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="flex justify-center w-full bg-purple/40">
          <div className="flex flex-col mt-3 pb-4 lg:w-[80%] md:w-[80%] border-2 shadow-xl bg-white border-gray-400 rounded-xl">
            <div className="text-white h-14 bg-purple rounded-xl">
              <div className="flex items-center">
                <img
                  src={reviverImage ? reviverImage : ErrorImg}
                  alt=""
                  className="p-2 rounded-full h-14 w-14"
                />
                <h1>{messgae?.reciverName}</h1>
              </div>
            </div>

            <div className="flex flex-col h-full px-8 py-6 mt-10 overflow-scroll ">
              {messgae && messgae?.messages?.length <= 0 ? (
                <div className="flex justify-center mt-2 text-purple/80">
                  Start a conversation..
                </div>
              ) : (
                messgae &&
                messgae?.messages?.map((message, idx) => (
                  <div
                    key={idx} // Assuming userId is unique for each message
                    className={`max-w-[40%] h-fit mt-5 rounded-md px-1.5 py-2  ${
                      message.userId === user?.id
                        ? "bg-purple text-white ml-auto justify-end items-start mr-5"
                        : "bg-white text-purple shadow-lg mr-auto justify-start items-end"
                    }`}
                    ref={scrollRef}
                  >
                    {message.mesg}
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSubmit(onsubmit)}>
              <div className="flex justify-center gap-3 rounded-2xl">
                <div className="w-[50%] flex border border-gray-300 items-center rounded-2xl">
                  <div className="flex flex-col w-full ">
                    <input
                      id="message"
                      placeholder="Enter your message "
                      type="text"
                      className="h-12 pl-2 rounded-2xl"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
