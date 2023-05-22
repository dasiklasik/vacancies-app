import {Pagination} from "@mantine/core";
import {clearVacancies, setPageNumber} from "../../../bll/vacancies/vacancies-reducer";
import {useAppDispatch, useAppSelector} from "../../../bll/store";
import React from "react";

type VacancyPaginationPropsType = {
    callback: () => void
}

export const VacancyPagination = React.memo(({callback, ...props}: VacancyPaginationPropsType) => {

    const dispatch = useAppDispatch()


    const pageNumber = useAppSelector<number>(state => state.vacancies.pageNumber)
    const totalCount = useAppSelector<number>(state => state.vacancies.totalCount)
    const vacanciesAmount = useAppSelector<number>(state => state.vacancies.vacanciesAmount)

    const changePageNumber = (value: number) => {
        dispatch(setPageNumber(value))
        dispatch(clearVacancies())
        callback()
    }

    let pageCount = Math.ceil(totalCount / vacanciesAmount)

    if (totalCount > 500) {
        pageCount = 125
    }

    return (
        <Pagination value={pageNumber} onChange={changePageNumber} total={pageCount}/>
    )
})