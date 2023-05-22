import {Pagination} from "@mantine/core";
import {clearVacancies, setPageNumber} from "../../../bll/vacancies/vacancies-reducer";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../bll/store";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import React from "react";

type VacancyPaginationPropsType = {
    callback: () => void
}

export const VacancyPagination = React.memo(({callback, ...props}: VacancyPaginationPropsType) => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()


    const pageNumber = useSelector<StoreType, number>(state => state.vacancies.pageNumber)
    const totalCount = useSelector<StoreType, number>(state => state.vacancies.totalCount)
    const vacanciesAmount = useSelector<StoreType, number>(state => state.vacancies.vacanciesAmount)

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