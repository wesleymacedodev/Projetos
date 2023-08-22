import styled from "styled-components"
import Colors from "./Colors"

const TextToAscii = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: ${Colors.primary};
    padding: 20px;
`

const Box = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${Colors.secondary};
    padding: 20px;
    width: 100%;
    max-height: 90%;
    @media screen and (min-width: 512px){
        max-width: 512px;
    }
`

const Title = styled.h1`
    font-size: 2rem;
    color: ${Colors.font};
`

const Form = styled.form`
    display: flex;
    width: 100%;
    min-height: 30px;
    margin: 20px 0;
`

const InputText = styled.input`
    width: 60%;
    padding: 5px;
    background-color: ${Colors.tertiary};
    border: none;
`
const InputSelect = styled.select`
    width: 20%;
    background-color: ${Colors.tertiary};
    border: none;
    cursor: pointer;
    transition: background-color .5s;
    &:hover {
        background-color: ${Colors.tertiaryHover}
    }
`

const InputConfirm = styled.button`
    width: 20%;
    background-color: ${Colors.tertiary};
    border: none;
    cursor: pointer;
    transition: background-color .5s;
    &:hover {
        background-color: ${Colors.tertiaryHover}
    }
`

const AsciiText = styled.pre`
    font-family: monospace;
    padding: 20px;
    background-color: ${Colors.asciiBackground};
    color: ${Colors.asciiFont};
    width: 100%;
    overflow: auto;
` 

const Copy = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin: 0px 50px 0px 0px;
    position: sticky;
    width: 100%;
    height: 0px;
    cursor: pointer;
    & svg {
        margin-top: 7px;
        width: 25px;
        height: 25px;
        color: ${Colors.font};
    }
`

export {TextToAscii, Box, Title, Form, InputText, InputSelect, InputConfirm, AsciiText, Copy}