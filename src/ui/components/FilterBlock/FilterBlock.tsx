import {Button, Center, Container, Flex, NumberInput, Paper, Select, Title} from "@mantine/core"
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../bll/store";
import {CatalogueType} from "../../../api/API";
import {useEffect, useState} from "react";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {setFilterValues} from "../../../bll/vacancies/vacancies-reducer";
import {IconX} from "../../../assets/icons/IconX";
import styles from './FilterBlock.module.css'
import { getVacancies } from "../../../bll/vacancies/vacancies-reducer-thunks";

export const FilterBlock = () => {

    const dispatch = useDispatch<ThunkDispatch<StoreType, void, AnyAction>>()

    useEffect(() => {
        return () => {
            //зачищаем фильтр в vacancies-reducer при размонтировании компоненты
            dispatch(setFilterValues({min: undefined, max: undefined, catalogues: 0}))
        }
    }, [dispatch])

    const [minValue, setMinValue] = useState<number | ''>('')
    const [maxValue, setMaxValue] = useState<number | ''>('')
    const [selectValue, setSelectValue] = useState('')


    const catalogues = useSelector<StoreType, CatalogueType[]>(state => state.vacancies.catalogues)

    const selectData = catalogues.map(item => ({value: item.key.toString(), label: item.title_trimmed}))

    const changeMinValue = (value: number) => {
        setMinValue(value)
    }

    const changeMaxValue = (value: number) => {
        setMaxValue(value)
    }

    const changeSelectValue = (value: string) => {
        setSelectValue(value)
    }

    const filterVacancies = () => {
        const min = typeof minValue !== 'string' ? minValue : undefined
        const max = typeof maxValue !== 'string' ? maxValue : undefined
        dispatch(setFilterValues({min, max, catalogues: +selectValue}))
        dispatch(getVacancies())
    }

    const resetValues = () => {
        dispatch(setFilterValues({min: undefined, max: undefined, catalogues: 0}))
        setSelectValue('')
        setMinValue('')
        setMaxValue('')
    }

    return (
        <Paper withBorder radius={12} p="20px">
            <Flex justify={"space-between"} mb={32}>
                <Title order={3}>Фильтры</Title>
                <button className={styles.button__reset} onClick={resetValues}>
                    <span>Сбросить все</span>
                    <IconX/>
                </button>
                {/*<Button onClick={resetValues} variant="subtle" color="#acadb9">Сбросить все x</Button>*/}
            </Flex>
            <Container p={0}>
                <Title mb={8} order={5}>Отрасль</Title>
                <Select value={selectValue} data-elem="industry-select" onChange={changeSelectValue} placeholder="Выберете отрасль" data={selectData}/>
            </Container>
            <Container p={0} my={20}>
                <Title order={5}>Оклад</Title>
                <NumberInput data-elem="salary-from-input" my={8} value={minValue} onChange={changeMinValue} min={0} placeholder="От"/>
                <NumberInput data-elem="salary-to-input" value={maxValue} onChange={changeMaxValue} min={0} placeholder="До"/>
            </Container>
            <Center><Button data-elem="search-button" onClick={filterVacancies}>Применить</Button></Center>
        </Paper>
    )
}