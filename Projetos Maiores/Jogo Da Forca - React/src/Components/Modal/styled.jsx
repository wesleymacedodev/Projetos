import styled from 'styled-components'

const Background = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    background-color: #00000084;
    width: 100%;
    height: 100%;
`

const Modal = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border-radius: 5px;
    background-color: var(--color-3);
    animation: animation 2s;

    @keyframes animation {
        0% { 
            opacity: 0;
            transform: translateY(100px);
        } 100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

const Message = styled.h1`
    color: var(--color-4);
    font-size: 2rem;
`

const Description = styled.p`
    color: var(--color-5);
    font-size: 1rem;
`

const Button = styled.button`
    background-color: transparent;
    border: 1px solid var(--color-4);
    padding: 5px;
    color: var(--color-4);
    cursor: pointer;
    font-size: 1rem;
    width: 100%;
    transition: all .5s;
    &:hover {
        filter: brightness(0.8);
    }
`

export {Background, Modal, Message, Description, Button}