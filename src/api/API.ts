import axios from "axios";

const headers = {
    'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
    'x-api-app-id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    'Authorization': '',
}

const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
    withCredentials: true,
    headers,
})

export const API = {
    getAccessToken: () => {
        return instance.get('oauth2/password/?login=sergei.stralenia@gmail.com&password=paralect123&client_id=2356&client_secret=v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948&hr=0')
    },
    fetchVacancies: (token: string | null) => {
        headers.Authorization = `Bearer ${token}`
        return instance.get<ResponseType>('vacancies', {headers})
    }
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
}

type ResponseType = {
    more: boolean
    objects: VacancyType[]
    total: number
}