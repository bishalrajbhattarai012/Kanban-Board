"use strict";
class KanbanController {
    constructor() {
        this.kanbanService = new KanbanService();
        this.addButton = this.kanbanService.getAddButton();
        this.todosCard = this.kanbanService.getTodosCard();
        this.droppables = this.kanbanService.getAllDroppableAreas();
    }
    attachDragOverEvent() {
        this.droppables.forEach((droppable) => {
            droppable.addEventListener("dragover", (e) => {
                const currentlyDraggingElement = (this.kanbanService.getCurrentDraggingCard());
                const allCardsExceptDragging = (this.kanbanService.getAllCardsExpectCurrentDragging(droppable));
                const afterElement = (allCardsExceptDragging.find((child) => {
                    const box = child.getBoundingClientRect();
                    return this.kanbanService.checkAfterElement(e, box);
                }));
                this.kanbanService.checkCardPlacement(droppable, afterElement, currentlyDraggingElement);
            });
        });
    }
    attachDragStartEvent(newCard) {
        newCard.addEventListener("dragstart", (e) => {
            this.kanbanService.toggleClass(newCard, "dragging");
            this.kanbanService.toggleElementEditableState(newCard, "false");
        });
    }
    attachDragEndEvent(newCard) {
        newCard.addEventListener("dragend", (e) => {
            this.kanbanService.toggleClass(newCard, "dragging");
            this.kanbanService.toggleElementEditableState(newCard, "true");
        });
    }
    attachAddEvent() {
        this.addButton.addEventListener("click", (e) => {
            const newCard = this.kanbanService.addKanbanCard(this.todosCard);
            newCard.addEventListener("dragstart", (e) => {
                this.kanbanService.toggleClass(newCard, "dragging");
                this.kanbanService.toggleElementEditableState(newCard, "false");
            });
            newCard.addEventListener("dragend", (e) => {
                this.kanbanService.toggleClass(newCard, "dragging");
                this.kanbanService.toggleElementEditableState(newCard, "true");
            });
            newCard.addEventListener("dblclick", (e) => {
                this.kanbanService.removeCard(newCard);
            });
        });
    }
    init() {
        this.attachAddEvent();
        this.attachDragOverEvent();
    }
}
