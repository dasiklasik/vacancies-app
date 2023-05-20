import {Center, Container, Flex} from "@mantine/core";
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";
import {
    addToFavorite,
    clearState,
    deleteFromFavorite,
    getVacanciesIdFromLS,
} from "../../bll/vacancies-reducer";
import {Vacancy} from "../Vacancy/Vacancy";
import {VacancyPagination} from "../VacancyPagination/VacancyPagination";
import {VacancyWithFetchingData} from "../VacancyWithFetchingData/VacancyWithFetchingData";
import {EmptyFavoritePage} from "./EmptyFavoritePage";

export const FavoritePage = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const vacanciesId = useSelector<StoreType, number[]>(state => state.vacancies.vacanciesIdFromLS)


    useEffect(() => {
        dispatch(getVacanciesIdFromLS())

        return () => {
            dispatch(clearState())
        }
    }, [dispatch])

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacanciesIdFromLS())
    }, [dispatch])

    const addCallback = (id: number) => {
        dispatch(addToFavorite(id))
        dispatch(getVacanciesIdFromLS())
    }

    const deleteCallback = (id: number) => {
        dispatch(deleteFromFavorite(id))
        dispatch(getVacanciesIdFromLS())
    }

debugger
    return (
        <>
            {vacanciesId.length ? <Container size={'1200px'} p={0}>
                    <Flex direction="column" gap="16px" align={"stretch"}>
                        {vacanciesId.map(item => {
                            return <VacancyWithFetchingData
                                deleteCallback={deleteCallback}
                                addCallback={addCallback}
                                key={item}
                                id={item}
                                Component={Vacancy}
                            />
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