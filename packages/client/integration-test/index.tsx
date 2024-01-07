import React from 'react'
import ReactDOM from 'react-dom/client'

import SignUpForm from './demo-sign-up/SignUpForm.js'

const demos: Record<string, React.ComponentType> = {
  'Sign up': SignUpForm,
}

const App = () => {
  const [activeDemo, setActiveDemo] = React.useState(Object.keys(demos)[0])
  const ActiveDemo = demos[activeDemo]

  return (
    <div>
      <div>
        <p>Select display demo:</p>
        <div>
          {Object.keys(demos).map((name) => (
            <>
              <input
                checked={activeDemo === name}
                id={name}
                name="demo"
                onChange={(e) => setActiveDemo(e.target.value)}
                type="radio"
                value={name}
              />
              <label htmlFor={name}>{name}</label>
            </>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <ActiveDemo />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)