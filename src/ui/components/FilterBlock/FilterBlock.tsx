import {Button, Center, Container, Flex, NumberInput, Paper, Select, Title} from '@mantine/core';
import {useAppDispatch, useAppSelector} from '../../../bll/store';
import {CatalogueType} from '../../../api/API';
import {useEffect, KeyboardEvent} from 'react';
import {setFilterValues} from '../../../bll/vacancies/vacancies-reducer';
import {IconX} from '../../../assets/icons/IconX';
import styles from './FilterBlock.module.css'

type FilterBlockPropsType = {
    minValue: number | ''
    maxValue: number | ''
    selectValue: string
    changeMinValue: (value: number | '') => void
    changeMaxValue: (value: number | '') => void
    changeSelectValue: (value: string) => void
    submitFilter: () => void
    resetValues: () => void
}

export const FilterBlock = (props: FilterBlockPropsType) => {

    const {
        maxValue,
        minValue,
        selectValue,
        changeMaxValue,
        changeMinValue,
        changeSelectValue,
        submitFilter,
        resetValues,
    } = props

    const dispatch = useAppDispatch()
    const catalogues = useAppSelector<CatalogueType[]>(state => state.vacancies.catalogues)
    const selectData = catalogues.map(item => ({value: item.key.toString(), label: item.title_trimmed}))

    useEffect(() => {
        return () => {
            //зачищаем фильтр в vacancies-reducer при размонтировании компоненты
            dispatch(setFilterValues({min: undefined, max: undefined, catalogues: 0, keyword: null}))
        }
    }, [dispatch])


    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submitFilter()
        }
    }

    return (
        <Paper withBorder radius={12} p="20px">
            <Flex justify="space-between" mb={32}>
                <Title order={3}>Фильтры</Title>
                <button className={styles.button__reset} onClick={resetValues}>
                    <span>Сбросить все</span>
                    <IconX/>
                </button>
            </Flex>
            <Container p={0}>
                <Title mb={8} order={5}>Отрасль</Title>
                <Select
                    value={selectValue}
                    data-elem="industry-select"
                    onChange={changeSelectValue}
                    placeholder="Выберете отрасль"
                    data={selectData}
                />
            </Container>
            <Container p={0} my={20}>
                <Title order={5}>Оклад</Title>
                <NumberInput
                    data-elem="salary-from-input"
                    my={8}
                    value={minValue}
                    onChange={changeMinValue}
                    min={0}
                    placeholder="От"
                    onKeyPress={onEnterHandler}
                />
                <NumberInput
                    data-elem="salary-to-input"
                    value={maxValue}
                    onChange={changeMaxValue}
                    min={0}
                    placeholder="До"
                />
            </Container>
            <Center><Button data-elem="search-button" onClick={submitFilter}>Применить</Button></Center>
        </Paper>
    )
}