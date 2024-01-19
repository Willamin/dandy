export const useCompendiumJump = (title) => {
    return () => {
        const compendiumCard = document.getElementById(`compendium-${title.replace(" ", "-")}`)
                
        if (compendiumCard) {
            compendiumCard.classList.add("target")
            compendiumCard.scrollIntoView({ behavior: "smooth", block: "start" })

            setTimeout(() => {
                compendiumCard.classList.remove("target")
            }, 1000)
        }
    }
}