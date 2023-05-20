import {Vacancy} from "../Vacancy/Vacancy";
import {Center, Container, Flex, Pagination} from "@mantine/core";
import {VacancyAppType} from "../../bll/vacancies-reducer";

type VacanciesListPropsType = {
    vacancies: VacancyAppType[]
    pageNumber: number
    pageCount: number
    changePageNumber: (value: number) => void
}

export const VacanciesList = (props: VacanciesListPropsType) => {

    const {
        vacancies,
        pageNumber,
        pageCount,
        changePageNumber
    } = props

    return (
        <Container p={0}>
            <Flex direction="column" gap="16px" align={"stretch"}>
                {vacancies.map(item => {
                    return <Vacancy key={item.id} vacancyData={item}/>
                })}
            </Flex>
            <Center mt="40px">
                <Pagination value={pageNumber} onChange={changePageNumber} total={pageCount}/>
            </Center>
        </Container>
    )
}