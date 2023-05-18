import {Container, Flex} from "@mantine/core";
import {StarIcon} from "../Icons/StarIcon";
import styles from './Vacancy.module.css'
import {LocationIcon} from "../Icons/LocationIcon";

export const Vacancy = () => {
    return (
        <Container px='24px' pt='24px' pb='24px' className={styles.wrapper}>
            <Flex justify='space-between'>
                <div className={styles.content}>
                    <h3>Менеджер-дизайнер</h3>
                    <Flex className={styles.conditions} gap='12px' align='center'>
                        <p className={styles.salary}>з/п от 70000 rub</p>
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