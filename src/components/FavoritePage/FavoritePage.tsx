import {Box, Center, Container, Flex} from "@mantine/core";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {
    clearState,
    getVacanciesIdFromLS, StatusType,
} from "../../bll/vacancies-reducer";
import {Vacancy} from "../Vacancy/Vacancy";
import {VacancyPagination} from "../VacancyPagination/VacancyPagination";
import {VacancyWithFetchingData} from "../VacancyWithFetchingData/VacancyWithFetchingData";
import {CircleLoader} from "../Loaders/CircleLoader";

export const FavoritePage = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const vacanciesId = useSelector<StoreType, number[]>(state => state.vacancies.vacanciesIdFromLS)
    const status = useSelector<StoreType, StatusType>(state => state.vacancies.vacanciesEntityStatus)


    useEffect(() => {
        dispatch(getVacanciesIdFromLS())

        return () => {
            dispatch(clearState())
        }
    }, [dispatch])

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacanciesIdFromLS())
    }, [dispatch])


    return (
        <Container size={'1200px'} p={0}>
            <Flex direction="column" gap="16px" align={"stretch"}>
                {vacanciesId.map(item => {
                    return <VacancyWithFetchingData key={item} id={item} Component={Vacancy}/>
                })}
            </Flex>
            <Center mt="40px">
                <VacancyPagination callback={onPaginationChangeCallback}/>
            </Center>
        </Container>
    )
}