import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {getOneVacancy, VacancyAppType} from "../../bll/vacancies-reducer";

type VacancyWithFetchingDataPropsType = {
    id: number
    Component: (props: {vacancyData: VacancyAppType}) => JSX.Element
}

export const VacancyWithFetchingData = ({id, Component, ...props}: VacancyWithFetchingDataPropsType) => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    useEffect(() => {
        debugger
        dispatch(getOneVacancy(id))
    }, [dispatch, id])

    const vacancyData = useSelector<StoreType, VacancyAppType>(state => state.vacancies.vacancies
        .filter(item => item.id === id)[0])


    return (
        <Component vacancyData={vacancyData}/>
    )
}