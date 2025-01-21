import styles from "./styles.module.scss"
import { TogglePublic } from "./components/togglePublic";
import { ToggleFavorites } from "./components/toggleFavorites";
import { useState } from "react";

export const ToggleFilters = () =>
{
    const [disablePublic, setDisablePublic] = useState<boolean>(false)

    return (
        <div className={styles.toggleFilters}>
            <TogglePublic disablePublic={disablePublic}/>
            <ToggleFavorites setDisablePublic={setDisablePublic}/>
        </div>
    )
}