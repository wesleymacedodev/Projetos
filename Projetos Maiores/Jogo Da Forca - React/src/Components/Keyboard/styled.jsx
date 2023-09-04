import styled from "styled-components"

const Keys = styled.div`
    display: flex;
    justify-content: center;
    gap: 5px;
    margin: 5px;
`
const KeyStyled = styled.span`
    padding: 5px;
    background-color: var(--color-3);
    border-radius: 5px;
    color: var(--color-4);
    cursor: pointer;
    transition: all .5s;
    font-size: 1rem;
    ${props => props.contain === "true" ? { backgroundColor: "var(--disabled)"} : ""}
    &:hover {
        filter: brightness(0.6);
        transform: scale(1.2);
    }
`


export {Keys, KeyStyled}