export class KanbanUtilityService {
  addClassToElement<T extends HTMLElement, K extends string>(element: T,className: K): void {
    element.classList.add(className);
  }

  toggleClass<T extends HTMLElement>(newCard: T, className: string): void {
    newCard.classList.toggle(className);
  }

  toggleElementEditableState<T extends HTMLElement>(card: T,state: string): void {
    card.contentEditable = state;
  }


}
