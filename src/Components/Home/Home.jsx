import React, { useEffect, useRef, useState } from 'react'

const Home = () => {

    const labelRef = useRef(null);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const screenRef = useRef(null);
    const [draggables, setDraggables] = useState([])

    useEffect(() => {
        const label = labelRef.current;
        const screen = screenRef.current;
        const input = inputRef.current;
        const buttonDrag = buttonRef.current

        if (label && input && screen && buttonDrag) {
            label.addEventListener("dragstart", e => {
                
            })

            label.addEventListener("dragend", e => {
                label.classList.remove("opacity-50")
                const newElement = document.createElement('div');
                newElement.textContent = 'I am a new child element';
                newElement.draggable = true
                // newElement.classList.add("NewItemAdded");
                newElement.classList.add("DraggableLable")
                newElement.style.position = "absolute"
                newElement.style.left = `${e.clientX}px`
                newElement.style.top = `${e.clientY}px`
                // draggedElement.current = newElement;
                setDraggables((prevDraggables) => [...prevDraggables, newElement]);
                screen.append(newElement);
            });


            input.addEventListener("dragstart", e => {
                label.classList.add("opacity-50")
            })

            input.addEventListener("dragend", e => {
                label.classList.remove("opacity-50")

                const newElement = document.createElement('input');
                newElement.draggable = true
                newElement.classList.add("DraggableInput")
                newElement.style.position = "absolute"
                newElement.style.left = `${e.clientX}px`
                newElement.style.top = `${e.clientY}px`
                setDraggables((prevDraggables) => [...prevDraggables, newElement]);
                screen.append(newElement)
            });

            buttonDrag.addEventListener("dragstart", e => {
                buttonDrag.classList.add("opacity-50")
            })

            buttonDrag.addEventListener("dragend", e => {
                buttonDrag.classList.remove("opacity-50")
                const newElement = document.createElement("button");
                newElement.classList.add("DraggableButton")
                newElement.innerHTML = "Button"
                newElement.draggable = true
                newElement.style.position = "absolute"
                newElement.style.left = `${e.clientX}px`
                newElement.style.top = `${e.clientY}px`
                setDraggables((prevDraggables) => [...prevDraggables, newElement]);
                screen.append(newElement)
            });

            screen.addEventListener('dragover', (e) => {
                e.preventDefault();
            });
        }

        return () => {
            if (label && input && screen && buttonDrag) {
                label.removeEventListener('dragstart', () => { });
                label.removeEventListener('dragend', () => { });
                input.removeEventListener('dragstart', () => { });
                input.removeEventListener('dragend', () => { });
                buttonDrag.removeEventListener('dragstart', () => { });
                buttonDrag.removeEventListener('dragend', () => { });
                screen.removeEventListener('dragover', () => { });
            }
        };

    }, [])

    
    draggables.forEach(draggable => {

        draggable.addEventListener('dragend', (e) => {
            draggable.style.left = `${e.clientX}px`
            draggable.style.top = `${e.clientY}px`
        })
    })


    return (
        <div className='h-screen w-screen flex overflow-hidden'>
            <div className="bg-red-400 flex-grow">
                <div ref={screenRef} className="h-full pageBuilderScreen"></div>
            </div>
            <div className="bg-[#2D2D2D] w-[20vw] ml-auto p-5">
                <div className='font-semibold text-2xl text-white select-none'>Blocks</div>
                <div className="flex flex-col mt-5 gap-2">
                    <div ref={labelRef} className="p-2 bg-white rounded-sm cursor-move flex gap-2 items-center paigeBuilderLabel" draggable="true">
                        <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.375 0.375H1.125C0.492188 0.375 0 0.902344 0 1.5V3.75C0 4.38281 0.492188 4.875 1.125 4.875H3.375C3.97266 4.875 4.5 4.38281 4.5 3.75V1.5C4.5 0.902344 3.97266 0.375 3.375 0.375ZM3.375 6H1.125C0.492188 6 0 6.52734 0 7.125V9.375C0 10.0078 0.492188 10.5 1.125 10.5H3.375C3.97266 10.5 4.5 10.0078 4.5 9.375V7.125C4.5 6.52734 3.97266 6 3.375 6ZM3.375 11.625H1.125C0.492188 11.625 0 12.1523 0 12.75V15C0 15.6328 0.492188 16.125 1.125 16.125H3.375C3.97266 16.125 4.5 15.6328 4.5 15V12.75C4.5 12.1523 3.97266 11.625 3.375 11.625ZM10.125 0.375H7.875C7.24219 0.375 6.75 0.902344 6.75 1.5V3.75C6.75 4.38281 7.24219 4.875 7.875 4.875H10.125C10.7227 4.875 11.25 4.38281 11.25 3.75V1.5C11.25 0.902344 10.7227 0.375 10.125 0.375ZM10.125 6H7.875C7.24219 6 6.75 6.52734 6.75 7.125V9.375C6.75 10.0078 7.24219 10.5 7.875 10.5H10.125C10.7227 10.5 11.25 10.0078 11.25 9.375V7.125C11.25 6.52734 10.7227 6 10.125 6ZM10.125 11.625H7.875C7.24219 11.625 6.75 12.1523 6.75 12.75V15C6.75 15.6328 7.24219 16.125 7.875 16.125H10.125C10.7227 16.125 11.25 15.6328 11.25 15V12.75C11.25 12.1523 10.7227 11.625 10.125 11.625Z" fill="#D5D5D5" />
                        </svg>
                        <div className="">Label</div>
                    </div>
                    <div ref={inputRef} className="p-2 bg-white rounded-sm cursor-move flex gap-2 items-center paigeBuilderInput" draggable="true">
                        <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.375 0.375H1.125C0.492188 0.375 0 0.902344 0 1.5V3.75C0 4.38281 0.492188 4.875 1.125 4.875H3.375C3.97266 4.875 4.5 4.38281 4.5 3.75V1.5C4.5 0.902344 3.97266 0.375 3.375 0.375ZM3.375 6H1.125C0.492188 6 0 6.52734 0 7.125V9.375C0 10.0078 0.492188 10.5 1.125 10.5H3.375C3.97266 10.5 4.5 10.0078 4.5 9.375V7.125C4.5 6.52734 3.97266 6 3.375 6ZM3.375 11.625H1.125C0.492188 11.625 0 12.1523 0 12.75V15C0 15.6328 0.492188 16.125 1.125 16.125H3.375C3.97266 16.125 4.5 15.6328 4.5 15V12.75C4.5 12.1523 3.97266 11.625 3.375 11.625ZM10.125 0.375H7.875C7.24219 0.375 6.75 0.902344 6.75 1.5V3.75C6.75 4.38281 7.24219 4.875 7.875 4.875H10.125C10.7227 4.875 11.25 4.38281 11.25 3.75V1.5C11.25 0.902344 10.7227 0.375 10.125 0.375ZM10.125 6H7.875C7.24219 6 6.75 6.52734 6.75 7.125V9.375C6.75 10.0078 7.24219 10.5 7.875 10.5H10.125C10.7227 10.5 11.25 10.0078 11.25 9.375V7.125C11.25 6.52734 10.7227 6 10.125 6ZM10.125 11.625H7.875C7.24219 11.625 6.75 12.1523 6.75 12.75V15C6.75 15.6328 7.24219 16.125 7.875 16.125H10.125C10.7227 16.125 11.25 15.6328 11.25 15V12.75C11.25 12.1523 10.7227 11.625 10.125 11.625Z" fill="#D5D5D5" />
                        </svg>
                        <div className="">Input</div>
                    </div>
                    <div ref={buttonRef} className="p-2 bg-white rounded-sm cursor-move flex gap-2 items-center paigeBuilderButton" draggable="true">
                        <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.375 0.375H1.125C0.492188 0.375 0 0.902344 0 1.5V3.75C0 4.38281 0.492188 4.875 1.125 4.875H3.375C3.97266 4.875 4.5 4.38281 4.5 3.75V1.5C4.5 0.902344 3.97266 0.375 3.375 0.375ZM3.375 6H1.125C0.492188 6 0 6.52734 0 7.125V9.375C0 10.0078 0.492188 10.5 1.125 10.5H3.375C3.97266 10.5 4.5 10.0078 4.5 9.375V7.125C4.5 6.52734 3.97266 6 3.375 6ZM3.375 11.625H1.125C0.492188 11.625 0 12.1523 0 12.75V15C0 15.6328 0.492188 16.125 1.125 16.125H3.375C3.97266 16.125 4.5 15.6328 4.5 15V12.75C4.5 12.1523 3.97266 11.625 3.375 11.625ZM10.125 0.375H7.875C7.24219 0.375 6.75 0.902344 6.75 1.5V3.75C6.75 4.38281 7.24219 4.875 7.875 4.875H10.125C10.7227 4.875 11.25 4.38281 11.25 3.75V1.5C11.25 0.902344 10.7227 0.375 10.125 0.375ZM10.125 6H7.875C7.24219 6 6.75 6.52734 6.75 7.125V9.375C6.75 10.0078 7.24219 10.5 7.875 10.5H10.125C10.7227 10.5 11.25 10.0078 11.25 9.375V7.125C11.25 6.52734 10.7227 6 10.125 6ZM10.125 11.625H7.875C7.24219 11.625 6.75 12.1523 6.75 12.75V15C6.75 15.6328 7.24219 16.125 7.875 16.125H10.125C10.7227 16.125 11.25 15.6328 11.25 15V12.75C11.25 12.1523 10.7227 11.625 10.125 11.625Z" fill="#D5D5D5" />
                        </svg>
                        <div className="">Button</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home