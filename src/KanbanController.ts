class KanbanController {
  private addButton: HTMLDivElement;
  private kanbanService: KanbanService;
  private todosCard: HTMLDivElement;
  private droppables: HTMLDivElement[];

  constructor() {
    this.kanbanService = new KanbanService();
    this.addButton = this.kanbanService.getAddButton();
    this.todosCard = this.kanbanService.getTodosCard();
    this.droppables = this.kanbanService.getAllDroppableAreas();
  }

  private handleDragToggle<T extends HTMLElement>(
    card: T,
    eventName: "dragstart" | "dragend",
    editable: "true" | "false"
  ) {
    card.addEventListener(eventName, () => {
      this.kanbanService.toggleClass<T>(card, "dragging");
      this.kanbanService.toggleElementEditableState<T>(card, editable);
    });
  }

  private handleDeleteEvent<T extends HTMLElement>(
    card: T,
    eventName: "dblclick"
  ) {
    card.addEventListener(eventName, () => this.kanbanService.removeCard(card));
  }

  private attachCardEvents(card: HTMLDivElement): void {
    this.handleDragToggle(card, "dragstart", "false");
    this.handleDragToggle(card, "dragend", "true");
    this.handleDeleteEvent(card, "dblclick");
  }
  

  attachDragOverEvent(): void {
    this.droppables.forEach((droppable) => {
      droppable.addEventListener("dragover", (e: DragEvent) => {
        const draggingCard = this.kanbanService.getCurrentDraggingCard();
        const siblings = this.kanbanService.getAllCardsExpectCurrentDragging(droppable);
        const afterElement = siblings.find((child) => {
          const box = child.getBoundingClientRect();
          return this.kanbanService.checkAfterElement(e, box);
        });

        this.kanbanService.checkCardPlacement(droppable,afterElement || null,draggingCard);
      });
    });
  }

  attachAddEvent(): void {
    this.addButton.addEventListener("click", () => {
      this.attachCardEvents(
        <HTMLDivElement>this.kanbanService.addKanbanCard(this.todosCard)
      );
    });
  }

  init(): void {
    this.attachAddEvent();
    this.attachDragOverEvent();
  }
}
