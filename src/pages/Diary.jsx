import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import Viewer from '../components/Viewer';
import { useDebugValue } from 'react';
import useDiary from './hooks/useDiary';
import { getStringedData } from '../util/constants';
import usePageTitle from './hooks/usePageTitle';
const Diary = () => {
    const params = useParams();
    const nav = useNavigate();

    usePageTitle(`Diary Page`)
    const curDiaryItem = useDiary(params.id);

    if (!curDiaryItem) {
        return <div>Data loading...</div>
    }

    const { createdDate, emotionId, content } = curDiaryItem;
    return <div>
        <Header title={getStringedData(new Date(createdDate))} leftChild={<Button onClick={()=>nav(-1)} text={"< Back"}/>}
            rightChild={<Button onClick={() => nav(`./edit/${params.id}`)} text={"Edit"} />} />
        <Viewer emotionId = {emotionId} content = {content} />
    </div>
}

export default Diary;