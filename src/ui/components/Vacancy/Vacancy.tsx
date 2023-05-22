import {Flex, Paper, Title} from "@mantine/core";
import styles from './Vacancy.module.css'
import {FavoriteButton} from "../common/FavoriteButton/FavoriteButton";
import {DotsLoader} from "../common/Loaders/DotsLoader";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../../bll/store";
import {AnyAction} from "redux";
import { LocationIcon } from "../../../assets/icons/LocationIcon";
import { VacancyAppType } from "../../../bll/vacancies/vacancies-reducer-types";
import { addToFavorite, deleteFromFavorite } from "../../../bll/vacancies/vacancies-reducer-thunks";

export type VacancyPropsType = {
    vacancyData: VacancyAppType
    deleteFromFavoriteCallback?: () => void
}

export const Vacancy = (props: VacancyPropsType) => {

    const {
        vacancyData,
        deleteFromFavoriteCallback,
    } = props

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    const navigate = useNavigate()

    const navigateToVacancyPage = () => {
        navigate(`/vacancies/${vacancyData.id}`)
    }

    const addCallback = () => {
        dispatch(addToFavorite(vacancyData.id))
    }

    const deleteCallback = () => {
        dispatch(deleteFromFavorite(vacancyData.id))
        deleteFromFavoriteCallback && deleteFromFavoriteCallback()
    }

    const salary = vacancyData.payment_to && vacancyData.payment_from ?
        `з/п ${vacancyData.payment_from}—${vacancyData.payment_to}`
        : vacancyData.payment_from ? `з/п от ${vacancyData.payment_from}`
            : vacancyData.payment_to ? `з/п до ${vacancyData.payment_to}`
                : vacancyData.agreement ? `з/п по договоренности`
                    : `з/п не указана`

    return (
        <Paper withBorder radius={12} data-elem={`vacancy-${vacancyData.id}`} w={'100%'} onClick={navigateToVacancyPage} p='24px' className={styles.wrapper}>

            {
                vacancyData ? <Flex justify='space-between'>
                    <div className={styles.content}>
                        <Title order={3}>{vacancyData.profession}</Title>
                        <Flex className={styles.conditions} gap='12px' align='center'>
                            <p className={styles.salary}>{salary}</p>
                            <p className={styles.circle}>•</p>
                            <p>{vacancyData.type_of_work.title}</p>
                        </Flex>
                        <Flex align='center' gap='8px'><LocationIcon/><p>{vacancyData.town.title}</p></Flex>
                    </div>
                    <FavoriteButton
                        dataElem={`vacancy-${vacancyData.id}`}
                        isFavorite={vacancyData.favoriteInApp}
                        addCallback={addCallback}
                        deleteCallback={deleteCallback}
                    />
                </Flex> : <DotsLoader/>
            }
        </Paper>
    )
}