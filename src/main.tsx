import { Provider } from 'react-redux'
import { createAppStore, loginSuccess } from '@repo/shared-store'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // add this so host loads Tailwind once
import App from './App.tsx'

const store = createAppStore()
if (import.meta.env.DEV && import.meta.env.VITE_DEV_MODULE === 'profile') {
  store.dispatch(loginSuccess({ id: 'dev@example.com', role: 'USER', token: 'dev' }))
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
