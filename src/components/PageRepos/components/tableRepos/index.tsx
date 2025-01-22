import styles from "./styles.module.scss"
import { ReposContext } from "@/context/reposProvider"
import { dataRepo } from "@/interfaces/modalRepo.i"
import { useContext } from "react"

interface TableReposProp {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDataRepo: React.Dispatch<React.SetStateAction<dataRepo>>
}

export const TableRepos: React.FC<TableReposProp> = ({
    setOpen,
    setDataRepo,
}) => 
{
    const reposApp = useContext(ReposContext)

    const openModal = (item: dataRepo) => 
    {
        setOpen(true)
        setDataRepo(item)
    }

    const getVisibility = (visibility: string) =>
    {
        if(visibility === 'public')
        {
            return "Público"
        }

        return "Privado"
    }

    return (
        <table className={styles.tableRepos}>
            <thead>
                <tr className={styles.rowHead}>
                    <th>Nome Repositorio</th>
                    <th>Visibilidade</th>
                </tr>
            </thead>
            <tbody>
                {reposApp.data && reposApp.data.map((item: dataRepo, key: number) => (
                    <tr key={key}>
                        <td 
                            onClick={() => openModal(item)} 
                            style={{ cursor: 'pointer' }}
                            data-label="Nome Repositorio"
                        >
                            <span className={styles.nameRepo}>
                                {item?.name}
                            </span>
                        </td>
                        <td data-label="Visibilidade">{getVisibility(item?.visibility)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}