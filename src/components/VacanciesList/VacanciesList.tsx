import {Vacancy} from "../Vacancy/Vacancy";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../bll/store";
import {useEffect} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getVacancies, VacancyAppType} from "../../bll/vacancies-reducer";
import {Flex} from "@mantine/core";

export const VacanciesList = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const token = useSelector<StoreType, string | null>(state => state.auth.accessToken)

    useEffect(() => {
        dispatch(getVacancies(token))
    }, [])

    const vacancies = useSelector<StoreType, VacancyAppType[]>(state => state.vacancies)

    return (
        <Flex direction="column" gap="16px" align={"stretch"} >
            {vacancies.map(item => {
                return <Vacancy key={item.id} vacancyData={item}/>
            })}
        </Flex>
    )
}