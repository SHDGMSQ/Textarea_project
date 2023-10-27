import React, { useEffect, useRef, useState } from "react";
import styles from "./textarea_widget.module.css";

const placeholderTemplate = (gender) => {
  return `What do you want to see? Please note that you are creating prompt for <strong>a ${gender}</strong>, so use the appropriate description to get an adequate result.`;
};

const setCaret = (root, pos) => {
  if (pos === "end") {
    const selection = window.getSelection();
    const range = document.createRange();
    selection.removeAllRanges();
    range.selectNodeContents(root);
    range.collapse(false);
    selection.addRange(range);
  }
  root.focus();
};

export const TextareaWidget = () => {

  let firstChangingElement = useRef();
  let secondChangingElement = useRef();

  const [selectValue, setSelectValue] = useState("female");
  const [secondFieldValue, setSecondFieldValue] = useState("");
  const [firstFieldValue, setFirstFieldValue] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (firstChangingElement.current) {
      firstChangingElement.current.focus();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (e) => {
    const { key, target } = e;

    const { type, anchorOffset } = window.getSelection();
    const valueLength = target.innerHTML.length;

    if (target === secondChangingElement.current && key === "Home") {
      setCaret(firstChangingElement.current);
    }

    if (target === firstChangingElement.current && key === "End") {
      setCaret(secondChangingElement.current, "end");
    }

    if (
      ["Delete", "ArrowRight"].includes(key) &&
      target === firstChangingElement.current &&
      (!target.innerHTML || (anchorOffset === valueLength && type === "Caret"))
    ) {
      secondChangingElement.current.focus();
    }

    if (
      ["Backspace", "ArrowLeft"].includes(key) &&
      target === secondChangingElement.current &&
      (!target.innerHTML || (anchorOffset === 0 && type === "Caret"))
    ) {
      setCaret(firstChangingElement.current, "end");
    }
  };

  const handleChangeSelect = (e) => {
    setSelectValue(e.currentTarget.value);
  };

  return (
    <div className={styles.textarea_container}>
      <div className={styles.textarea}>
        <div className={styles.textarea_inner}>
          <span
            className={styles.empty}
            ref={firstChangingElement}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => setFirstFieldValue(e.target.innerHTML)}
          ></span>
          <span className={styles.select_inner}>
            <select
              name="gender"
              className={styles.select}
              onChange={handleChangeSelect}
            >
              <option value="female">female</option>
              <option value="male">male</option>
            </select>
          </span>
          <span
            className={styles.empty}
            contentEditable
            suppressContentEditableWarning
            ref={secondChangingElement}
            onInput={(e) => setSecondFieldValue(e.target.innerHTML)}
          ></span>
          {!firstFieldValue && !secondFieldValue && <span
            className={styles.text}
            onClick={() => secondChangingElement.current.focus()}
            dangerouslySetInnerHTML={{__html: placeholderTemplate(selectValue)}}
          />}
        </div>
      </div>
    </div>
  );
};
