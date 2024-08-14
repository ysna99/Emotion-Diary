import './EmotionItem.css'
import { getEmotionImage } from '../util/get-emotion-img.js';
const EmotionItem = ({emotionId, emotionName, isselected, onClick}) => {
    return <div onClick={onClick}
        className={`EmotionItem ${isselected ? `Emotion_on_${emotionId}` : ""}`}>
        <img className='emotion_img' src={getEmotionImage(emotionId)} />
        <div className='emotion_name'>{emotionName}</div>
    </div>
}

export default EmotionItem;