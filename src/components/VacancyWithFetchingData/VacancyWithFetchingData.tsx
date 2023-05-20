import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {getOneVacancy, VacancyAppType} from "../../bll/vacancies-reducer";
import {VacancyPropsType} from "../Vacancy/Vacancy";

type VacancyWithFetchingDataPropsType = {
    id: number
    deleteCallback: (id: number) => void
    addCallback: (id: number) => void
    Component: (props: VacancyPropsType) => JSX.Element
}

export const VacancyWithFetchingData = (props: VacancyWithFetchingDataPropsType) => {

    const {
        id,
        Component,
        addCallback,
        deleteCallback,
    } = props

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    useEffect(() => {
        dispatch(getOneVacancy(id))
    }, [dispatch, id])

    const vacancyData = useSelector<StoreType, VacancyAppType>(state => state.vacancies.vacancies
        .filter(item => item.id === id)[0])


    return (
        <Component addCallback={addCallback} deleteCallback={deleteCallback} vacancyData={vacancyData}/>
    )
}