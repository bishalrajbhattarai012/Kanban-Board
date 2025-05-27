class KanbanService {
  private kanbanUtilityService: KanbanUtilityService;

  constructor() {
    this.kanbanUtilityService = new KanbanUtilityService();
  }

  getAddButton(): HTMLDivElement {
    const addButton: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(".btn")
    );
    return addButton;
  }


  createButtonElement(): HTMLButtonElement {
    const button: HTMLButtonElement = <HTMLButtonElement>(
      document.createElement("button")
    );
    button.textContent = "X";
    this.kanbanUtilityService.addClassToElement<HTMLButtonElement, string>(
      button,
      "delete"
    );
    return button;
  }

  toggleClass<T extends HTMLElement>(newCard: T, className: string): void {
    newCard.classList.toggle(className);
  }

  addKanbanCard(parent: HTMLDivElement): HTMLDivElement {
    const newCard: HTMLDivElement = <HTMLDivElement>(
      document.createElement("div")
    );
    this.kanbanUtilityService.addClassToElement(newCard,"kanban-card")
    newCard.draggable = true;
    this.toggleElementEditableState(newCard,"true")
    parent.appendChild(newCard);
    return newCard;
  }

  toggleElementEditableState<T extends HTMLElement>(
    card: T,
    state: string
  ): void {
    card.contentEditable = state;
  }

  checkAfterElement(e: DragEvent, box: DOMRect): boolean {
    return e.clientY < box.top + box.height;
  }

  getAllCardsExpectCurrentDragging(
    droppable: HTMLDivElement
  ): HTMLDivElement[] {
    const allCards: HTMLDivElement[] = <HTMLDivElement[]>(
      Array.from(droppable.querySelectorAll(".kanban-card:not(.dragging)"))
    );
    return allCards;
  }

  getCurrentDraggingCard(): HTMLDivElement {
    const draggingCard: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(".dragging")
    );
    return draggingCard;
  }

  getTodosCard(): HTMLDivElement {
    const card: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(".todo-kanban-cards")
    );
    return card;
  }

  getAllDroppableAreas(): HTMLDivElement[] {
    const droppables: HTMLDivElement[] = <HTMLDivElement[]>(
      Array.from(document.querySelectorAll(".kanban-cards"))
    );
    return droppables;
  }

  removeCard<T extends HTMLElement>(newCard: T) {
    newCard.remove();
  }

  checkCardPlacement(
    droppable: HTMLDivElement,
    afterElement: HTMLDivElement | null,
    currentlyDraggingElement: HTMLDivElement
  ): void {
    if (!currentlyDraggingElement) return;
    if (!afterElement) droppable.appendChild(currentlyDraggingElement);
    else droppable.insertBefore(currentlyDraggingElement, afterElement);
  }
}
