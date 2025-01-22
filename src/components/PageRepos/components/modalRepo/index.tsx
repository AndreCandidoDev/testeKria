import Image from 'next/image';
import styles from './styles.module.scss'
import { useContext, useEffect, useState } from "react"
import { modalRepoProps } from '@/interfaces/modalRepo.i';
import { Favorite } from '@/components/favorite';
import { formatDate } from 'date-fns';
import { UserInfo } from './components/userInfo';
import { ReposContext } from '@/context/reposProvider';

export const ModalRepo: React.FC<modalRepoProps> = ({
    open,
    setOpen,
    data
}) =>
{
    const reposApp = useContext(ReposContext)

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
                            src="/assets/Cross.svg"
                            height={30}
                            width={30}
                            alt="Fechar"
                            onClick={() => setOpen(false)}
                        />
                    </div>
            
                    <div className={styles.infos}>
                        <div className={styles.name}>
                            <h3>{data?.name}</h3>
                            {!reposApp.isFavorite && (
                                <Favorite data={data} />
                            )}
                        </div>
            
                        <div className={styles.description}>
                            <h4>Descrição do Repositório</h4>
                            <span>{data?.description}</span>
                        </div>
            
                        <div className={styles.languages}>
                            <h4>Linguagens Utilizadas</h4>
                            {additionalInfos.languages.map((lang, key) => (
                                <p key={key}>{lang}</p>
                            ))}
                        </div>
            
                        <div className={styles.lastDate}>
                            <h4>Última Atualização</h4>
                            <span>{formatDate(data?.updated_at, "dd/MM/yyyy HH:MM:SS")}</span>
                        </div>
            
                        <div className={styles.owner}>
                            <h4>Dono do Repositório</h4>
                            <UserInfo data={data.owner}/>
                        </div>
            
                        <div className={styles.contributors}>
                            <h4>Contribuidores</h4>
                            <div className={styles.content}>
                                {additionalInfos.contributors.map((cont, key) => (
                                    <UserInfo key={key} data={cont}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}