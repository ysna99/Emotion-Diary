import Button from '../components/Button';
import Header from '../components/Header';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';
import usePageTitle from './hooks/usePageTitle';
const New = () => {
    const nav = useNavigate();
    const { onCreate } = useContext(DiaryDispatchContext);

    usePageTitle("Create a new Diary");
    const onSubmit = (input) => {
        onCreate(input.createdDate.getTime(), input.emotionId, input.content);
        nav("/", { replace: true });
    }
    return (
        <div>
            <Header title={"Create a new Diary"} leftChild={<Button onClick={
                () => nav(-1)}
                text={"< Back"} />} />
            <Editor onSubmit={onSubmit} />
        </div>
    )
        
        
    
}

export default New;