class KanbanService {
  getAddButton(): HTMLDivElement {
    const addButton: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(".btn")
    );
    return addButton;
  }

  createDivElememt(): HTMLDivElement {
    return document.createElement("div");
  }

  createButtonElement(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement("button");
    button.textContent = "X";
    button.classList.add("delete");
    return button;
  }

  toggleClass(newCard: HTMLDivElement, className: string) {
    newCard.classList.toggle(className);
  }

  addKanbanCard(parent: HTMLDivElement): HTMLDivElement {
    const newCard: HTMLDivElement = <HTMLDivElement>(
      document.createElement("div")
    );
    newCard.classList.add("kanban-card");
    newCard.draggable = true;
    newCard.contentEditable = "true";
    parent.appendChild(newCard);
    return newCard;
  }

  toggleElementEditableState(card: HTMLDivElement, state: string): void {
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

  removeCard(newCard: HTMLDivElement) {
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
