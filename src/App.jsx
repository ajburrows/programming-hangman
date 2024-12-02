import Header from "./components/Header"
import LanguageChip from "./components/LanguageChip"
import { languages } from "./languages"
import { useState } from "react"

export default function App(){

  const languageChips = languages.map(langObj => 
    <LanguageChip 
      key={langObj.name}
      name={langObj.name}
      backgroundColor={langObj.backgroundColor}
      color={langObj.color}
    />
  )

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
    </main>
  )
}