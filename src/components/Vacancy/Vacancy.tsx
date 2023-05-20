import {Container, Flex} from "@mantine/core";
import styles from './Vacancy.module.css'
import {LocationIcon} from "../Icons/LocationIcon";
import { VacancyAppType} from "../../bll/vacancies-reducer";
import {FavoriteButton} from "../FavoriteButton/FavoriteButton";
import {DotsLoader} from "../Loaders/DotsLoader";

export type VacancyPropsType = {
    vacancyData: VacancyAppType
    deleteCallback: (id: number) => void
    addCallback: (id: number) => void
}

export const Vacancy = (props: VacancyPropsType) => {

    const {
        vacancyData,
        deleteCallback,
        addCallback,
    } = props


    return (
        <Container px='24px' pt='24px' pb='24px' className={styles.wrapper}>

            {
                vacancyData ? <Flex justify='space-between'>
                    <div className={styles.content}>
                        <h3>{vacancyData.profession}</h3>
                        <Flex className={styles.conditions} gap='12px' align='center'>
                            <p className={styles.salary}>{`з/п от ${vacancyData.payment_from} ${vacancyData.currency}`}</p>
                            <p className={styles.circle}>•</p>
                            <p>{vacancyData.type_of_work.title}</p>
                        </Flex>
                        <Flex align='center' gap='8px'><LocationIcon/><p>{vacancyData.town.title}</p></Flex>
                    </div>
                    <FavoriteButton
                        isFavorite={vacancyData.favoriteInApp}
                        id={vacancyData.id}
                        addCallback={addCallback}
                        deleteCallback={deleteCallback}
                    />
                </Flex> : <DotsLoader/>
            }
        </Container>
    )
}