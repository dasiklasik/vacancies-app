import {Box, Container, Flex} from "@mantine/core";
import {VacanciesList} from "../VacanciesList/VacanciesList";

import {SearchField} from "../SearchField/SearchField";
import {FilterBlock} from "../FilterBlock/FilterBlock";

export const VacanciesPage = () => {


    return (
        <Container size={'1200px'} p={0}>
            <Flex gap="28px">
                <Container  p={0} w={315}>
                    <FilterBlock/>
                </Container>
                <Box w={773}>
                    <SearchField/>
                    <VacanciesList/>
                </Box>
            </Flex>
        </Container>
    )
}