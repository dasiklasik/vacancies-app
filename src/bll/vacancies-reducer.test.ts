import {
    addToFavorite, deleteFromFavorite,
    getCatalogues,
    getVacancies,
    InitialStateType,
    setFilterValues,
    setKeyword,
    setPageNumber, setVacanciesStatus,
    vacanciesReducer
} from "./vacancies-reducer";

let initialState: InitialStateType = {
    totalCount: 0,
    vacancies: [],
    keyword: '',
    pageNumber: 1,
    catalogues: [],
    cataloguesItem: null as null | number,
    salary: {
        min: 0,
        max: 0,
    },
    vacanciesAmount: 0,
    vacanciesEntityStatus: 'idle',
    no_agreement: 1
}

beforeEach(() => {
    initialState = {
        totalCount: 0,
        vacancies: [
            {
                currency: "",
                descriptionText: "",
                favoriteInApp: false,
                firm_name: "",
                id: 20,
                payment_from: 0,
                payment_to: 0,
                profession: "",
                town: "",
                type_of_work: ""
            },
            {
                currency: "",
                descriptionText: "",
                favoriteInApp: true,
                firm_name: "",
                id: 20,
                payment_from: 0,
                payment_to: 0,
                profession: "",
                town: "",
                type_of_work: ""
            }
        ],
        keyword: '',
        pageNumber: 1,
        catalogues: [],
        cataloguesItem: null,
        salary: {
            min: 0,
            max: 0,
        },
        vacanciesAmount: 0,
        vacanciesEntityStatus: 'idle',
        no_agreement: 1
    }
})

test('vacancies reducer should set list of vacancies', () => {
    const vacanciesArray = [
        {
            currency: "",
            descriptionText: "",
            favoriteInApp: false,
            firm_name: "",
            id: 20,
            payment_from: 0,
            payment_to: 0,
            profession: "",
            town: "",
            type_of_work: ""
        },
    ]

    const response = {
        more: false,
        objects: vacanciesArray,
        total: 300,
    }

    const action = getVacancies.fulfilled(response, '')
    const endState = vacanciesReducer(initialState, action)

    expect(endState.vacancies.length).toBe(1)
    expect(endState.vacancies[0].id).toBe(20)
    expect(endState.totalCount).toBe(300)
})

test('vacancies reducer should set total number', () => {
    const action = setPageNumber(3)
    const endState = vacanciesReducer(initialState, action)

    expect(endState.pageNumber).toBe(3)
})

test('vacancies reducer should set keyword', () => {
    const keyword = 'manager'
    const action = setKeyword(keyword)
    const endState = vacanciesReducer(initialState, action)

    expect(endState.keyword).toBe(keyword)
})

test('vacancies reducer should set filter values', () => {
    const selectValue = 33
    const min = 20
    const max = 40

    const action = setFilterValues({min, max, catalogues: selectValue})
    const endState = vacanciesReducer(initialState, action)

    expect(endState.salary.min).toBe(20)
    expect(endState.salary.max).toBe(40)
    expect(endState.cataloguesItem).toBe(33)
})

test('vacancies reducer should set catalogues', () => {
    const catalogues = [
        {
            title_rus: 'string',
            url_rus: 'string',
            title: 'string',
            title_trimmed: 'string',
            key: 22,
            positions: []
        }
    ]

    const action = getCatalogues.fulfilled(catalogues, '')
    const endState = vacanciesReducer(initialState, action)

    expect(endState.catalogues.length).toBe(1)
})

test('vacancies reducer should add to favorite', () => {
    // const action = addToFavorite.fulfilled(20, '', {})
    // const endState = vacanciesReducer(initialState, action)
    //
    // expect(endState.vacancies[0].favoriteInApp).toBe(true)
})

test('vacancies reducer should remove from favorite', () => {
    // const action = deleteFromFavorite.fulfilled(21, '', 21)
    // const endState = vacanciesReducer(initialState, action)
    //
    // expect(endState.vacancies[1].favoriteInApp).toBe(false)
})

test('vacancies reducer should set entity status', () => {
    const action1 = setVacanciesStatus('loading')
    const endState1 = vacanciesReducer(initialState, action1)

    expect(endState1.vacanciesEntityStatus).toBe('loading')

    const action2 = setVacanciesStatus('succeed')
    const endState2 = vacanciesReducer(initialState, action2)

    expect(endState2.vacanciesEntityStatus).toBe('succeed')

    const action3 = setVacanciesStatus('failed')
    const endState3 = vacanciesReducer(initialState, action3)

    expect(endState3.vacanciesEntityStatus).toBe('failed')
})