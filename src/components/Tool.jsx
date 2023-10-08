import update from "immutability-helper";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ItemTypes } from "../ItemsTypes.js";
import { setActiveToolId, setUsingTools } from "../redux/mainSlice.js";

import { ReactComponent as ArrowDownIcon } from "../assets/img/action-bottom.svg";
import { ReactComponent as ArrowUpIcon } from "../assets/img/action-top.svg";
import { ReactComponent as CopyIcon } from "../assets/img/copy.svg";
import { ReactComponent as RemoveIcon } from "../assets/img/trash.svg";

export const Tool = memo(function Tool({ data, index, moveCard }) {
  const dispatch = useDispatch();
  const usingTools = useSelector((state) => state.main.usingTools);
  const activeToolId = useSelector((state) => state.main.activeToolId);
  const [value, setValue] = useState(data?.value);
  const ref = useRef(null);
  const inputRef = useRef(null);

  const isActiveTool = activeToolId === data?.id;

  const [{ isDragging, handlerId, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isDragging: monitor.getItem()?.id === data?.id,
        isOver: monitor.isOver(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(hoverIndex, item);
    },
  });

  useEffect(() => {
    const updatedData = update(usingTools, {
      $apply: (tools) => {
        return tools.map((item) => {
          if (item?.id === data?.id) {
            return { ...item, value };
          }
          return item;
        });
      },
    });
    dispatch(setUsingTools(updatedData));
  }, [value]);

  useEffect(() => {
    isActiveTool && inputRef.current.focus();
  }, [isActiveTool]);



  const onClickHandler = () => {
    dispatch(setActiveToolId(data?.id));
  };
  const onChangeHandler = (e) => {
    if (data?.type === "file") {
      setValue(URL.createObjectURL(e.target.files && e.target.files[0]));
    } else {
      setValue(e.target.value);
    }
  };
  const removeHandler = () => {
    const updatedData = usingTools.filter((item) => item.id !== data.id);
    dispatch(setUsingTools(updatedData));
  };
  const copyHandler = () => {
    function addItemAfterIndex(arr, index, newItem) {
      const copyOfArray = [...arr];
      copyOfArray.splice(index + 1, 0, newItem);
      return copyOfArray;
    }
    const updatedData = addItemAfterIndex(usingTools, index, {
      ...data,
      id: Date.now().toString(),
    });
    dispatch(setUsingTools(updatedData));
  };
  const moveHandler = (direction = 1) => {
    function moveUp(arr, index) {
      const copyOfArray = [...arr];
      if (index > 0 && index < copyOfArray.length) {
        const item = copyOfArray.splice(index, 1)[0];
        copyOfArray.splice(index - 1, 0, item);
      }
      return copyOfArray;
    }

    function moveDown(arr, index) {
      const copyOfArray = [...arr];
      if (index >= 0 && index < copyOfArray.length - 1) {
        const item = copyOfArray.splice(index, 1)[0];
        copyOfArray.splice(index + 1, 0, item);
      }
      return copyOfArray;
    }

    const updatedData =
      direction < 0 ? moveUp(usingTools, index) : moveDown(usingTools, index);
    dispatch(setUsingTools(updatedData));
  };

  drop(ref);
  return (
    <div
      ref={ref}
      onClick={onClickHandler}
      data-testid="box"
      data-index={index}
      data-handler-id={handlerId}
      className="tool-wrapper"
      style={isDragging ? { opacity: 0 } : { opacity: 1 }}
    >
      <div className={"tool " + data?.type + (isActiveTool ? " active" : "")}>
        {isActiveTool && (
          <div className="actions">
            <div className="actions__group --primary">
              <button className="btn" onClick={() => moveHandler(-1)}>
                <ArrowUpIcon />
              </button>
              <button className="btn" onClick={() => moveHandler(1)}>
                <ArrowDownIcon />
              </button>
            </div>
            <div className="actions__group --secondary">
              <button className="btn --copy" onClick={copyHandler}>
                <CopyIcon />
              </button>
              <button className="btn" onClick={removeHandler}>
                <RemoveIcon />
              </button>
            </div>
          </div>
        )}
        <div className="image-wrapper ico ico--25">
          <img src={data?.image} alt={data?.title} />
        </div>
        <div className="title">{data?.title}</div>
        <label className="input-wrapper" >
          {data?.type === "file" ? <p className="info">{ !value ? "Choose image" : "Change image" }</p> : null}
          <input
            onChange={onChangeHandler}
            ref={inputRef}
            className={"input " + data?.type}
            type={data?.type}
            value={ data?.type !== "file" ? value : undefined }
          />
        </label>
      </div>
    </div>
  );
});
