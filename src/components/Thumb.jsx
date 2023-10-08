import update from "immutability-helper";
import React from "react";
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ItemTypes } from "../ItemsTypes.js";
import { setUsingTools } from "../redux/mainSlice.js";

export const Thumb = ({ data }) => {
  const usingTools = useSelector((state) => state.main.usingTools);
  const dispatch = useDispatch();

  const [{ isDragging }, ref] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: () => {
        return {
          ...data,
          index: usingTools.length + 1,
          id: Date.now().toString(),
        };
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  const addTool = () => {
    const newTool = {
      ...data,
      index: usingTools.length + 1,
      id: Date.now().toString(),
    };
    const newTools = update(usingTools, {
      $push: [newTool],
    });
    dispatch(setUsingTools(newTools));
  };

  return (
    <div
      className={"tool " + data?.type}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
      onClick={addTool}
    >
      <div className="image-wrapper ico ico--25">
        <img src={data?.image} alt={data?.title} />
      </div>
      <div className="title">{data?.title}</div>
    </div>
  );
};
