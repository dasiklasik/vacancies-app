import {Container, Paper} from '@mantine/core';
import {Vacancy} from '../../components/Vacancy/Vacancy';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import HTMLReactParser from 'html-react-parser';
import {useEffect} from 'react';
import {VacancyAppType} from '../../../bll/vacancies/vacancies-reducer-types';
import {getOneVacancy} from '../../../bll/vacancies/vacancies-reducer-thunks';
import {CircleLoader} from '../../components/common/Loaders/CircleLoader';
import styles from './VacancyPage.module.css'

export const VacancyPage = () => {

    const param = useParams()
    const id = Number(param.id)

    const dispatch = useAppDispatch()

    debugger
    const vacancyData = useAppSelector<VacancyAppType>(state => state.vacancies.vacancies
        .filter(item => item.id === id)[0])

    useEffect(() => {
        debugger
        //проверяем, если вакансия в state и запрашиваем, если нет
        if (!vacancyData) {
            dispatch(getOneVacancy(id))
        }
    }, [vacancyData])

        let desc;
        if (vacancyData) {
            desc = HTMLReactParser(vacancyData?.vacancyRichText)
        }


debugger
    return (
        <>
            {vacancyData ? <Container size={'1116px'} p={0}>
                <Vacancy isVacancyPage={true} vacancyData={vacancyData}/>
                <Paper className={styles.desc} p={24} mt={20} withBorder radius={12} w={'100%'}>
                    {desc}
                </Paper>
            </Container> : <CircleLoader/>}
        </>
    )
}