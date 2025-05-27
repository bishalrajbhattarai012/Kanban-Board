"use strict";
class KanbanController {
    constructor() {
        this.kanbanService = new KanbanService();
        this.addButton = this.kanbanService.getAddButton();
        this.todosCard = this.kanbanService.getTodosCard();
        this.droppables = this.kanbanService.getAllDroppableAreas();
    }
    handleDragToggle(card, eventName, editable) {
        card.addEventListener(eventName, () => {
            this.kanbanService.toggleClass(card, "dragging");
            this.kanbanService.toggleElementEditableState(card, editable);
        });
    }
    handleDeleteEvent(card, eventName) {
        card.addEventListener(eventName, () => this.kanbanService.removeCard(card));
    }
    attachCardEvents(card) {
        this.handleDragToggle(card, "dragstart", "false");
        this.handleDragToggle(card, "dragend", "true");
        this.handleDeleteEvent(card, "dblclick");
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
            this.attachCardEvents(this.kanbanService.addKanbanCard(this.todosCard));
        });
    }
    init() {
        this.attachAddEvent();
        this.attachDragOverEvent();
    }
}
