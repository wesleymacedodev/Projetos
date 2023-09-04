import Keyboard from "./Components/Keyboard"
import Words from "./Components/Words"
import Hangman from "./Components/Hangman"
import WrongWords from "./Components/WrongWords"
import Modal from "./Components/Modal"
import { AppContainer } from "./AppStyled";
import WordsList from "./WordsList";
import { useEffect, useState } from "react";

const wordRandom = WordsList[Math.floor(Math.random() * WordsList.length)].toUpperCase();

function App() {
  const [letters, setLetters] = useState("")
  const [erro, setErro] = useState(1);
  const [word, setWord] = useState(wordRandom);
  const [accert, setAccert] = useState([])
  const [wrong, setWrong] = useState([])
  const [gameResult, setGameResult] = useState(null);

  const verifyWords = (letter) => {
    if (accert.includes(letter) || wrong.includes(letter)) {
      return
    } else {
      if (word.includes(letter)) {
        setAccert(old => [...old, letter])
      } else {
        setWrong(old => [...old, letter])
        setErro(number => number+1)
      }
    }
  } 

  const verifyGame = () => {
    if (gameResult === null) {
      if(word.split("").every(r => accert.includes(r))) {
        setGameResult(<Modal title="Você Ganhou!!!" description={`Palavra correta : ${wordRandom}`}/>)
      } else if (erro > 7) {
        setGameResult(<Modal title="Você Perdeu!!!" description={`Palavra correta : ${wordRandom}`}/>)
      }
    } 
    return null
  }

  useEffect(() => {
    verifyWords(letters)
  }, [letters])

  useEffect(() => {
    verifyGame()
  })

  return (
    <AppContainer className="App">
      <Hangman number={erro}/>
      <Words Word={word} Accert={accert}/>
      <Keyboard letters={[...accert, ...wrong]} setLetters={setLetters}/>
      <WrongWords WrongWords={wrong}/>
      {gameResult}
    </AppContainer>
  );
}

export default App;
