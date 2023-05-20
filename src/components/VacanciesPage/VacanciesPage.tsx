import {Box, Center, Container, Flex} from "@mantine/core";
import {SearchField} from "../SearchField/SearchField";
import {FilterBlock} from "../FilterBlock/FilterBlock";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {useCallback, useEffect} from "react";
import {
    addToFavorite,
    clearState, deleteFromFavorite,
    getVacancies,
    getVacanciesIdFromLS,
    StatusType,
    VacancyAppType
} from "../../bll/vacancies-reducer";
import {VacancyPagination} from "../VacancyPagination/VacancyPagination";
import {Vacancy} from "../Vacancy/Vacancy";
import { DotsLoader } from "../Loaders/DotsLoader";
import {EmptyVacanciesPage} from "./EmptyVacanciesPage";

export const VacanciesPage = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    useEffect(() => {
        debugger
        dispatch(getVacancies())

        return () => {
            dispatch(clearState())
        }
    }, [dispatch])

    const vacancies = useSelector<StoreType, VacancyAppType[]>(state => state.vacancies.vacancies)
    const status = useSelector<StoreType, StatusType>(state => state.vacancies.vacanciesEntityStatus)

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacancies())
    }, [dispatch])

    const addCallback = (id: number) => {
        dispatch(addToFavorite(id))
    }

    const deleteCallback = (id: number) => {
        dispatch(deleteFromFavorite(id))
    }


    return (
        <Container size={'1200px'} p={0}>
            <Flex gap="28px">
                <Container  p={0} w={315}>
                    <FilterBlock/>
                </Container>
                <Box w={773}>
                    <SearchField/>
                    {status === 'loading' ? <DotsLoader/>
                        : vacancies.length === 0 ? <EmptyVacanciesPage/>
                         :<Box>
                                <Flex direction="column" gap="16px" align={"stretch"}>
                                    {vacancies.map(item => {
                                        return <Vacancy deleteCallback={deleteCallback} addCallback={addCallback} key={item.id} vacancyData={item}/>
                                    })}
                                </Flex>
                                <Center mt="40px">
                                    <VacancyPagination callback={onPaginationChangeCallback}/>
                                </Center>
                            </Box> }
                </Box>
            </Flex>
        </Container>
    )
}