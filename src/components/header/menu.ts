type Menu = {
    label: string,
    hasSearch?: boolean
    isFavorite?: boolean
    value: number
}[]

export const menu: Menu = [
    {
        label: "Meus Repositorios",
        value: 0,
    },
    {
        label: "Buscar Repositorios Por Usuario",
        hasSearch: true,
        value: 1,
    },
    {
        label: "Favoritos",
        isFavorite: true,
        value: 2,
    }
]