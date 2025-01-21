import Image from 'next/image';
import styles from './styles.module.scss'
import { useEffect, useState } from "react"
import { modalRepoProps } from '@/interfaces/modalRepo.i';
import { Favorite } from '@/components/favorite';

export const ModalRepo: React.FC<modalRepoProps> = ({
    open,
    setOpen,
    data
}) =>
{
    const [additionalInfos, setAdditionalInfos] = useState({languages: [], contributors: []})

    // informações de linguagens e contribuidores nao vem direto na api
    const getMoreInfos = async () =>
    {
        try
        {
            const contributorsUrl = data.contributors_url
    
            const languagesUrl = data.languages_url
    
            const [resultContributors, resultLanguages] = await Promise.all([
                fetch(contributorsUrl),
                fetch(languagesUrl)
            ])
    
            if(resultContributors.ok && resultLanguages.ok)
            {
                const moreInfos = additionalInfos
    
                const contributors = await resultContributors.json()
                const languages = await resultLanguages.json()
    
                moreInfos.contributors = contributors
                moreInfos.languages = Object.keys(languages)
    
                setAdditionalInfos({...moreInfos})
            }
        }
        catch(e)
        {
            console.info(e)
        }
    }

    useEffect(() => 
    {
        if(open)
        {
            getMoreInfos()
        }
    }, [data, open])

    return (
        <>
        {open && (
            <div className={styles.overlay}>
                <div className={styles.content}>
                    <div className={styles.modalHeader}>
                        <Image        
                            className={styles.close}
                            style={{ cursor: 'pointer' }}
                            priority    
                            src="/assets/Cross.svg"
                            height={30}
                            width={30}
                            alt=""
                            onClick={() => setOpen(false)}
                        />
                    </div>

                    <div className={styles.infos}>
                        <div className={styles.name}>
                            <h3>{data?.name}</h3>
                            <Favorite data={data}/>
                        </div>
                        <div className={styles.description}>
                            <h4>Descrição do Repositorio)</h4>
                            <span>{data?.description}</span>
                        </div>
                        <div className={styles.languages}>
                            <h4>Linguagens Utilizadas)</h4>
                            {additionalInfos.languages.map((lang, key) => (
                                <p key={key}>{lang}</p>
                            ))}
                        </div>
                        <div className={styles.lastDate}>
                            <h4>Ultima Atualização)</h4>
                            {data?.updated_at}
                        </div>
                        <div className={styles.owner}>

                        </div>
                        <div className={styles.contributors}>
                            <h4>Contribuidores)</h4>
                            {additionalInfos.contributors.map((cont, key) => (
                                <>
                                    <p>{cont.login}</p>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}