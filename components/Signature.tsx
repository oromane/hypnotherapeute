"use client"

import { useEffect } from "react"

export function Signature() {
    useEffect(() => {
        const style = "background: #708D79; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;"
        console.log("%cDeveloped by Romane", style, "https://github.com/oromane")
    }, [])
    return null
}