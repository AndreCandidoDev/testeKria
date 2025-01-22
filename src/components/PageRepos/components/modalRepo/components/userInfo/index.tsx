import { contributor, UserInfoProps } from '@/interfaces/userInfo.i'
import styles from './styles.module.scss'
import Image from 'next/image';

export const UserInfo: React.FC<UserInfoProps> = ({ data }) =>
{
    const openLink = () =>
    {
        window.open(data.html_url)
    }

    return (
        <div className={styles.userInfo} onClick={() => openLink()}>
            <div className={styles.content}>
                <Image
                    src={data.avatar_url}
                    height={30}
                    width={30}
                    alt="Fechar"
                />
                <div className={styles.infos}>
                    <span className={styles.userName}>{data?.login}</span>
                    {(data as contributor).contributions && <span>{(data as contributor).contributions} Contribuição(ões)</span>}
                </div>
            </div>
        </div>
    )
}