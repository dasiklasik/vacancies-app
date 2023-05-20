import {Container, Paper} from "@mantine/core";
import {Vacancy} from "../Vacancy/Vacancy";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {StoreType} from "../../bll/store";
import {VacancyAppType} from "../../bll/vacancies-reducer";
import HTMLReactParser from "html-react-parser";

export const VacancyPage = () => {
debugger
    const param = useParams()
    const id = Number(param.id)

    const vacancyData = useSelector<StoreType, VacancyAppType>(state => state.vacancies.vacancies.
    filter(item => item.id === id)[0])


    const desc = HTMLReactParser(vacancyData.descriptionText)


    return (
        <Container size={'1200px'} p={0}>
            <Vacancy vacancyData={vacancyData}/>
            <Paper p={24} mt={20} withBorder radius={12} w={1200}>
                {desc}
            </Paper>
        </Container>
    )
}