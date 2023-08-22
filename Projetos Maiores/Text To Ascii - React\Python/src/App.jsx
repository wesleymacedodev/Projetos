import {
  TextToAscii,
  Box,
  Title,
  Form,
  InputText,
  InputSelect,
  InputConfirm,
  AsciiText,
  Copy
} from "./AppStyle";
import { useEffect, useState, useRef } from "react";
import { FaClipboard, FaClipboardCheck } from "react-icons/fa";

function App() {
  const [fonts, setFonts] = useState([]);
  const [ascii, setAscii] = useState("");
  const [copy, setCopy] = useState(false);
  const asciiTextRef = useRef();

  useEffect(() => {
    fetch("http://192.168.10.101:3333/text/fonts", { method: "GET" })
      .then((data) => data.json())
      .then((data) => setFonts(data))
      .catch((err) => console.error(err));
  }, []);

  function Generator(event) {
    event.preventDefault();
    fetch("http://192.168.10.101:3333/text", {
      method: "POST",
      headers: {
        Accept: 
        "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: event.target.input_text.value,
        font: event.target.input_select.value,
      }),
    })
      .then((data) => data.text())
      .then((data) => {
        setAscii(data);
      })
      .catch((err) => console.error(err));
  }

  function copyAscii() {
    const textToCopy = asciiTextRef.current.textContent;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error(err);
    }
    document.body.removeChild(textArea);
    setCopy(!copy);
    const animation = setTimeout(() => {
      setCopy(copy);
      clearTimeout(animation)
    }, 500);
  }

  return (
    <TextToAscii className="App">
      <Box>
        <Title>Text To Ascii Art</Title>
        <Form onSubmit={Generator}>
          <InputText type="text" name="input_text"/>
          <InputSelect name="input_select">
            {fonts.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </InputSelect>
          <InputConfirm type="submit">Gerar</InputConfirm>
        </Form>
        <Copy>
          {copy ? 
            <FaClipboardCheck onClick={copyAscii}/>  
          : 
            <FaClipboard onClick={copyAscii} />
          }
        </Copy>
        <AsciiText ref={asciiTextRef}>
          {ascii}        
        </AsciiText>



      </Box>
    </TextToAscii>
  );
}

export default App;
