import styles from './styles.module.scss'

export const Loading: React.FC<any> = () => {

  return (
    <div className={styles.overlay}>
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Buscando Dados ...</p>
      </div>
    </div>
  )
}
