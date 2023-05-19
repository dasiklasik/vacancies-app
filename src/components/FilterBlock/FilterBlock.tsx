import {Button, Center, Container, Flex, NumberInput, Paper, Select, Title} from "@mantine/core"
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../bll/store";
import {CatalogueType} from "../../api/API";
import {useState} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getVacancies, setFilterValues} from "../../bll/vacancies-reducer";

export const FilterBlock = () => {

    const [minValue, setMinValue] = useState<number | undefined>(undefined)
    const [maxValue, setMaxValue] = useState<number | undefined>(undefined)
    let selectValue = 0;

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()
    const catalogues = useSelector<StoreType, CatalogueType[]>(state => state.vacancies.catalogues)

    const selectData = catalogues.map(item => ({value: item.key.toString(), label: item.title_trimmed}))

    const changeMinValue = (value: number) => {
        setMinValue(value)
    }

    const changeMaxValue = (value: number) => {
        setMaxValue(value)
    }

    const changeSelectValue = (value: string) => {
        selectValue = +value
    }

    const filterVacancies = () => {
        dispatch(setFilterValues({min: minValue, max: maxValue, catalogues: selectValue}))
        dispatch(getVacancies())
    }

    return (
        <Paper withBorder p="20px">
            <Flex>
                <Title order={3}>Фильтры</Title>
                <Button variant="subtle" color="#acadb9">Сбросить все</Button>
            </Flex>
            <Container p={0}>
                <Title order={4}>Отрасль</Title>
                <Select onChange={changeSelectValue} placeholder="Выберете отрасль" data={selectData}/>
            </Container>
            <Container p={0}>
                <Title order={4}>Оклад</Title>
                <NumberInput value={minValue} onChange={changeMinValue} min={0} placeholder="От"/>
                <NumberInput value={maxValue} onChange={changeMaxValue} min={0} placeholder="До"/>
            </Container>
            <Center><Button onClick={filterVacancies}>Применить</Button></Center>
        </Paper>
    )
}