import {Container, Flex} from "@mantine/core";
import styles from './Vacancy.module.css'
import {LocationIcon} from "../Icons/LocationIcon";
import {addToFavorite, deleteFromFavorite, VacancyAppType} from "../../bll/vacancies-reducer";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";
import {DotsLoader} from "../Loaders/DotsLoader";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {StoreType} from "../../bll/store";
import {AnyAction} from "redux";

export type VacancyPropsType = {
    vacancyData: VacancyAppType
}

export const Vacancy = (props: VacancyPropsType) => {

    const {
        vacancyData,
    } = props

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    const navigate = useNavigate()

    const navigateToVacancyPage = () => {
        navigate(`/vacancies/${vacancyData.id}`)
    }

    const addCallback = () => {
        dispatch(addToFavorite({...vacancyData, favoriteInApp: true}))
    }

    const deleteCallback = () => {
        dispatch(deleteFromFavorite({...vacancyData, favoriteInApp: false}))
    }

    return (
        <Container size={'100%'} onClick={navigateToVacancyPage} px='24px' py='24px' className={styles.wrapper}>

            {
                vacancyData ? <Flex justify='space-between'>
                    <div className={styles.content}>
                        <h3>{vacancyData.profession}</h3>
                        <Flex className={styles.conditions} gap='12px' align='center'>
                            <p className={styles.salary}>{`з/п от ${vacancyData.payment_from} ${vacancyData.currency}`}</p>
                            <p className={styles.circle}>•</p>
                            <p>{vacancyData.type_of_work}</p>
                        </Flex>
                        <Flex align='center' gap='8px'><LocationIcon/><p>{vacancyData.town}</p></Flex>
                    </div>
                    <FavoriteButton
                        isFavorite={vacancyData.favoriteInApp}
                        addCallback={addCallback}
                        deleteCallback={deleteCallback}
                    />
                </Flex> : <DotsLoader/>
            }
        </Container>
    )
}