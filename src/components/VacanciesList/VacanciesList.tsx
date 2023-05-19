import {Vacancy} from "../Vacancy/Vacancy";
import {getVacancies, setPageNumber, VacancyAppType} from "../../bll/vacancies-reducer";
import {Center, Container, Flex, Pagination} from "@mantine/core";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {useEffect} from "react";


export const VacanciesList = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    useEffect(() => {
        debugger
        dispatch(getVacancies())
    }, [dispatch])

    const vacancies = useSelector<StoreType, VacancyAppType[]>(state => state.vacancies.vacancies)
    const totalCount = useSelector<StoreType, number>(state => state.vacancies.totalCount)
    const pageNumber = useSelector<StoreType, number>(state => state.vacancies.pageNumber)
    const vacanciesAmount = useSelector<StoreType, number>(state => state.vacancies.vacanciesAmount)

    const changePageNumber = (value: number) => {
        dispatch(setPageNumber(value))
        dispatch(getVacancies())
    }

    let pageCount = totalCount / vacanciesAmount;

    if (totalCount > 500) {
        pageCount = 125
    }

    return (
        <Container p={0}>
            <Flex direction="column" gap="16px" align={"stretch"}>
                {vacancies.map(item => {
                    return <Vacancy key={item.id} vacancyData={item}/>
                })}
            </Flex>
            <Center mt="40px">
                <Pagination value={pageNumber} onChange={changePageNumber} total={pageCount}/>
            </Center>
        </Container>
    )
}