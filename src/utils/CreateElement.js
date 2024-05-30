
export const createElement = (type, xCord, yCord, title, fontWeight, fontSize, setSelectedElement, setExportableObject) => {

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
        const prevLeft = Number(newElement.style.left.split("px")[0])
        const prevTop = Number(newElement.style.top.split("px")[0])
        console.log('prevLeft, prevTop', prevLeft, prevTop)
        setExportableObject((prev) => {
            return prev.map((ele) => {
                if (ele.xCord === prevLeft && ele.yCord === prevTop) {
                    return {
                        ...ele,
                        xCord: e.clientX,
                        yCord: e.clientY
                    };
                } else {
                    return ele;
                }
            });
        });
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