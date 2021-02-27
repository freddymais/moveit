import Head from "next/head";
import { GetServerSideProps } from 'next'

import ChallengeBox from "../components/ChallengeBox";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import CompletedChallenges from "../components/CompletedChallenges";
import { CountdownProvider } from "../contexts/CountdownContexts";
import { ChallengesProvider } from "../contexts/ChallengesContext";

import styles from '../styles/pages/Home.module.css'

interface HomeProps {
  level: number
  currentExperience: number
  challengeCompleted: number
}

export default function Home(props: HomeProps) {
  // console.log(props)
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
    >

      <div className={styles.container}>
        <Head>
          <title>Home | Move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>

    </ChallengesProvider>

  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengeCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengeCompleted: Number(challengeCompleted),
    }
  }
}