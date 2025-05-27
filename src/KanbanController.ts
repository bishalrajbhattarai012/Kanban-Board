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

  private handleDragStart<T extends HTMLElement>(card: T): void {
    this.kanbanService.toggleClass<T>(card, "dragging");
    this.kanbanService.toggleElementEditableState<T>(card, "false");
  }

  private handleDragEnd<T extends HTMLElement>(card: T): void {
    this.kanbanService.toggleClass<T>(card, "dragging");
    this.kanbanService.toggleElementEditableState<T>(card, "true");
  }

  private attachCardEvents(card: HTMLDivElement): void {
    card.addEventListener("dragstart", () => this.handleDragStart(card));
    card.addEventListener("dragend", () => this.handleDragEnd(card));
    card.addEventListener("dblclick", () => this.kanbanService.removeCard(card));
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

        this.kanbanService.checkCardPlacement(
          droppable,
          afterElement || null,
          draggingCard
        );
      });
    });
  }

  attachAddEvent(): void {
    this.addButton.addEventListener("click", () => {
      const newCard = this.kanbanService.addKanbanCard(this.todosCard);
      this.attachCardEvents(newCard);
    });
  }

  init(): void {
    this.attachAddEvent();
    this.attachDragOverEvent();
  }
}
