"use strict";
class KanbanService {
    constructor() {
        this.kanbanUtilityService = new KanbanUtilityService();
    }
    getAddButton() {
        const addButton = (document.querySelector(".btn"));
        return addButton;
    }
    createButtonElement() {
        const button = (document.createElement("button"));
        button.textContent = "X";
        this.kanbanUtilityService.addClassToElement(button, "delete");
        return button;
    }
    toggleClass(newCard, className) {
        newCard.classList.toggle(className);
    }
    addKanbanCard(parent) {
        const newCard = (document.createElement("div"));
        this.kanbanUtilityService.addClassToElement(newCard, "kanban-card");
        newCard.draggable = true;
        this.toggleElementEditableState(newCard, "true");
        parent.appendChild(newCard);
        return newCard;
    }
    toggleElementEditableState(card, state) {
        card.contentEditable = state;
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
