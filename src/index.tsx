import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Components/App'
import { FullCharacter, transfigure } from './DataModel/transfigure'

import ExampleCharacter from './example-character.ts'
import { PagesVisibleProvider } from './Hooks/usePagesVisibile.tsx'

export const CharacterContext = React.createContext<[FullCharacter, (newChar: FullCharacter) => void]>([{} as FullCharacter, ()=>{}])
export const BounceHistoryContext = React.createContext<[boolean, (newBounce: boolean) => void]>(false, ()=>{})

export const useCharacter = () => {
  return useContext(CharacterContext)
}

const Wrapper = () => {
  const [character, setCharacter] = useState(ExampleCharacter)
  const transfiguredCharacter = character != null ? transfigure(character) : null
  
  const [bouncing, setBouncing] = useState(false)
  const setBouncingInterceptor = (value) => {
    if (value === true) {
      setTimeout(() => {
        setBouncing(false)
      }, 500)
    }
    setBouncing(value)
  }

  const [visiblePages, setVisiblePages] = useState(["main", "inventory", "spells", "features", "items"])

  return (
    <CharacterContext.Provider value={[
      transfiguredCharacter, 
      setCharacter
    ]}>
      <BounceHistoryContext.Provider value={[
        bouncing,
        setBouncingInterceptor
      ]}>
        <PagesVisibleProvider value={[visiblePages, setVisiblePages]}>
          <App />
        </PagesVisibleProvider>
      </BounceHistoryContext.Provider>
    </CharacterContext.Provider>
  )
}

if (typeof document !== 'undefined' ) {
  const rootElement = document.getElementById( 'root' )
  if ( rootElement ) {
    const root = ReactDOM.createRoot( rootElement )
    root.render((
      <React.StrictMode>
        <Wrapper/>
      </React.StrictMode>
    ))
  }
}
