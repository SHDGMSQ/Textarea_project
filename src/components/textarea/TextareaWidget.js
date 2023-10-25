import React, {useEffect, useRef, useState} from 'react';
import styles from './textarea_widget.module.css'

export const TextareaWidget = () => {

    let firstChangingElement = useRef()
    let secondChangingElement = useRef()

    let secondElementPlaceholder = ''

    const [selectValue, setSelectValue] = useState('female')

    useEffect(() => {

        const secondUpdateElement = document.getElementById('secondUpdateElement');
        const secondPlaceholder = `What do you want to see? Please note that you are creating prompt for a ${selectValue}, so use the appropriate description to get an adequate result.`
        secondElementPlaceholder = secondPlaceholder
        secondUpdateElement.innerHTML === '' && (secondUpdateElement.innerHTML = secondPlaceholder);
        secondUpdateElement.addEventListener('focus', function (e) {
            const value = e.target.innerHTML;
            value === secondPlaceholder && (e.target.innerHTML = '');
        });
        secondUpdateElement.addEventListener('blur', function (e) {
            const value = e.target.innerHTML;
            value === '' && (firstChangingElement.current.innerText.trim().length === 0) && (e.target.innerHTML = secondPlaceholder);
        });

    })


    const handleEmptyChange = () => {
        if (firstChangingElement.current.innerText.trim().length === 0) {
            firstChangingElement.current.innerHTML = firstChangingElement.current.innerHTML.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<span><br><\/span>/gi, '')
            if (!secondChangingElement.current.innerText.trim().length === 0) {
                secondChangingElement.current.innerHTML = secondElementPlaceholder
            }
        } else {
            if (secondChangingElement.current.innerHTML === secondElementPlaceholder) {
                secondChangingElement.current.innerHTML = ''
            }
            firstChangingElement.current.setAttribute('style', 'display: inline')
        }
    }

    const handleSpanChange = () => {
        secondChangingElement.current.setAttribute('style', 'opacity: 1')
        if (secondChangingElement.current.innerText.trim().length === 0) {
            secondChangingElement.current.setAttribute('style', 'opacity: .5')
        }
    }

    const handleChangeSelect = (e) => {
        setSelectValue(e.currentTarget.value)
    }


    return (
        <div className={styles.textarea_container}>
            <div className={styles.textarea}>
                <div className={styles.textarea_inner}>
                    <span
                        className={styles.empty}
                        ref={firstChangingElement}
                        onInput={handleEmptyChange}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                    > </span>
                    <span className={styles.select_inner}>
                        <select name="gender" className={styles.select}
                                onChange={handleChangeSelect}>
                            <option value="female">female</option>
                            <option value="male">male</option>
                        </select>
                    </span>
                    <span className={styles.text}
                          onInput={handleSpanChange}
                          id="secondUpdateElement"
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                          ref={secondChangingElement}
                    >
                    </span>
                </div>
            </div>
        </div>
    );
};
