import {
    getVacancies,
    InitialStateType,
    setFilterValues,
    setKeyword,
    setPageNumber,
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
}

beforeEach(() => {
    initialState = {
        totalCount: 0,
        vacancies: [],
        keyword: '',
        pageNumber: 1,
        catalogues: [],
        cataloguesItem: null,
        salary: {
            min: 0,
            max: 0,
        },
    }
})

test('vacancies reducer should set list of vacancies', () => {
    const vacanciesArray = [
        {
            id: 20,
            profession: 'string',
            id_client: 2,
            date_pub_to: 2,
            date_archived: 2,
            date_published: 2,
            work: 'string',
            compensation: 'string',
            address: 'string',
            candidat: 'string',
            town: {id: 3, title: 'string', declension: 'string', genitive: 'string', hasMetro: false},
            type_of_work: {id: 0, title: 'string'},
            place_of_work: {id: 3, title: 'string'},
            education: {id: 3, title: 'string'},
            agency: {id: 3, title: 'string'},
            experience: {id: 3, title: 'string'},
            maritalstatus: {id: 3, title: 'string'},
            children: {id: 3, title: 'string'},
            languages: [],
            catalogues: [{
                id: 3,
                key: 3,
                title: 'string',
                positions: [
                    {id: 3, key: 3, title: 'string'}
                ]
            }
            ],
            is_archive: false,
            is_storage: false,
            contact: 'string',
            email: 'string',
            url: 'string',
            phone: 'string',
            fax: 'string',
            already_sent_on_vacancy: false,
            favorite: false,
            driving_licence: ['A'],
            metro: [{id: 3, title: 'string', id_metro_line: 2}],
            agreement: false,
            payment_from: 2,
            payment_to: 2,
            currency: 'rub' as const,
            moveable: false,
            gender: {id: 3, title: 'string'},
            age_from: 4,
            age_to: 4,
            firm_name: '',
            firm_activity: '',
            client_logo: 'string',
            link: 'string',
            views_count: 3,
            resumes_all: 3,
            resumes_new: 3,
            canEdit: false,
            favoriteInApp: false,
        }
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