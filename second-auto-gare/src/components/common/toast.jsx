import toast from "react-hot-toast";

export const SucessToast = ({ message }) => {
  return toast.success(message, {
    style: {
      border: "1px solid green",
      padding: "16px",
      color: "green",
    },
    iconTheme: {
      primary: "green",
      secondary: "white",
    },
    duration: 2000,
  });
};

export const ErrorToast = ({ message }) => {
  return toast.error(message, {
    style: {
      border: "1px solid red",
      padding: "16px",
      color: "red",
    },
    iconTheme: {
      primary: "red",
      secondary: "white",
    },
    duration: 2000,
  });
};
