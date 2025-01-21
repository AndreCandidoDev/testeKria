type Menu = {
    label: string,
    hasSearch?: boolean
}[]

export const menu: Menu = [
    {
        label: "Meus Repositorios",
    },
    {
        label: "Buscar Repositorios Por Usuario",
        hasSearch: true
    }
]