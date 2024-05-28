import React, { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal';
import ModalForm from '../ModalForm/ModalForm';
import { exportJson } from '../../utils/ExportJson';

const Home = () => {

    const labelRef = useRef(null);
    const inputRef = useRef(null);
    const buttonRef = useRef(null);
    const screenRef = useRef(null);
    const [draggables, setDraggables] = useState([])
    const [isModalOpen, setisModalOpen] = useState(false);

    const [lableTitle, setLableTitle] = useState("This is a label");
    const [lableXCord, setLableXCord] = useState();
    const [lableYCord, setLableYCord] = useState();
    const [lableFontSize, setLableFontSize] = useState(16)
    const [lableFontWeight, setLableFontWeight] = useState(300);
    const [selectedElement, setSelectedElement] = useState(null);
    const [isAlreadyFormed, setIsAlreadyFormed] = useState(false);
    const selectedElementRef = useRef();

    const [ExportableObject, setExportableObject] = useState([])


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            width: '40vw',
            transform: 'translate(-50%, -50%)'
        },
    };

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
                setLableXCord(prev => e.clientX)
                setLableYCord(prev => e.clientY)
                setisModalOpen(prev => true);

                // var rect = label.getBoundingClientRect();
                // var x = e.clientX - rect.left;
                // var y = e.clientY - rect.top;
                // console.log('first', e.clientX)
                // console.log('sec', rect)

                // if (isModalOpen == false) {
                //     newElement.style.left = `${lableXCord}px`
                //     newElement.style.top = `${lableYCord}px`
                //     setDraggables((prevDraggables) => [...prevDraggables, newElement]);
                //     screen.append(newElement);
                // }


            });


            input.addEventListener("dragstart", e => {
                label.classList.add("opacity-50")
            })

            input.addEventListener("dragend", e => {
                label.classList.remove("opacity-50")

                const newElement = document.createElement('input');
                newElement.draggable = true
                newElement.classList.add("Draggable")
                newElement.classList.add("DraggableInput")
                newElement.style.position = "absolute"
                newElement.style.left = `${e.clientX}px`
                newElement.style.top = `${e.clientY}px`
                newElement.style.fontWeight = 700
                setDraggables((prevDraggables) => [...prevDraggables, newElement]);
                screen.append(newElement)
                const newInputObject = {
                    tag: "input",
                    xCord: e.clientX,
                    yCord: e.clientY,
                }
                setExportableObject(prevExportableObject => [...prevExportableObject, newInputObject]);
            });

            buttonDrag.addEventListener("dragstart", e => {
                buttonDrag.classList.add("opacity-50")
            })

            buttonDrag.addEventListener("dragend", e => {
                buttonDrag.classList.remove("opacity-50")
                if (e.clientX >= parseInt(window.innerWidth * 0.8)) {
                    alert("Cannot place in sidebar")
                } else {
                    const newElement = document.createElement("button");
                    newElement.classList.add("Draggable")
                    newElement.classList.add("DraggableButton")
                    newElement.innerHTML = "Button"
                    newElement.draggable = true
                    newElement.style.position = "absolute"
                    newElement.style.left = `${e.clientX}px`
                    newElement.style.top = `${e.clientY}px`
                    setDraggables((prevDraggables) => [...prevDraggables, newElement]);
                    screen.append(newElement)
                    const newButtonObject = {
                        tag: "button",
                        xCord: e.clientX,
                        yCord: e.clientY,
                    }
                    setExportableObject(prevExportableObject => [...prevExportableObject, newButtonObject]);
                }
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


    useEffect(() => {
        const handleMouseDown = (e) => {

            if (e.target == screenRef.current) {
                // selectedElementRef.current = null
                // setSelectedElement(null);
                const selectedLables = document.querySelectorAll(".selectedLable")
                selectedLables.forEach((ele) => {
                    ele.classList.remove("selectedLable")
                })

            } else {

                document.querySelectorAll(".Draggable").forEach((ele) => {
                    if (ele == e.target) {
                        setSelectedElement(prev => ele);
                        selectedElementRef.current = ele;
                        ele.classList.add("selectedLable")
                    }
                })
            }

        }

        screenRef.current.addEventListener("mousedown", handleMouseDown)

        return () => {
            screenRef.current.removeEventListener("mousedown", () => { });
        }
    }, [])


    const createNewLable = () => {
        if (isAlreadyFormed) {
            const prevLeft = selectedElementRef.current.style.left
            const prevTop = selectedElementRef.current.style.top

            selectedElementRef.current.textContent = lableTitle;
            selectedElementRef.current.style.left = `${lableXCord}px`
            selectedElementRef.current.style.top = `${lableYCord}px`
            selectedElementRef.current.style.fontWeight = lableFontWeight
            selectedElementRef.current.style.fontSize = `${lableFontSize}px`

            setExportableObject((prev) => {
                return prev.map((obj) => {
                    if (obj && `${obj.xCord}px` == prevLeft && `${obj.yCord}px` == prevTop) {
                        return {
                            ...obj,
                            title: lableTitle,
                            xCord: parseInt(lableXCord),
                            yCord: parseInt(lableYCord),
                            fontSize: parseInt(lableFontSize),
                            fontWeight: parseInt(lableFontWeight)
                        }
                    } else return obj
                })
            })

        } else {
            const newElement = document.createElement('div');
            newElement.textContent = lableTitle;
            newElement.draggable = true;
            newElement.classList.add("Draggable")
            newElement.classList.add("DraggableLable")
            newElement.style.position = "absolute"
            newElement.style.left = `${lableXCord}px`
            newElement.style.top = `${lableYCord}px`
            newElement.style.fontWeight = lableFontWeight
            newElement.style.fontSize = `${lableFontSize}px`
            setDraggables((prevDraggables) => [...prevDraggables, newElement]);
            screenRef.current.append(newElement);
            const newLableObject = {
                tag: "div",
                title: lableTitle,
                xCord: parseInt(lableXCord),
                yCord: parseInt(lableYCord),
                fontSize: parseInt(lableFontSize),
                fontWeight: parseInt(lableFontWeight)
            }
            setExportableObject(prevExportableObject => [...prevExportableObject, newLableObject]);
        }
        setisModalOpen(prev => false)

    }


    draggables.forEach(draggable => {

        draggable.addEventListener('dragend', (e) => {
            const left = Number(draggable.style.left.split("px")[0])
            const top = Number(draggable.style.top.split("px")[0])
            setExportableObject((prev) => {
                return prev.map((obj) => {
                    if (obj && obj.xCord == left && obj.yCord == top) {
                        return {
                            ...obj,
                            xCord: e.clientX,
                            yCord: e.clientY
                        }
                    } else return obj
                })
            })
            draggable.style.left = `${e.clientX}px`
            draggable.style.top = `${e.clientY}px`


        })
    })

    useEffect(() => {
        //useMemo or useCallBack
        localStorage.removeItem("pageLayout");
        localStorage.setItem("pageLayout", JSON.stringify(ExportableObject));

    }, [ExportableObject])


    useEffect(() => {
        if (selectedElement != null) {
            window.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && selectedElement.classList.contains("selectedLable")) {
                    setIsAlreadyFormed(prev => true)
                    setisModalOpen(prev => true)
                    setLableTitle(selectedElement.textContent)
                    setLableYCord(Number(selectedElement.style.top.split("px")[0]))
                    setLableXCord(Number(selectedElement.style.left.split("px")[0]))
                    setLableFontSize(Number(selectedElement.style.fontSize.split("px")[0]))
                    setLableFontWeight(parseInt(selectedElement.style.fontWeight))
                }
                else if (e.key === "Delete") {
                    screenRef.current.childNodes.forEach((ele) => {
                        if (ele === selectedElementRef.current) {
                            setDraggables(draggables => draggables.filter(eleDraggables => {
                                return eleDraggables !== ele
                            }))
                            screenRef.current.removeChild(ele);
                        }
                        else {
                            ele.classList.remove("selectedLable");
                        }
                    })

                    setExportableObject((prev) => {
                        return prev.filter(ele => {
                            // return ele!=selectedElementRef.current
                            return (`${ele.xCord}` != selectedElementRef.current.style.left && `${ele.yCord}` != selectedElementRef.current.style.top)
                        })
                    })
                }

            })

            return () => {
                window.removeEventListener("keydown", () => { })
            }
        }
    }, [selectedElement])


    useEffect(() => {
        Modal.setAppElement("body")
    }, [])


    return (
        <div className='h-screen w-screen flex overflow-hidden'>
            <div className="bg-red-400 w-4/5 flex-grow relative select-none">
                <div ref={screenRef} className="h-full pageBuilderScreen">
                    <button
                        onClick={() => {
                            exportJson(ExportableObject)
                            setExportableObject([])
                        }}
                        className='absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded outline-none'
                    >Export</button>
                </div>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={() => { setisModalOpen(false) }}
                    style={customStyles}
                >
                    <ModalForm
                        setisModalOpen={setisModalOpen}
                        lableTitle={lableTitle}
                        setLableTitle={setLableTitle}
                        lableXCord={lableXCord}
                        setLableXCord={setLableXCord}
                        lableYCord={lableYCord}
                        setLableYCord={setLableYCord}
                        lableFontSize={lableFontSize}
                        setLableFontSize={setLableFontSize}
                        lableFontWeight={lableFontWeight}
                        setLableFontWeight={setLableFontWeight}
                        createNewLable={createNewLable}
                    />


                </Modal>

            </div>
            <div className="bg-[#2D2D2D] w-1/5 flex-grow ml-auto p-5">
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