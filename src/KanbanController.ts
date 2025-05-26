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

  attachDragOverEvent(): void {
    this.droppables.forEach((droppable: HTMLDivElement) => {
      droppable.addEventListener("dragover", (e: DragEvent) => {
        const currentlyDraggingElement: HTMLDivElement = <HTMLDivElement>(
          this.kanbanService.getCurrentDraggingCard()
        );
        const allCardsExceptDragging: HTMLDivElement[] = <HTMLDivElement[]>(
          this.kanbanService.getAllCardsExpectCurrentDragging(droppable)
        );

        const afterElement: HTMLDivElement | null = <HTMLDivElement | null>(
          allCardsExceptDragging.find((child: HTMLDivElement) => {
            const box: DOMRect = <DOMRect>child.getBoundingClientRect();
            return this.kanbanService.checkAfterElement(e, box);
          })
        );

        this.kanbanService.checkCardPlacement(
          droppable,
          afterElement,
          currentlyDraggingElement
        );
      });
    });
  }

  removeCard(newCard: HTMLDivElement) {
    newCard.remove();
  }

  toggleClass(newCard:HTMLDivElement,className:string){
        newCard.classList.toggle(className)
  }

  attachAddEvent(): void {
    this.addButton.addEventListener("click", (e: MouseEvent) => {
      const newCard: HTMLDivElement = this.kanbanService.addKanbanCard(
        this.todosCard
      );
      newCard.addEventListener("dragstart", (e: DragEvent) => {
        newCard.classList.toggle("dragging");
        this.kanbanService.toggleElementEditableState(newCard, "false");
      });
      newCard.addEventListener("dragend", (e: DragEvent) => {
        newCard.classList.toggle("dragging");
        this.kanbanService.toggleElementEditableState(newCard, "true");
      });

      newCard.addEventListener("dblclick", (e: MouseEvent) => {
        this.kanbanService.removeCard(newCard);
      });
    });
  }

  init(): void {
    this.attachAddEvent();
    this.attachDragOverEvent();
  }
}

