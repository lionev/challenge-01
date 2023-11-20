import styles from './style.module.css'

import ImgLogo from '../../assets/Logo.svg'

export function Heading() {
    return (
        <div className={styles.header}>
            <img src={ImgLogo} alt="" />
        </div>
    )
}