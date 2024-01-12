export default function Spinner() {
    return (
        <div className="flex justify-center items-center">
            <div className=" flex items-center justify-center animate-spin rounded-full w-8 h-8  bg-gradient-to-r from-green-400 to-indigo-500 ">
                <div className=" rounded-full w-4 h-4 bg-slate-900 "></div>
            </div>
        </div>
    )
}