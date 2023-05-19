import {Button, Container, Input} from "@mantine/core";
import {VacanciesList} from "../VacanciesList/VacanciesList";
import {SearchIcon} from "../Icons/SearchIcon";
import styles from './VacanciesPage.module.css'

export const VacanciesPage = () => {


    return (
        <Container>
            <Container className={styles.search}>
                <Input icon={<SearchIcon/>} size={"lg"}/>
                <Button className={styles.search__button}>Поиск</Button>
            </Container>
            <VacanciesList/>
        </Container>
    )
}