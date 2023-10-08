import React from "react";
import { createRoot } from "react-dom/client";
import "./assets/css/reset.css";
import "./assets/css/global.css";
import "./assets/css/main.css";
import "./assets/css/media.css";
import { App } from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </Provider>
);
