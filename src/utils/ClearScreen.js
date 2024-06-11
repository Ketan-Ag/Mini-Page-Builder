export const clearScreen = (screenRef) => {
    localStorage.clear();
    const elements = document.querySelectorAll(".Draggable");
    elements.forEach((ele) => {
        screenRef.current.removeChild(ele);
    })
}