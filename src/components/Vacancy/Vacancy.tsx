import {Container, Flex} from "@mantine/core";
import {StarIcon} from "../Icons/StarIcon";
import styles from './Vacancy.module.css'
import {LocationIcon} from "../Icons/LocationIcon";
import {VacancyAppType} from "../../bll/vacancies-reducer";

type VacancyPropsType = {
    vacancyData: VacancyAppType
}

export const Vacancy = ({vacancyData, ...props}: VacancyPropsType) => {
    return (
        <Container px='24px' pt='24px' pb='24px' className={styles.wrapper}>
            <Flex justify='space-between'>
                <div className={styles.content}>
                    <h3>{vacancyData.profession}</h3>
                    <Flex className={styles.conditions} gap='12px' align='center'>
                        <p className={styles.salary}>{`з/п от ${vacancyData.payment_from} ${vacancyData.currency}`}</p>
                        <p className={styles.circle}>•</p>
                        <p>Полный рабочий день</p>
                    </Flex>
                    <Flex align='center' gap='8px'><LocationIcon/><p>Новый Уренгой</p></Flex>
                </div>
                <StarIcon filled={false}/>
            </Flex>
        </Container>
    )
}