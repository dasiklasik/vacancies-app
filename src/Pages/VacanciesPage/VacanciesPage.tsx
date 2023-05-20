import {Box, Center, Container, Flex} from "@mantine/core";
import {SearchField} from "../../common/SearchField/SearchField";
import {FilterBlock} from "../../components/FilterBlock/FilterBlock";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {useCallback, useEffect} from "react";
import {
    getVacancies, setKeyword,
    StatusType,
    VacancyAppType
} from "../../bll/vacancies-reducer";
import {VacancyPagination} from "../../components/VacancyPagination/VacancyPagination";
import {Vacancy} from "../../components/Vacancy/Vacancy";
import { DotsLoader } from "../../common/Loaders/DotsLoader";
import {EmptyVacanciesPage} from "./EmptyVacanciesPage";
import styles from './VacanciesPage.module.css'

export const VacanciesPage = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    useEffect(() => {
        dispatch(getVacancies())
    }, [dispatch])

    const vacancies = useSelector<StoreType, VacancyAppType[]>(state => state.vacancies.vacancies)
    const status = useSelector<StoreType, StatusType>(state => state.vacancies.vacanciesEntityStatus)

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacancies())
    }, [dispatch])

    const searchKeyword = (value: string) => {
        dispatch(setKeyword(value))
        dispatch(getVacancies())
    }

    return (
        <Container p={"0px"} className={styles.wrapper}>
            <Flex gap="28px" className={styles.flexWrapper}>
                <Container className={styles.filter}  p={0} w={315}>
                    <FilterBlock/>
                </Container>
                <Box w={773} className={styles.secondColumn}>
                    <SearchField callback={searchKeyword}/>
                    {status === 'loading' ? <DotsLoader/>
                        : vacancies.length === 0 ? <EmptyVacanciesPage/>
                            :<Box>
                                <Flex direction="column" gap="16px" align={"stretch"}>
                                    {vacancies.map(item => {
                                        return <Vacancy key={item.id} vacancyData={item}/>
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