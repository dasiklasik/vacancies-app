import {Container} from "@mantine/core";
import {VacanciesList} from "../VacanciesList/VacanciesList";

import {SearchField} from "../SearchField/SearchField";

export const VacanciesPage = () => {


    return (
        <Container>
            <SearchField/>
            <VacanciesList/>
        </Container>
    )
}