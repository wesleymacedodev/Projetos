const cardsElement = document.querySelectorAll(".cards")

cardsElement.forEach(cards => {
    cards.addEventListener("dragover", (element) => {
        element.preventDefault();
        const bottomTask = insertAbove(cards, element.clientY);
        const curTask = document.querySelector(".dragging");
        if(!bottomTask) {
            cards.appendChild(curTask)
        } else {
            cards.insertBefore(curTask, bottomTask)
        }
    })
})

const insertAbove = (cards, mouseY) => {
    const elements = cards.querySelectorAll(".card:not(.dragging)");
    let closestCard = null;
    let closestOffset = Number.NEGATIVE_INFINITY; 
    elements.forEach(card => {
        const { top } = card.getBoundingClientRect();
        const offset = mouseY - top;
        if (offset > closestOffset && offset < 0) { 
            closestOffset = offset;
            closestCard = card;
        }
    });
    return closestCard;
};