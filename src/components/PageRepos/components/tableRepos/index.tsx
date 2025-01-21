import styles from "./styles.module.scss"
import Image from 'next/image';
import { ReposContext } from "@/context/reposProvider"
import { useContext } from "react"
import { Favorite } from "@/components/favorite";

export const TableRepos: React.FC = () => 
{
    const reposApp = useContext(ReposContext)

    return (
        <table className={styles.tableRepos}>
            <thead>
                <tr className={styles.rowHead}>
                    <th>Favoritar</th>
                    <th>Nome Repositorio</th>
                    <th>Visibilidade</th>
                    <th>Mais Informações</th>
                </tr>
            </thead>
            <tbody>
                {reposApp.data && reposApp.data.map((item:any, key: any) => (
                    <tr key={key}>
                        <td><Favorite data={item}/></td>
                        <td>{item?.name}</td>
                        <td>{item?.visibility}</td>
                        <td>
                            <Image        
                                priority    
                                src="/assets/Eye.svg"
                                height={20}
                                width={20}
                                alt=""
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}