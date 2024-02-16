import { useEffect, useRef, useState } from "react"
import { Action } from "../App";

interface DeleteListProps {
    dispatch: React.Dispatch<Action>
}

export default function DeleteList(props: Readonly<DeleteListProps>) {
    const { dispatch } = props
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpen)
        {
            ref.current?.showModal()
        }
        else
        {
            ref.current?.close()
        }
    }, [isOpen])

    return (
        <>
            <div className="delete_all_container">
                <button className="delete_all" onClick={() => setIsOpen(true)}>Delete All</button>
            </div>
            <dialog ref={ref}>
                Are You Sure?
                <div className="confirm_button_container">
                    <button className="confirm_button confirm_yes" onClick={() => { dispatch({ type: "del_all" }); setIsOpen(false); }}>Yes</button>
                    <button className="confirm_button confirm_no" onClick={() => setIsOpen(false)}>No</button>
                </div>
            </dialog>
        </>
    )
}