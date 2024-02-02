import React, { useContext, createContext } from 'react'

const PagesVisibleContext = createContext()
export const PagesVisibleProvider = PagesVisibleContext.Provider

export const usePagesVisible = () => {
    const [get, set] = useContext(PagesVisibleContext)

    const toggle = () => {
        if (get.length === 1 && get[0] == "main") { set(["inventory"]) }
        else if (get.length === 1 && get[0] == "inventory") { set(["spells"]) }
        else if (get.length === 1 && get[0] == "spells") { set(["features"]) }
        else if (get.length === 1 && get[0] == "features") { set(["items"]) }
        else if (get.length === 1 && get[0] == "items") { set(["main"]) }
        else { set(["main"]) }
    }

    const reset = () => {
        set(["main", "inventory", "spells", "features", "items"])
    }

    return [get, set, toggle, reset]
}