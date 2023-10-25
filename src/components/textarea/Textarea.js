import React from 'react';
import { useRef } from "react";
import styles from './textarea.module.css'
//new

export const Textarea = () => {
    let emptySpanElement = useRef()
    let spanElement = useRef()
    let selectElement = useRef()

    let spanPlaceholder = `What do you want to see? Please note that you are creating prompt for a ${selectElement? selectElement.current? selectElement.current.innerHTML: "female": "female"}, so use the appropriate description to get an adequate result.`

    const handleEmptyChange = () => {
        emptySpanElement.current.setAttribute('style', 'display: inline')
    }

    function handleClick(e) {
    }

    function handleChange(e) {
    }

    const handleChangeSelect = () => {
    }


    // const trimFunc = (text) => {
    //     return text.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<span><br><\/span>/gi, '')
    // }

    return (
        <div className={styles.textarea_container}>
            <div className={styles.textarea}>
                <div className={styles.textarea_inner}
                     onClick={handleClick}
                     onInput={handleChange}
                     suppressContentEditableWarning={true}
                >
                    <span
                        className={styles.empty}
                        ref={emptySpanElement}
                        onInput={handleEmptyChange}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                    > </span>
                    <span className={styles.select_inner}>
                        <select name="gender" className={styles.select} ref={selectElement} onChange={handleChangeSelect}>
                            <option value="female">female</option>
                            <option value="male">male</option>
                        </select>
                    </span>
                    <span className={styles.text}
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          ref={spanElement}
                    >
                        {spanPlaceholder}
                    </span>
                </div>
            </div>
        </div>
    );
};
