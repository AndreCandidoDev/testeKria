import { TableRepos } from "./components/tableRepos"
import styles from "./styles.module.scss"
import { SearchBar } from "./components/searchBar"
import { FooterPaginator } from "./components/footerPaginator"
import { useContext, useState } from "react"
import { ReposContext } from "@/context/reposProvider"
import { Loading } from "../loading"
import { ModalRepo } from "./components/modalRepo"
import { ToggleFilters } from "./components/toggleFilters"

export const PageRepos: React.FC = () =>
{
    const reposApp = useContext(ReposContext)

    const [open, setOpen] = useState<boolean>(false)
    const [dataRepo, setDataRepo] = useState<any>({})

    return (
        <main className={styles.page}>
            {reposApp.isLoading && <Loading/>}
            <div className={styles.content}>
                <div className={styles.pageTable}>
                    {reposApp.hasSearch ?
                        <SearchBar/>
                        :
                        <ToggleFilters/>
                    }
                    <TableRepos 
                        setOpen={setOpen} 
                        setDataRepo={setDataRepo}
                    />
                </div>
                <FooterPaginator/>
            </div>
            <ModalRepo
                open={open}
                setOpen={setOpen}
                data={dataRepo} 
            />
        </main>
    )
}