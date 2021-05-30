import React from 'react';
import styles from "../Styles/ResultCard.module.css"
import { useHistory } from 'react-router';

const ResultCard = ({data, active}) => {
    const { name, birth_year, gender} = data
    const history = useHistory()

    const handleRedirect = () => {
        return history.push(`/person/${name.split(" ").join("_")}`) 
    }

    return (
        <>
        {!active ?
        <div onClick={handleRedirect} className={styles.cardDiv} >
            <p><b className={styles.name}>{name}</b></p>
            <p>{birth_year}</p>
            <p className={styles.gender}>{gender}</p>
        </div> :
        <div onClick={handleRedirect} className={styles.lightCard}>
            <p><b className={styles.name}>{name}</b></p>
            <p>{birth_year}</p>
            <p className={styles.gender}>{gender}</p>
        </div>}
        </>
    )
}

export { ResultCard }