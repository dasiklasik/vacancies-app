import {Center, Container, Flex} from "@mantine/core";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {
    getVacanciesFromLS, VacancyAppType,
} from "../../bll/vacancies-reducer";
import {Vacancy} from "../Vacancy/Vacancy";
import {VacancyPagination} from "../VacancyPagination/VacancyPagination";
import {EmptyFavoritePage} from "./EmptyFavoritePage";

export const FavoritePage = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()


    useEffect(() => {
        dispatch(getVacanciesFromLS())
    }, [dispatch])

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacanciesFromLS())
    }, [dispatch])

    const vacancies = useSelector<StoreType, VacancyAppType[]>(state => state.vacancies.vacancies)

debugger
    return (
        <>
            {vacancies.length ? <Container size={'1200px'} p={0}>
                    <Flex direction="column" gap="16px" align={"stretch"}>
                        {vacancies.map(item => {
                            return <Vacancy vacancyData={item}/>
                        })}
                    </Flex>
                    <Center mt="40px">
                        <VacancyPagination callback={onPaginationChangeCallback}/>
                    </Center>
                </Container>
                : <EmptyFavoritePage/>
            }
        </>
    )
}