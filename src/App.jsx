
import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useReducer, useRef, useContext, createContext, useEffect, useState } from 'react'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from './pages/Edit'
import Notfound from './pages/Notfound'
import { getEmotionImage } from './util/get-emotion-img.js'
import Button from './components/Button'
import Header from './components/Header'

function reducer(state, action) {

  let nextState;

  switch (action.type) {
    case 'init':
      return action.data;
    
    case 'create':
      {
        nextState = [action.data, ...state];
        break;
      }
    case 'update': {
      nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
      break;
    }
    case 'delete': {
      nextState = state.filter((item) => String(item.id) !== String(action.data.id));
      break;
    }
      
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  
  const [data, dispatch] = useReducer(reducer, []);
  const [isLoading, setisLoading] = useState(true);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    console.log(storedData);
    // 만약 undefined가 들어있다면 parse 호출 시 오류
    if (!storedData) {
      setisLoading(false);
      const defaultData = [
      { id: 1, createdDate: new Date(), emotionId: 4, content: 'happy day!' },
    ];
    localStorage.setItem("diary", JSON.stringify(defaultData));
    dispatch({
      type: "init",
      data: defaultData,
    });
    return;
    }
    const parsedData = JSON.parse(storedData);

    if (!Array.isArray(parsedData)) {
      setisLoading(false);
      return;
    }

    let maxId = 0;

    parsedData.forEach((item) => {
      // storage에서 꺼내온 아이템은 문자 형태
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
  }
})    
    idRef.current = maxId + 1;
    dispatch({
      type: "init",
      data: 
        parsedData,
    });
    setisLoading(false);
  }, []);

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "create",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "update",
      data: {
      id,
      createdDate,
      emotionId,
      content,
      }
    })
  }
  const onDelete = (id) => {
    dispatch({
      type:"delete",
      data: {
        id,
      }
      
    })
  }

  if (isLoading) {
    return <div>데이터 로딩중...</div>
  }
  return (
    <>
      
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete,
        }}>
        <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/new' element={<New />} />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='/edit/:id' element={<Edit />} />
    <Route path='*' element={<Notfound />} />
          </Routes>
          </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    </>
  )
}

export default App
