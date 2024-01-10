'use client';

export default function Popup({
    message,
    visible,
    setPopUpVisibility
}:{
    message: string,
    visible: Boolean,
    setPopUpVisibility: (option: boolean) => void

}){

    const display = visible? "flex": "hidden";
    
    return (
        <>
        <div className={`fixed ${display} z-50   flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 gap-5 bg-slate-600 border-green-400 border-4 rounded-lg`}>
            <h1 className="font-bold text-xl">{message}</h1>
            <button className="w-full transition duration-300 p-4 font-bold border-green-400 border-4 rounded-lg hover:border-slate-200 hover:text-green-400" onClick={(e)=> setPopUpVisibility(false)}>Ok</button>
        </div>
        <div className={`fixed ${display} h-dvh z-10  w-lvw top-0 left-0 backdrop-blur-sm  opacity-80`}></div>
        </>
    )
}