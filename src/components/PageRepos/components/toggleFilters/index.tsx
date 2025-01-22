import styles from "./styles.module.scss"
import { TogglePublic } from "./components/togglePublic";

export const ToggleFilters = () =>
{
    return (
        <div className={styles.toggleFilters}>
            <TogglePublic/>
        </div>
    )
}