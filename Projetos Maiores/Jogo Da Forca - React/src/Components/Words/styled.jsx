import styled from 'styled-components'

const Words = styled.div`
    display: flex;
    gap: 5px;
    justify-content: center;
`

const Key = styled.span`
    width: 20px;
    text-align: center;
    position: relative;
    color: var(--color-4);
    font-size: 1rem;
    &::before {
        position: absolute;
        bottom: 0;
        left: 0;
        content: "";
        width: 100%;
        height: 2px;
        background-color: var(--color-3);
    }
`

export {Words, Key}