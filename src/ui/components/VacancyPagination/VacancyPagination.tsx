import {Pagination} from '@mantine/core';
import {clearVacancies, setPageNumber} from '../../../bll/vacancies/vacancies-reducer';
import React, {useCallback} from 'react';
import { useAppDispatch, useAppSelector } from '../../../bll/store';

type VacancyPaginationPropsType = {
    callback: () => void
}

export const VacancyPagination = React.memo(({callback, ...props}: VacancyPaginationPropsType) => {

    const dispatch = useAppDispatch()


    const pageNumber = useAppSelector<number>(state => state.vacancies.pageNumber)
    const totalCount = useAppSelector<number>(state => state.vacancies.totalCount)
    const vacanciesAmount = useAppSelector<number>(state => state.vacancies.vacanciesAmount)

    const changePageNumber = useCallback((value: number) => {
        dispatch(setPageNumber(value))
        dispatch(clearVacancies())
        callback()
    }, [dispatch, callback])

    let pageCount = Math.ceil(totalCount / vacanciesAmount)

    if (totalCount > 500) {
        pageCount = 125
    }

    return (
        <Pagination value={pageNumber} onChange={changePageNumber} total={pageCount}/>
    )
})