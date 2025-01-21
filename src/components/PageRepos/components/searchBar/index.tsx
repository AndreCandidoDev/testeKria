import { useContext, useRef, useState } from "react"
import styles from "./styles.module.scss"
import { ReposContext } from "@/context/reposProvider"
import Image from 'next/image';

export const SearchBar = () =>
{
    const reposApp = useContext(ReposContext)

    const [userName, setUserName] = useState<string>("")
    const ref = useRef<HTMLInputElement>(null)

    const handleSearch = () =>
    {
        if(userName !== "")
        {
            reposApp.setUser(userName)
        }
    }

    const handleReset = () =>
    {
        setUserName("")
        ref.current.value = null
        reposApp.setUser(null)
    }

    return (
        <div className={styles.searchBar}>
            <div className={styles.content}>
                <div className={styles.textInput}>
                    <input 
                        type="text" 
                        placeholder="Insira o Nome de Usuario"
                        onChange={(e) => setUserName(e.target.value)}
                        ref={ref}
                    />
                    {userName !== "" && (
                        <Image        
                            priority    
                            src="/assets/Cross.svg"
                            height={20}
                            width={20}
                            alt=""
                            onClick={() => handleReset()}
                        />
                    )}
                </div>
                
                <button onClick={handleSearch}>Buscar</button>
            </div>
        </div>
    )
}