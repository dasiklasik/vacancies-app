import {Center, Container, Flex} from "@mantine/core";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {
    getVacanciesFromLS, setPageNumber, StatusType, VacancyAppType,
} from "../../bll/vacancies-reducer";
import {Vacancy} from "../../components/Vacancy/Vacancy";
import {VacancyPagination} from "../../components/VacancyPagination/VacancyPagination";
import {EmptyFavoritePage} from "./EmptyFavoritePage";
import {CircleLoader} from "../../common/Loaders/CircleLoader";

export const FavoritePage = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const status = useSelector<StoreType, StatusType>(state => state.vacancies.vacanciesEntityStatus)


    useEffect(() => {
        dispatch(setPageNumber(1))
        dispatch(getVacanciesFromLS())
    }, [dispatch])

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacanciesFromLS())
    }, [dispatch])

    const deleteCallback = () => {
        dispatch(getVacanciesFromLS())
    }

    const vacancies = useSelector<StoreType, VacancyAppType[]>(state => state.vacancies.vacancies)

    return (
        <>
            {status === 'loading' ? <CircleLoader/>
                : vacancies.length ? <Container size={'1200px'} p={0}>
                        <Flex direction="column" gap="16px" align={"stretch"}>
                            {vacancies.map(item => {
                                return <Vacancy deleteFromFavoriteCallback={deleteCallback} key={item.id} vacancyData={item}/>
                            })}
                        </Flex>
                        <Center mt="40px">
                            <VacancyPagination callback={onPaginationChangeCallback}/>
                        </Center>
                    </Container>
                    : <EmptyFavoritePage/>}

        </>
    )
}