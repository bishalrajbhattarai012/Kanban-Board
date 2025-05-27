"use strict";
class KanbanUtilityService {
    addClassToElement(element, className) {
        element.classList.add(className);
    }
    toggleClass(newCard, className) {
        newCard.classList.toggle(className);
    }
    toggleElementEditableState(card, state) {
        card.contentEditable = state;
    }
}
