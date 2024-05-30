
export const createElement = (type, xCord, yCord, title, fontWeight, fontSize, setSelectedElement) => {

    const newElement = document.createElement(type);
    newElement.draggable = true;
    newElement.classList.add("Draggable")
    newElement.classList.add(`Draggable${type}`)
    newElement.style.left = `${xCord}px`
    newElement.style.top = `${yCord}px`
    if (type === "div") {
        newElement.textContent = title;
        newElement.style.fontWeight = fontWeight
        newElement.style.fontSize = `${fontSize}px`
    }
    if (type === "button") newElement.innerHTML = "Button"
    newElement.ondragend = (e) => {
        newElement.style.left = `${e.clientX}px`
        newElement.style.top = `${e.clientY}px`
    }
    newElement.onclick = (e) => {
        if (type === "div") {
            if (e.target.classList.contains("selecteddiv")) {
                e.target.classList.remove("selecteddiv")
                setSelectedElement(null)
            } else {
                const selectedDivs = document.querySelectorAll(".selecteddiv");
                if (selectedDivs.length > 0) {
                    selectedDivs.forEach((ele) => { ele.classList.remove("selecteddiv") })
                }
                setSelectedElement(newElement)
                e.target.classList.add("selecteddiv")
            }
        } else {
            e.target.classList.toggle(`selected${type}`);
        }

    }

    return newElement;

}