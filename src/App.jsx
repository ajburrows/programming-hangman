import Header from "./components/Header"
import LanguageChip from "./components/LanguageChip"
import { languages } from "./languages"
import { useState } from "react"
import { clsx } from "clsx"

export default function App(){
  // States
  const [currentWord, setCurrentWord] = useState("react")
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived Values
  const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter.toLowerCase())).length
  const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter.toUpperCase()))
  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameOver = isGameWon || isGameLost

  // Static Values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedLetter(letter) {
    setGuessedLetters(prevGuessedLetters => {
      const letterSet = new Set(prevGuessedLetters)
      letterSet.add(letter)
      return Array.from(letterSet)
    })
  }

  const languageChips = languages.map((langObj, index) => {
    const style = {
        backgroundColor: langObj.backgroundColor,
        color: langObj.color
    }
    const className = clsx({
      "language-chip": true,
      "lost" : index < wrongGuessCount
    })

    return(
        <span key={index} className={className} style={style}>{langObj.name}</span>
    )}
  )

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

  console.log(isGameWon)
  console.log(isGameLost)

  const messageRendered = () => {
    if (isGameWon === true){
      return  <div className="message-box win">
                <h2>You Win!</h2>
                <p>Well done!</p>
              </div>
    }
    else if (isGameLost === true){
      return  <div className="message-box lose">
                <h2>Game Over!</h2>
                <p>You lose! Better start learning Assembly!</p>
              </div>
    }
    else return null
  }

  return (
    <main>
      <Header />
      <section className="game-status">
        {messageRendered()}
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
      { isGameOver ? <button className="new-game">New Game</button> : null }
    </main>
  )
}