import axios from "axios";

const headers = {
    'x-secret-key': process.env.REACT_APP_X_SECRET_KEY,
    'x-api-app-id': process.env.REACT_APP_CLIENT_SECRET,
}

const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
    withCredentials: true,
    headers,
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const API = {
    getAccessToken: () => {
        const params = {
            login: process.env.REACT_APP_LOGIN,
            password: process.env.REACT_APP_PASSWORD,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            hr: 0,
        }
         return instance.get('oauth2/password/', {params, headers})
    },
    refreshToken: (refreshToken: string) => {
        const params = {
            refresh_token: refreshToken,
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
        }
        return instance.get('oauth2/refresh_token/', {params, headers})
    },
    fetchVacancies: (requestData: FetchVacanciesRequestDataType, vacanciesAmount: number) => {
        let requestString = `vacancies/?count=${vacanciesAmount}`
        Object.entries(requestData).forEach((item) => {
            if(item[1]) {
                requestString += `&${item[0]}=${item[1]}`
            }
        })
        return instance.get<ResponseType>(requestString)
    },
    getCatalogues: () => {
        return instance.get<CatalogueType[]>('catalogues')
    },
    getVacanciesByIds: (ids: number[], vacanciesAmount: number) => {
        let requestString = `vacancies/?count=${vacanciesAmount}`
        ids.forEach(item => {
            requestString += `&ids[]=${item}`
        })
        return instance.get<ResponseType>(requestString)
    },
    getOneVacancy: (id: number) => {
        return instance.get<VacancyType>(`vacancies/${id}`)
    }
}

type FetchVacanciesRequestDataType = {
    page: number
    keyword: string | null
    payment_from: number | undefined
    payment_to: number | undefined
    catalogues: number | null
    no_agreement: 1 | null
}

export type VacancyType = {
    id: number
    profession: string
    id_client: number
    date_pub_to: number
    date_archived: number
    date_published: number
    work: string
    compensation: string
    address: string
    candidat: string
    town: {id: number, title: string, declension: string, genitive: string, hasMetro?: boolean}
    type_of_work: {id: number, title: string}
    place_of_work: {id: number, title: string}
    education: {id: number, title: string}
    agency: {id: number, title: string}
    experience: {id: number, title: string}
    maritalstatus: {id: number, title: string}
    children: {id: number, title: string}
    languages: [{id: number, title: string}, {id: number, title: string}][]
    catalogues: Array<{id: number, key: number, title: string, positions: Array<{id: number, key: number, title: string}>}>
    is_archive: boolean
    is_storage: boolean
    contact: string
    email: string
    url: string
    phone: string
    fax: string
    already_sent_on_vacancy: boolean
    favorite: boolean
    driving_licence: string[]
    metro: Array<{id: number, title: string, id_metro_line: number}>
    agreement: boolean
    payment_from: number
    payment_to: number
    currency: 'rub' | 'uah' | 'uzs'
    moveable: boolean
    gender: {id: number, title: string}
    age_from: number
    age_to: number
    firm_name: string
    firm_activity: string
    client_logo: string
    link: string
    views_count: number
    resumes_all: number
    resumes_new: number
    canEdit: boolean
    vacancyRichText: string
}

export type CatalogueType = {
    title_rus: string
    url_rus: string
    title: string
    title_trimmed: string
    key: number
    positions: Array<{title_rus: string, url_rus: string, title: string, id_parent: number, key: number}>
}

type ResponseType = {
    more: boolean
    objects: VacancyType[]
    total: number
}