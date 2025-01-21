import { TableRepos } from "./components/tableRepos"
import styles from "./styles.module.scss"
import { SearchBar } from "./components/searchBar"
import { FooterPaginator } from "./components/footerPaginator"
import { useContext } from "react"
import { ReposContext } from "@/context/reposProvider"
import { Loading } from "../loading"

export const PageRepos: React.FC = () =>
{
    const reposApp = useContext(ReposContext)

    return (
        <main className={styles.page}>
            {reposApp.isLoading && <Loading/>}
            <div className={styles.content}>
                <div className={styles.pageTable}>
                    {reposApp.hasSearch && <SearchBar/>}
                    <TableRepos/>
                </div>
                
                <FooterPaginator/>
            </div>
        </main>
    )
}