import  imageIcon from "./assets/img/image.svg";
import  headlineIcon from "./assets/img/headline.svg";
import  buttonIcon from "./assets/img/button.svg";
import  paragraphIcon from "./assets/img/paragraph.svg";

export const tools = [
  {
    id: 1,
    title: "Headline",
    type: "text",
    image: headlineIcon,
    element: "h2",
    value : "",
  },
  {
    id: 2,
    title: "Paragraph",
    type: "text",
    image: paragraphIcon,
    element: "p",
    value : "",
  },
  {
    id: 3,
    title: "Button",
    type: "text",
    image: buttonIcon,
    element: "button",
    value : "",
  },
  {
    id: 4,
    title: "Image",
    type: "file",
    image: imageIcon,
    element: "img",
    value : null,
  },
];
