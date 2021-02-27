import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from "../components/LevalUpModal";

interface ChallengesProviderProps {
  children: ReactNode,
  level: number,
  currenteExperience: number,
  challengeCompleted: number,
}

interface Challenge {
  type: 'body' | 'eye',
  description: string,
  amount: number,
}

interface ChallengesContextData {
  level: number;
  currenteExperience: number,
  challengeCompleted: number,
  experienceToNextLevel: number,
  activeChallenge: Challenge,
  levelUP: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currenteExperience, setCurrenteExperience] = useState(rest.currenteExperience ?? 0);
  const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModal, setIsLevelUpModal] = useState(false)
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currenteExperience))
    Cookies.set('challengeCompleted', String(challengeCompleted))
  }, [level, currenteExperience, challengeCompleted])

  function levelUP() {
    setLevel(level + 1);
    setIsLevelUpModal(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModal(false)
  }

  function startNewChallenge() {
    // console.log('New Challenge');
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    // console.log(Notification.permission);
    if (Notification.permission === 'granted') {
      // console.log('Entrou Granted!');
      new Notification("Novo Desafio!", {
        body: `Valendo ${challenge.amount} XP`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currenteExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUP()
    }

    setCurrenteExperience(finalExperience);
    setActiveChallenge(null);
    setChallengeCompleted(challengeCompleted + 1);
  }


  return (
    <ChallengesContext.Provider value={{
      level,
      currenteExperience,
      challengeCompleted,
      activeChallenge,
      experienceToNextLevel,
      levelUP,
      startNewChallenge,
      resetChallenge,
      completeChallenge,
      closeLevelUpModal,
    }}>
      {children}
      { isLevelUpModal && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}