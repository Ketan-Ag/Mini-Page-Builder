import React from 'react'

const ModalForm = ({
    setisModalOpen,
    lableTitle,
    setLableTitle,
    lableXCord,
    setLableXCord,
    lableYCord,
    setLableYCord,
    lableFontSize,
    setLableFontSize,
    lableFontWeight,
    setLableFontWeight,
    createNewLable

}) => {

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            createNewLable();
        }} className='max-h-[100vh]'>
            <div className="flex justify-between items-center">
                <div className="">Edit Label</div>
                <div className="" onClick={() => { setisModalOpen(false) }}>X</div>
            </div>
            <div className="border-black border-t-[1px] w-full my-4"></div>
            <div className='flex flex-col gap-2 pb-5'>
                <div className="flex flex-col gap-2">
                    <label htmlFor="LabelText">Text</label>
                    <input required className='border-[##000000d9] border-[1px] py-2 pl-2 rounded-sm outline-none' type="text" id="LabelText" name="LabelText" value={lableTitle} onChange={(e) => { setLableTitle(e.target.value) }} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="XCord">X</label>
                    <input required className='border-[##000000d9] border-[1px] py-2 pl-2 rounded-sm outline-none' type="number" id="XCord" name="XCord" value={lableXCord} onChange={(e) => { setLableXCord(e.target.value) }} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="YCord">Y</label>
                    <input required className='border-[##000000d9] border-[1px] py-2 pl-2 rounded-sm outline-none' type="number" id="YCord" name="YCord" value={lableYCord} onChange={(e) => { setLableYCord(e.target.value) }} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="FontSize">Font Size</label>
                    <input required className='border-[##000000d9] border-[1px] py-2 pl-2 rounded-sm outline-none' type="number" id="FontSize" name="FontSize" value={lableFontSize} onChange={(e) => { setLableFontSize(e.target.value) }} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="FontWeight">Font Weight</label>
                    <input required className='border-[##000000d9] border-[1px] py-2 pl-2 rounded-sm outline-none' type="number" id="FontWeight" name="FontWeight" value={lableFontWeight} onChange={(e) => { setLableFontWeight(e.target.value) }} />
                </div>
                <div className="">
                    <button className='bg-[#0044C1] py-[10px] px-[20px] text-white'>Save Changes</button>
                </div>

            </div>

        </form>
    )
}

export default ModalForm