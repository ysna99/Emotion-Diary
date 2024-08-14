import './Editor.css'
import EmotionItem from './EmotionItem';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Edit from '../pages/Edit';
import { emotionList } from '../util/constants';
import { getStringedData } from '../util/constants';

const Editor = ({ initData, onSubmit }) => {
    const nav = useNavigate();
    const [input, setInput] = useState({
        createdDate : new Date(),
        emotionId : 3,
        content : "",
    });

    const onChangeInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;

        if (name === "createdDate") {
            value = new Date(value);
        }
        setInput({
            ...input,
            [name]: value,
        })
    }

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                createdDate: new Date(Number(initData.createdDate)),
            }
            )
        }
    }, [initData])
    const onClickSubmit = () => {
        onSubmit(input);
}
    return <div className='Editor'>
        <section className='date_section'>
            <h4>Today&#39;s date</h4>
            <input name="createdDate"
                onChange={onChangeInput}
                value={getStringedData(input.createdDate)} type="date" />
        </section>
        <section className='emotion_section'>
            <h4>Today&#39;s emotion</h4>
            <div className='emotion_list_wrapper'>
                {emotionList.map((item) => <EmotionItem onClick={() => onChangeInput({
                    target: {
                        name: "emotionId",
                        value: item.emotionId,
                    }
                })}
                    key={item.emotionId} {...item} isselected={item.emotionId === input.emotionId} />)}
            </div>
        </section>
        <section className='content_section'>
            <h4>Today&#39;s diary</h4>
            <textarea name='content'
                value={input.content}
                onChange={onChangeInput}
                placeholder='How was your day? 😊'></textarea>
        </section>
        <section className='button_section'>
            <Button onClick={() => nav(-1)}
                text={"Cancel"}></Button>
            <Button onClick={onClickSubmit}
                text={"Complete"} type={"Positive"}></Button>
        </section>
    </div>
}

export default Editor;