import { KanbanService } from "./KanbanService.js";
export class KanbanController {
    constructor() {
        this.kanbanService = new KanbanService();
        this.addButton = this.kanbanService.getAddButton();
        this.todosCard = this.kanbanService.getTodosCard();
        this.droppables = this.kanbanService.getAllDroppableAreas();
        this.attachAddEvent();
        this.attachDragOverEvent();
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
        this.kanbanService.handleCardPlacement(this.droppables);
    }
    attachAddEvent() {
        this.addButton.addEventListener("click", () => {
            this.attachCardEvents(this.kanbanService.addKanbanCard(this.todosCard));
        });
    }
}
