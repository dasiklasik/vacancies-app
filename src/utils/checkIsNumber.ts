export const checkIsNumber = (value: number | string) => {
    return typeof value === 'number' ? value : undefined
}