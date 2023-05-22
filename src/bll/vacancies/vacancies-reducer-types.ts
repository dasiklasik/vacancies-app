import {CatalogueType, VacancyType} from "../../api/API";

export type VacancyAppType = VacancyType & {
    favoriteInApp: boolean
}

export type InitialStateType = {
    totalCount: number
    pageNumber: number
    keyword: string | null
    cataloguesItem: null | number
    vacanciesAmount: number
    no_agreement: 1 | null
    salary: {
        min: number | undefined,
        max: number | undefined,
    },
    vacancies: Array<VacancyAppType>
    catalogues: Array<CatalogueType>
    vacanciesEntityStatus: StatusType
}

export type StatusType = 'idle' | 'loading' | 'succeed' | 'failed'

export type VacanciesFilterValues = {
    min: number | undefined
    max: number | undefined
    catalogues: number | null
    keyword: string | null
}