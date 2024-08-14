import './DiaryList.css'
import Button from './Button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const DiaryList = ({ data }) => {
    
    const nav = useNavigate();
    const [sortType, setType] = useState("latest");
    
    const onChangeType = (e) => {
        setType(e.target.value);
    }
    
    const getSortedData = () => {
        return data.sort((a, b) => {
            if (sortType == "oldest") {
                return Number(a.createdDate) - Number(b.createdDate);
            }
            else return Number(b.createdDate) - Number(a.createdDate);
        })
    }

    const sortedData = getSortedData();

    return <div className='DiaryList'>
        <div className='menu_bar'>
            <select onChange={onChangeType}>
                <option value={"latest"}>latest</option>
                <option value={"oldest"}>oldest</option>
            </select>
            <Button onClick={() => {
                nav(`/new`);
            }}
                text={"Create a new Diary"} type={"Positive"} />
        </div>
        <div className='list_wrapper'>
            {sortedData.map((item)=><DiaryItem key={item.id} {...item} />)}
        </div>
    </div>
}

export default DiaryList;