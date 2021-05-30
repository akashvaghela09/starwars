import React from 'react';
import styles from "../Styles/ResultCard.module.css"

const ResultCard = ({data, active}) => {
    const { name, birth_year, gender} = data

    return (
        <>
        {!active ?
        <div className={styles.cardDiv} >
            <p><b className={styles.name}>{name}</b></p>
            <p>{birth_year}</p>
            <p className={styles.gender}>{gender}</p>
        </div> :
        <div className={styles.lightCard}>
            <p><b className={styles.name}>{name}</b></p>
            <p>{birth_year}</p>
            <p className={styles.gender}>{gender}</p>
        </div>}</>
    )
}

export { ResultCard }