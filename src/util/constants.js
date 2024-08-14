export const emotionList = [
    {
        emotionId: 1,
        emotionName: "awesome",
    },
    {
        emotionId: 2,
        emotionName: "good",
    },
    {
        emotionId: 3,
        emotionName: "not too bad",
    },
    {
        emotionId: 4,
        emotionName: "bad",
    },
    {
        emotionId: 5,
        emotionName: "horrible",
    }
]

export const getStringedData = (targetDate) => {
    let y = targetDate.getFullYear();
    let m = targetDate.getMonth() + 1;
    let d = targetDate.getDate();

    if (m < 10) {
        m = `0${m}`;
    }
    if (d < 10) {
        d = `0${d}`;
    }

    return `${y}-${m}-${d}`;
}