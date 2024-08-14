import { useState, useContext } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import DiaryItem from '../components/DiaryItem';
import { DiaryStateContext } from '../App';
import usePageTitle from './hooks/usePageTitle';
import Getmonth from '../util/get-month';
const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth(),
        1,
        0,
        0,
        0
    ).getTime();

    const endTime = new Date(
        pivotDate.getFullYear(),
        pivotDate.getMonth() + 1,
        0,
        23,
        59,
        59
    ).getTime();
    return data.filter((item) => beginTime <= item.createdDate && item.createdDate <= endTime);
};

const Home = () => {

    usePageTitle("Emotion Diary");
    const data = useContext(DiaryStateContext);
    console.log(data);
    const [pivotDate, setPivotDate] = useState(new Date());

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    }
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    }

    const monthlyData = getMonthlyData(pivotDate, data);
    console.log(monthlyData);
    return (
        <div>
            <Header
                title={`${pivotDate.getFullYear()} - ${Getmonth(pivotDate.getMonth() + 1)}`}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>} />
            <DiaryList data={monthlyData} />
       </div>
    )
}

export default Home;
