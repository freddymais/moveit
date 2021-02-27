import { useContext } from 'react'
import Link from 'next/link'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile() {

  const { level } = useContext(ChallengesContext)

  return (
    <div className={styles.profileContainer}>
      <a href='https://github.com/freddymais' target="_blank" >
        <img src="https://github.com/freddymais.png" alt="Freddymais" />
      </a>
      <div>
        <strong>Freddymais</strong>
        <p>
          <img src="icons/level.svg" alt="level" />
          Level {level}
        </p>
      </div>
    </div>
  )
}