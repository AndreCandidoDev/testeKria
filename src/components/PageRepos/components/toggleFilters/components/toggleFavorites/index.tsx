import { useContext, useState } from "react"
import Switch from "react-switch";
import styles from "../../styles.module.scss"
import { ReposContext } from "@/context/reposProvider";
import { useCookies } from "react-cookie";

interface ToggleFavoritesProps {
    setDisablePublic: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToggleFavorites: React.FC<ToggleFavoritesProps> = ({ setDisablePublic }) => 
{
    const reposApp = useContext(ReposContext)

    const [checked, setChecked] = useState<boolean>(false)

    const [cookie,] = useCookies(['favorite'])

    const handleChange = () =>
    {
        const value = !checked
        const favorites = cookie.favorite
        
        setChecked(value)

        if(value)
        {
            const favoriteData = Object.keys(favorites).map((item) => favorites[item])
            reposApp.setData(favoriteData)
            setDisablePublic(true)
        }
        else
        {
            // reload
            setDisablePublic(false)
            reposApp.getReposData()
        }
    }

    return (
        <div className={styles.toggle}>
            <span>Favoritos</span>
            <Switch onChange={handleChange} checked={checked} />
        </div>
    )
}