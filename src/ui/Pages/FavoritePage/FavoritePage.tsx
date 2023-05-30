import {Box, Center, Container, Flex} from '@mantine/core';
import {useCallback, useEffect} from 'react';
import {setPageNumber} from '../../../bll/vacancies/vacancies-reducer';
import {Vacancy} from '../../components/Vacancy/Vacancy';
import {VacancyPagination} from '../../components/VacancyPagination/VacancyPagination';
import {EmptyFavoritePage} from './EmptyFavoritePage';
import {CircleLoader} from '../../components/common/Loaders/CircleLoader';
import {StatusType, VacancyAppType } from '../../../bll/vacancies/vacancies-reducer-types';
import { getVacanciesFromLS } from '../../../bll/vacancies/vacancies-reducer-thunks';
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../../bll/store';

export const FavoritePage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const status = useAppSelector<StatusType>(state => state.vacancies.vacanciesEntityStatus)
    const vacancies = useAppSelector<VacancyAppType[]>(state => state.vacancies.vacancies)


    useEffect(() => {
        dispatch(setPageNumber(1))
        dispatch(getVacanciesFromLS())
    }, [dispatch])

    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacanciesFromLS())
    }, [dispatch])

    const deleteCallback = useCallback(() => {
        dispatch(getVacanciesFromLS())
    }, [dispatch])


    const navigateToVacancyPage = useCallback((id: number) => {
        navigate(`/vacancies/${id}`)
    }, [navigate])

    return (
        <>
            {status === 'loading' ? <CircleLoader/>
                : vacancies.length ? <Container size="1200px" p={0}>
                        <Flex direction="column" gap="16px" align="stretch">
                            {vacancies.map(item => {
                                return  (
                                    <Box key={item.id} onClick={() => navigateToVacancyPage(item.id)}>
                                        <Vacancy
                                            deleteFromFavoriteCallback={deleteCallback}
                                            key={item.id}
                                            vacancyData={item}
                                        />
                                    </Box>
                                )
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