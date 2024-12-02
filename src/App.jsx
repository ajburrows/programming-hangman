import Header from "./components/Header"
import LanguageChip from "./components/LanguageChip"
import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"

export default function App(){
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    setGuessedLetters(prevGuessedLetters => {
      const letterSet = new Set(prevGuessedLetters)
      letterSet.add(letter)
      return Array.from(letterSet)
    })
  }
  const languageChips = languages.map(langObj => 
    <LanguageChip 
      key={langObj.name}
      name={langObj.name}
      backgroundColor={langObj.backgroundColor}
      color={langObj.color}
    />
  )

  console.log(guessedLetters)
  const letterSpans = currentWord.split("").map((letter, index) => 
      <span className="letter" key={index}>{guessedLetters.includes(letter.toUpperCase()) ? letter.toUpperCase() : null}</span>
  )

  const keyboardButtons = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter.toUpperCase())
    const isRight = isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)
    const className = clsx({
      "keyboard-button": true,
      "right-letter": isRight,
      "wrong-letter": isWrong,
    })

    return(
      <button 
        className={className}
        key={letter.toUpperCase()} 
        onClick={() => addGuessedLetter(letter.toUpperCase())}
      >
          {letter.toUpperCase()}
      </button>
    )
  })

  return (
    <main>
      <Header />
      <section className="game-status">
        <h2>You Win!</h2>
        <p>Well done!</p>
      </section>
      <section className="language-chips-container">
        {languageChips}
      </section>
      <section className="word-container">
        {letterSpans}
      </section>
      <section className="keyboard">
        {keyboardButtons}
      </section>
      <button className="new-game">New Game</button>
    </main>
  )
}