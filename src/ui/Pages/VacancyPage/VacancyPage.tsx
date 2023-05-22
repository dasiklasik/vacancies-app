import {Container, Paper} from "@mantine/core";
import {Vacancy} from "../../components/Vacancy/Vacancy";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../bll/store";
import HTMLReactParser from "html-react-parser";
import {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import { VacancyAppType } from "../../../bll/vacancies/vacancies-reducer-types";
import { getOneVacancy } from "../../../bll/vacancies/vacancies-reducer-thunks";

export const VacancyPage = () => {

    const param = useParams()
    const id = Number(param.id)

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    const vacancyData = useSelector<StoreType, VacancyAppType>(state => state.vacancies.vacancies
        .filter(item => item.id === id)[0])

    useEffect(() => {
        //проверяем, если вакансия в state и запрашиваем, если нет
        if (!vacancyData) {
            dispatch(getOneVacancy(id))
        }
    }, [vacancyData, dispatch, id])

    const desc = HTMLReactParser(vacancyData.vacancyRichText)

    return (
        <Container size={'1116px'} p={0}>
            <Vacancy vacancyData={vacancyData}/>
            <Paper p={24} mt={20} withBorder radius={12} w={'100%'}>
                {desc}
            </Paper>
        </Container>
    )
}