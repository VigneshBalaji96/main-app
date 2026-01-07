import { Provider } from 'react-redux'
import { createAppStore } from '@repo/shared-store'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // add this so host loads Tailwind once
import App from './App.tsx'

const store = createAppStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
