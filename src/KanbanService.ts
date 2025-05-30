export class KanbanService {

  constructor() {}

  getAddButton(): HTMLDivElement {
    const addButton: HTMLDivElement = <HTMLDivElement>(
      document.querySelector(".btn")
    );
    return addButton;
  }

  toggleClass<T extends HTMLElement>(newCard: T, className: string): void {
    newCard.classList.toggle(className);
  }

  addClassToElement<T extends HTMLElement, K extends string>(element: T,className: K): void {
    element.classList.add(className);
  }


  addKanbanCard(parent: HTMLDivElement): HTMLDivElement {
    const newCard: HTMLDivElement = <HTMLDivElement>(
      document.createElement("div")
    );
    this.addClassToElement(newCard,"kanban-card")
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


  getAfterElement(siblings: HTMLDivElement[], e: DragEvent) {
    const afterElement = siblings.find((child: HTMLDivElement) => {
      const box = child.getBoundingClientRect();
      return this.checkAfterElement(e, box);
    });
    return afterElement;
  }


  handleCardPlacement(droppables:HTMLDivElement[]){
    droppables.forEach((droppable) => {
      droppable.addEventListener("dragover", (e: DragEvent) => {
        const draggingCard = this.getCurrentDraggingCard();
        const siblings =
          this.getAllCardsExpectCurrentDragging(droppable);
        const afterElement = this.getAfterElement(siblings,e)
        this.checkCardPlacement(droppable, afterElement,draggingCard
        );
      });
    });
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
    afterElement: HTMLDivElement | undefined,
    currentlyDraggingElement: HTMLDivElement
  ): void {
    if (!currentlyDraggingElement) return;
    if (!afterElement) droppable.appendChild(currentlyDraggingElement);
    else droppable.insertBefore(currentlyDraggingElement, afterElement);
  }
}
