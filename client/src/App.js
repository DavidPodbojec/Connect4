import "./App.css"
import { useState } from "react"
import StartScreen from "./components/StartScreen"
import BotBoard from "./components/BotBoard"
import Board from "./components/Board"

function App() {

  let [showStart, changeShowStart] = useState(true)
  let [screen, changeScreen] = useState("")

  function gameMode (mode)  {
    changeScreen(mode)   
    changeShowStart(false)
  };

  if (showStart) {
    return (
      <>
      <StartScreen choice={gameMode}/>
      </>
    ) 
  } else {
    if (screen==="single-player") {
      return (
        <BotBoard/>

      )
    } else {
      return (
        <Board/>

      )
    }
  }

}


export default App