type Menu = {
    label: string,
    hasSearch?: boolean
    isFavorite?: boolean
    allRepos: boolean
    value: number
}[]

export const menu: Menu = [
    {
        label: "Repositórios Publicos",
        value: 0,
        allRepos: true
    },
    {
        label: "Meus Repositorios",
        value: 1,
        allRepos: false
    },
    {
        label: "Buscar Repositorios Por Usuario",
        hasSearch: true,
        value: 2,
        allRepos: false
    },
    {
        label: "Favoritos",
        isFavorite: true,
        value: 3,
        allRepos: false
    }
]