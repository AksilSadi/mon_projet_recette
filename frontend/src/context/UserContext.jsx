'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const cookieUser = Cookies.get('user')
    if (cookieUser) {
      try {
        setUser(JSON.parse(cookieUser))
      } catch (err) {
        console.error("Erreur de parsing cookie 'user'", err)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
