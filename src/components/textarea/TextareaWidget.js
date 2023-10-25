import React, {useState} from 'react';
import styles from './textarea_widget.module.css'

export const TextareaWidget = () => {

    const [selectValue, setSelectValue] = useState('female')
    const [firstElementValue, setFirstElementValue] = useState('')
    const [secondElementValue, setSecondElementValue] = useState('')
    const [placeholder, setPlaceholder] = useState("What do you want to see? Please note that you are creating prompt for a female, so use the appropriate description to get an adequate result.")


    // useEffect(() => {
    //
    //     const secondUpdateElement = document.getElementById('secondUpdateElement');
    //
    //     const secondPlaceholder = `What do you want to see? Please note that you are creating prompt for a ${selectValue}, so use the appropriate description to get an adequate result.`
    //     secondElementPlaceholder = secondPlaceholder
    //     secondUpdateElement.innerHTML === '' && (secondUpdateElement.innerHTML = secondPlaceholder);
    //     secondUpdateElement.addEventListener('keypress', function (e) {
    //         const value = e.target.innerHTML;
    //         value === secondPlaceholder && (e.target.innerHTML = '');
    //     });
    //     secondUpdateElement.addEventListener('blur', function (e) {
    //         const value = e.target.innerHTML;
    //         value === '' && (firstChangingElement.current.innerText.trim().length === 0) && (e.target.innerHTML = secondPlaceholder);
    //     });
    //
    // })


    // const handleEmptyChange = (e) => {
    //     if (firstChangingElement.current.innerText.trim().length === 0) {
    //         firstChangingElement.current.innerHTML = firstChangingElement.current.innerHTML.replace(/&nbsp;/gi, '').replace(/<div><br><\/div>/gi, '').replace(/<span><br><\/span>/gi, '')
    //         if (!secondChangingElement.current.innerText.trim().length === 0) {
    //             secondChangingElement.current.innerHTML = secondElementPlaceholder
    //         }
    //     } else {
    //         if (secondChangingElement.current.innerHTML === secondElementPlaceholder) {
    //             secondChangingElement.current.innerHTML = ''
    //         }
    //         firstChangingElement.current.setAttribute('style', 'display: inline')
    //     }
    // }
    //
    // const handleSpanChange = () => {
    //     secondChangingElement.current.setAttribute('style', 'opacity: 1')
    //     if (secondChangingElement.current.innerText.trim().length === 0) {
    //         secondChangingElement.current.setAttribute('style', 'opacity: .5')
    //     }
    // }


    const setCaretPosition = (el, pos) => {
        let range = document.createRange();
        let sel = getSelection()
        range.setStart(el, pos); // устанавливаем начальную точку диапазона
        range.collapse(true); // схлопываем диапазон до начальной точки
        sel.removeAllRanges(); // удаляем все диапазоны из выделения
        sel.addRange(range); // добавляем диапазон к выделению
    }

    const handleChangeSelect = (e) => {
        setSelectValue(e.currentTarget.value)
        setPlaceholder(`What do you want to see? Please note that you are creating prompt for a ${e.currentTarget.value}, so use the appropriate description to get an adequate result.`)
    }
    const handleFirstElementChange = (e) => {
        const value = e.target.innerText
        if (value.trim().length === 0) {
            console.log(value.trim().length)
            return
        }
        console.log(value.length)
        setFirstElementValue(value)
    }

    const handleSecondElementChange = (e) => {
        let value = e.target.innerText

        if (!secondElementValue) {
            value = e.target.innerText.slice(0,1)
            setCaretPosition(e.target.childNodes[0], e.target.childNodes[0].length)
        }
        setCaretPosition(e.target.childNodes[0], e.target.childNodes[0].length)
        //setSecondElementValue(value)
    }
    const handleSecondElementClick = (e) => {
        if (!secondElementValue) {
            setCaretPosition(e.target.childNodes[0], 0)
            // let range = document.createRange();
            // let sel = getSelection()
            // range.setStart(e.target.childNodes[0], 0); // устанавливаем начальную точку диапазона
            // range.collapse(true); // схлопываем диапазон до начальной точки
            // sel.removeAllRanges(); // удаляем все диапазоны из выделения
            // sel.addRange(range); // добавляем диапазон к выделению
        }
    }


    return (
        <div className={styles.textarea_container}>
            <div className={styles.textarea}>
                <div className={styles.textarea_inner}>
                    <span
                        className={firstElementValue.length === 0 ? styles.empty : styles.empty_with_text}
                        onInput={handleFirstElementChange}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                    >
                    </span>
                    <span className={styles.select_inner}>
                        <select name="gender" className={styles.select}
                                onChange={handleChangeSelect} value={selectValue}>
                            <option value="female">female</option>
                            <option value="male">male</option>
                        </select>
                    </span>
                    <span className={!secondElementValue ? styles.text: styles.text_span}
                          onClick={handleSecondElementClick}
                          onInput={handleSecondElementChange}
                          contentEditable={true}
                          suppressContentEditableWarning={true}
                    >
                        {!secondElementValue ? placeholder : secondElementValue}
                    </span>
                </div>
            </div>
        </div>
    );
};
