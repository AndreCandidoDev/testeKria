import { useContext, useState } from "react"
import Switch from "react-switch";
import styles from "../../styles.module.scss"
import { ReposContext } from "@/context/reposProvider";

interface TogglePublicProps {
    disablePublic: boolean
}

export const TogglePublic: React.FC<TogglePublicProps> = ({ disablePublic }) => 
{
    const reposApp = useContext(ReposContext)

    const [checked, setChecked] = useState<boolean>(false)

    const handleChange = () =>
    {
        const value = !checked

        setChecked(value)
        
        if(value)
        {
            reposApp.setTypeRepo('public')
        }
        else
        {
            reposApp.setTypeRepo('all')
        }        
    }

    return (
        <div className={styles.toggle}>
            <span>Somente Repositórios Publicos</span>
            <Switch 
                onChange={handleChange} 
                checked={checked} 
                disabled={disablePublic}
            />
        </div>
    )
}