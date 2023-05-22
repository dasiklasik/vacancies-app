import {Box, Center, Container, Flex} from '@mantine/core';
import {SearchField} from '../../components/common/SearchField/SearchField';
import {FilterBlock} from '../../components/FilterBlock/FilterBlock';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {useCallback, useEffect, useState} from 'react';
import {VacancyPagination} from '../../components/VacancyPagination/VacancyPagination';
import {Vacancy} from '../../components/Vacancy/Vacancy';
import {DotsLoader} from '../../components/common/Loaders/DotsLoader';
import {EmptyVacanciesPage} from './EmptyVacanciesPage';
import styles from './VacanciesPage.module.css'
import {getVacancies} from '../../../bll/vacancies/vacancies-reducer-thunks';
import {StatusType, VacancyAppType} from '../../../bll/vacancies/vacancies-reducer-types';
import {setFilterValues} from '../../../bll/vacancies/vacancies-reducer';
import {useNavigate} from "react-router-dom";

export const VacanciesPage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const vacancies = useAppSelector<VacancyAppType[]>(state => state.vacancies.vacancies)
    const status = useAppSelector<StatusType>(state => state.vacancies.vacanciesEntityStatus)

    const [inputValue, setInputValue] = useState('')
    const [minValue, setMinValue] = useState<number | ''>('')
    const [maxValue, setMaxValue] = useState<number | ''>('')
    const [selectValue, setSelectValue] = useState('')

    useEffect(() => {
        dispatch(getVacancies())
    }, [dispatch])


    const onPaginationChangeCallback = useCallback(() => {
        dispatch(getVacancies())
    }, [dispatch])

    const filterVacancies = () => {
        const min = typeof minValue !== 'string' ? minValue : undefined
        const max = typeof maxValue !== 'string' ? maxValue : undefined
        dispatch(setFilterValues({min, max, catalogues: +selectValue, keyword: inputValue}))
        dispatch(getVacancies())
    }

    const resetValues = () => {
        dispatch(setFilterValues({min: undefined, max: undefined, catalogues: 0, keyword: null}))
        setSelectValue('')
        setMinValue('')
        setMaxValue('')
        setInputValue('')
        dispatch(getVacancies())
    }

    const navigateToVacancyPage = (id: number) => {
        navigate(`/vacancies/${id}`)
    }

    return (
        <Container p="0px" className={styles.wrapper}>
            <Flex gap="28px" className={styles.flexWrapper}>
                <Container className={styles.filter} p={0} w={315}>
                    <FilterBlock
                        maxValue={maxValue}
                        minValue={minValue}
                        changeMinValue={setMinValue}
                        changeMaxValue={setMaxValue}
                        changeSelectValue={setSelectValue}
                        selectValue={selectValue}
                        submitFilter={filterVacancies}
                        resetValues={resetValues}
                    />
                </Container>
                <Box w={773} className={styles.secondColumn}>
                    <SearchField
                        value={inputValue}
                        onChange={setInputValue}
                        callback={filterVacancies}
                    />
                    {status === 'loading' ? <DotsLoader/>
                        : vacancies.length === 0 ? <EmptyVacanciesPage/>
                            : <Box>
                                <Flex direction="column" gap="16px" align="stretch">
                                    {vacancies.map(item => {
                                        return (
                                            <Box onClick={() => navigateToVacancyPage(item.id)}>
                                                <Vacancy key={item.id} vacancyData={item}/>
                                            </Box>
                                        )
                                    })}
                                </Flex>
                                <Center mt="40px">
                                    <VacancyPagination callback={onPaginationChangeCallback}/>
                                </Center>
                            </Box>}
                </Box>
            </Flex>
        </Container>
    )
}