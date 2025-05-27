"use strict";
class KanbanController {
    constructor() {
        this.kanbanService = new KanbanService();
        this.addButton = this.kanbanService.getAddButton();
        this.todosCard = this.kanbanService.getTodosCard();
        this.droppables = this.kanbanService.getAllDroppableAreas();
    }
    handleDragStart(card) {
        this.kanbanService.toggleClass(card, "dragging");
        this.kanbanService.toggleElementEditableState(card, "false");
    }
    handleDragEnd(card) {
        this.kanbanService.toggleClass(card, "dragging");
        this.kanbanService.toggleElementEditableState(card, "true");
    }
    attachCardEvents(card) {
        card.addEventListener("dragstart", () => this.handleDragStart(card));
        card.addEventListener("dragend", () => this.handleDragEnd(card));
        card.addEventListener("dblclick", () => this.kanbanService.removeCard(card));
    }
    attachDragOverEvent() {
        this.droppables.forEach((droppable) => {
            droppable.addEventListener("dragover", (e) => {
                const draggingCard = this.kanbanService.getCurrentDraggingCard();
                const siblings = this.kanbanService.getAllCardsExpectCurrentDragging(droppable);
                const afterElement = siblings.find((child) => {
                    const box = child.getBoundingClientRect();
                    return this.kanbanService.checkAfterElement(e, box);
                });
                this.kanbanService.checkCardPlacement(droppable, afterElement || null, draggingCard);
            });
        });
    }
    attachAddEvent() {
        this.addButton.addEventListener("click", () => {
            const newCard = this.kanbanService.addKanbanCard(this.todosCard);
            this.attachCardEvents(newCard);
        });
    }
    init() {
        this.attachAddEvent();
        this.attachDragOverEvent();
    }
}
