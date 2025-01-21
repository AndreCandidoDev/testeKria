import { useContext } from "react";
import styles from "./styles.module.scss";
import { ReposContext } from "@/context/reposProvider";
import Image from 'next/image';

export const FooterPaginator = () =>
{
    const reposApp = useContext(ReposContext)

    const goToPreviousPage = () => 
    {
        if(reposApp.page > 1)
        {
            reposApp.setPage(reposApp.page - 1)
        }
    }

    const goToNextPage = () =>
    {
        if(reposApp.data.length === 10)
        {
            reposApp.setPage(reposApp.page + 1)
        }
    }

    return (
        <div className={styles.paginationNumber}>
            <div className={styles.content}>
                <a
                    className={styles.btnGoTo}
                    style={{ cursor: reposApp.page === 1 ? 'not-allowed' : 'pointer' }}
                    onClick={() => goToPreviousPage()}
                >
                    <Image        
                        priority    
                        src="/assets/BackArrow.svg"
                        height={20}
                        width={20}
                        alt=""
                    />
                </a>
                <a
                    className={styles.btnGoTo}
                    style={{ cursor: reposApp.data.length < 10 ? 'not-allowed' : 'pointer' }}
                    onClick={() => goToNextPage()}
                >
                    <Image        
                        priority    
                        src="/assets/NextArrow.svg"
                        height={20}
                        width={20}
                        alt=""
                    />
                </a>
            </div>
        </div>
    )
}