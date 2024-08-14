
const Getmonth = (target) => {
    if (Number(target) === 1) {
        return "January"
    }
    if(Number(target) === 2)
    {
        return "Febuary"
    }
    if (Number(target) === 3) {
        return "March"
    }

    if (Number(target) === 4) {
        return "April"
    }

    if (Number(target) === 5) {
        return "May"
    }
    if (Number(target) === 6) {
        return "June"
    }

    if (Number(target) === 7) {
        return "July"
    }

    if (Number(target) === 8) {
        return "August"
    }
    if (Number(target) === 9) {
        return "September"
    }
    if (Number(target) === 10) {
        return "october"
    }
    if (Number(target) === 11) {
        return "November"
    }
    if (Number(target) === 12) {
        return "December"
    }
}

export default Getmonth;