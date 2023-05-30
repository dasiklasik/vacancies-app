import {VacancyAppType} from "../bll/vacancies/vacancies-reducer-types";

export const getSalaryString = (vacancyData: VacancyAppType) => {
    if (vacancyData.payment_to && vacancyData.payment_from) {
        return `з/п ${vacancyData.payment_from}—${vacancyData.payment_to} ${vacancyData.currency}`
    } else if (vacancyData.payment_from) {
        return `з/п от ${vacancyData.payment_from} ${vacancyData.currency}`
    } else if (vacancyData.payment_to) {
        return `з/п до ${vacancyData.payment_to} ${vacancyData.currency}`
    } else if (vacancyData.agreement) {
return `з/п по договоренности`
    } else {
        return `з/п не указана`
    }
}