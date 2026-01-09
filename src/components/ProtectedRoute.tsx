import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import type { RootState } from '@repo/shared-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
