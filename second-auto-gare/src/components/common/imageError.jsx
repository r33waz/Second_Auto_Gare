import Imgerror from "../../assets/images/ErrorImage.png";
export const handelError = (e) => {
  (e.target.src = Imgerror), (e.target.alt = "Image not found");
};
