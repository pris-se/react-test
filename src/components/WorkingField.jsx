import update from "immutability-helper";
import React, { memo, useCallback, useRef } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ItemTypes } from "../ItemsTypes.js";
import { useOutsideClick } from "../hooks/useClickOutside.jsx";
import { setActiveToolId, setUsingTools } from "../redux/mainSlice.js";
import { Tool } from "./Tool.jsx";

export const WorkingField = memo(() => {
  const ref = useRef(null);
  const usingTools = useSelector((state) => state.main.usingTools);
  const dispatch = useDispatch();

  const moveCard = useCallback((hoverIndex, item) => {
    if (!isOver && isOverCurrent) {
      return;
    }
    const droped = usingTools.filter((elem) => elem?.id === item?.id);
    const dropIndex = usingTools.findIndex((elem) => elem?.id === item?.id);
    if (droped.length && hoverIndex === dropIndex) {
      return;
    }
    if (droped.length && hoverIndex !== dropIndex) {
      const newTools = update(usingTools, {
        $splice: [
          [dropIndex, 1],
          [hoverIndex, 0, item],
        ],
      });
      dispatch(setUsingTools(newTools));
    } else {
      const newTools = update(usingTools, {
        $splice: [
          [0, 0],
          [hoverIndex, 0, item],
        ],
      });
      dispatch(setUsingTools(newTools));
    }
  });

  const handleDrop = useCallback(
    (item) => {
      const droped = usingTools.some((elem) => elem?.id === item?.id);
      if(droped) {
        return;
      }
      if (isOver && !isOverCurrent) {
        return;
      }

      const newTools = update(usingTools, {
        $push: [item],
      });
      dispatch(setUsingTools(newTools));
    },
    [usingTools, moveCard]
  );
 

  const [{ isOver, isOverCurrent, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  });

  useOutsideClick(ref, () => {
    dispatch(setActiveToolId(null));
  });

  const renderTool = useCallback(
    (tool, index) => {
      return (
        <Tool data={tool} key={tool?.id} index={index} moveCard={moveCard} />
      );
    },
    [usingTools]
  );

  let statusClass;
  if (canDrop) {
    statusClass = "can-drop";
  }
  drop(ref);
  return (
    <div className={"working-field " + (statusClass ?? "")} ref={ref}>
      <div className="tools">
        {usingTools?.map((tool, index) => renderTool(tool, index))}
      </div>
    </div>
  );
});
