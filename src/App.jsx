import Header from "./components/Header"
import Status from "./components/Status"

export default function App(){
  return (
    <main>
      <Header />
      <section className="game-status">
        <h2>You Win!</h2>
        <p>Well done!</p>
      </section>
    </main>
  )
}