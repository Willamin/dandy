import React, { useState, useLocation } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './Components/App'
import { FullCharacter, transfigure } from './DataModel/transfigure'

import ExampleCharacter from './example-character.ts'

export const CharacterContext = React.createContext<[FullCharacter, (FullCharacter) => void]>([{} as FullCharacter, ()=>{}])

export const BounceHistoryContext = React.createContext<[boolean, (boolean) => void]>(false, ()=>{})

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

  return (
    <CharacterContext.Provider value={[
      transfiguredCharacter, 
      setCharacter
    ]}>
      <BounceHistoryContext.Provider value={[
        bouncing,
        setBouncingInterceptor
      ]}>
        <ScrollIntoView>
          <App />
        </ScrollIntoView>
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

const ScrollIntoView = ({ children }) => {
  const { hash } = window.location
  React.useEffect(() => {
    setTimeout(() => {
      if (!hash) { return }
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView()
        element.className += " target"
      }
    }, 0)
  }, [hash])

  return children
}