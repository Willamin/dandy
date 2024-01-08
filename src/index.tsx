import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Components/App'
import { FullCharacter, transfigure } from './DataModel/transfigure'

import ExampleCharacter from './example-character.ts'

export const CharacterContext = React.createContext<[FullCharacter, (FullCharacter) => ()]>([{} as FullCharacter, ()=>{}])

const Wrapper = () => {
  const [character, setCharacter] = useState(ExampleCharacter)
  const transfiguredCharacter = character != null ? transfigure(character) : null

  return (
    <CharacterContext.Provider value={[
      transfiguredCharacter, 
      setCharacter
    ]}>
      <App />
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
