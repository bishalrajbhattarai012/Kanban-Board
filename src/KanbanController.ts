import { KanbanService } from "./KanbanService.js";

type DragEventName= "dragstart" | "dragend"
type ContentEditable = "true" | "false"
type DeleteEvent = "dblclick"

export class KanbanController {
  private addButton: HTMLDivElement;
  private kanbanService: KanbanService;
  private todosCard: HTMLDivElement;
  private droppables: HTMLDivElement[];

  constructor() {
    this.kanbanService = new KanbanService();
    this.addButton = this.kanbanService.getAddButton();
    this.todosCard = this.kanbanService.getTodosCard();
    this.droppables = this.kanbanService.getAllDroppableAreas();
    this.attachAddEvent();
    this.attachDragOverEvent();
  }

  private handleDragToggle<T extends HTMLElement>(card: T,eventName: DragEventName,editable: ContentEditable) {
    card.addEventListener(eventName, () => {
      this.kanbanService.toggleClass<T>(card, "dragging");
      this.kanbanService.toggleElementEditableState<T>(card, editable);
    });
  }

  private handleDeleteEvent<T extends HTMLElement>(card: T,eventName: DeleteEvent) {
    card.addEventListener(eventName, () => this.kanbanService.removeCard(card));
  }

  private attachCardEvents(card: HTMLDivElement): void {
    this.handleDragToggle(card, "dragstart", "false");
    this.handleDragToggle(card, "dragend", "true");
    this.handleDeleteEvent(card, "dblclick");
  }


  attachDragOverEvent(): void {
    this.kanbanService.handleCardPlacement(this.droppables)
  }

  attachAddEvent(): void {
    this.addButton.addEventListener("click", () => {
      this.attachCardEvents(
        <HTMLDivElement>this.kanbanService.addKanbanCard(this.todosCard)
      );
    });
  }

}
