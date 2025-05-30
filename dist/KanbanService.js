export class KanbanService {
    constructor() { }
    getAddButton() {
        const addButton = (document.querySelector(".btn"));
        return addButton;
    }
    toggleClass(newCard, className) {
        newCard.classList.toggle(className);
    }
    addClassToElement(element, className) {
        element.classList.add(className);
    }
    addKanbanCard(parent) {
        const newCard = (document.createElement("div"));
        this.addClassToElement(newCard, "kanban-card");
        newCard.draggable = true;
        this.toggleElementEditableState(newCard, "true");
        parent.appendChild(newCard);
        return newCard;
    }
    toggleElementEditableState(card, state) {
        card.contentEditable = state;
    }
    getAfterElement(siblings, e) {
        const afterElement = siblings.find((child) => {
            const box = child.getBoundingClientRect();
            return this.checkAfterElement(e, box);
        });
        return afterElement;
    }
    handleCardPlacement(droppables) {
        droppables.forEach((droppable) => {
            droppable.addEventListener("dragover", (e) => {
                const draggingCard = this.getCurrentDraggingCard();
                const siblings = this.getAllCardsExpectCurrentDragging(droppable);
                const afterElement = this.getAfterElement(siblings, e);
                this.checkCardPlacement(droppable, afterElement, draggingCard);
            });
        });
    }
    checkAfterElement(e, box) {
        return e.clientY < box.top + box.height;
    }
    getAllCardsExpectCurrentDragging(droppable) {
        const allCards = (Array.from(droppable.querySelectorAll(".kanban-card:not(.dragging)")));
        return allCards;
    }
    getCurrentDraggingCard() {
        const draggingCard = (document.querySelector(".dragging"));
        return draggingCard;
    }
    getTodosCard() {
        const card = (document.querySelector(".todo-kanban-cards"));
        return card;
    }
    getAllDroppableAreas() {
        const droppables = (Array.from(document.querySelectorAll(".kanban-cards")));
        return droppables;
    }
    removeCard(newCard) {
        newCard.remove();
    }
    checkCardPlacement(droppable, afterElement, currentlyDraggingElement) {
        if (!currentlyDraggingElement)
            return;
        if (!afterElement)
            droppable.appendChild(currentlyDraggingElement);
        else
            droppable.insertBefore(currentlyDraggingElement, afterElement);
    }
}
