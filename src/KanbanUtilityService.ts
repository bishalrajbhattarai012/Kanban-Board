class KanbanUtilityService{

    addClassToElement<T extends HTMLElement, K extends string>(
        element: T,
        className: K
      ): void {
        element.classList.add(className);
      }

}