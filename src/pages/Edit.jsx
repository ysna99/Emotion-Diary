import Button from '../components/Button';
import Header from '../components/Header';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '../components/Editor';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import useDiary from './hooks/useDiary';
import usePageTitle from './hooks/usePageTitle';
const Edit = () => {
    const params = useParams();

    usePageTitle(`Edit Diary`);
    const nav = useNavigate();
    const data = useContext(DiaryStateContext);
  
   const curDiaryItem = useDiary(params.id);
   

    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);


    const onClickDelete = () => {
        if (window.confirm("Are you sure you want to delete the diary? It cannot be recovered!")) {
            onDelete(params.id);
            nav('/', { replace: true });
        }
    }
    const onSubmit = (input) => {
        if (window.confirm("Will you really edit the diary?")) {
            onUpdate(params.id, input.createdDate.getTime(), input.emotionId, input.content);
            nav('/', { replace: true });
        }
    }
    return <div>
        <Header title={"Edit Diary"} leftChild={<Button onClick={()=>nav(-1)} text={"< Back"} />}
            rightChild={<Button onClick={onClickDelete} text={"Delete"} type={"Negative"} />} />
        <Editor onSubmit={onSubmit} initData={curDiaryItem} />
    </div>
}

export default Edit;