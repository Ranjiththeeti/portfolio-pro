import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { auth, provider } from '../utils/firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'

export default function Navbar(){
  const [user, setUser] = useState(null)
  const nav = useNavigate()
  const loc = useLocation()

  useEffect(()=> onAuthStateChanged(auth, setUser), [])

  const login = async ()=>{
    await signInWithPopup(auth, provider)
    if(loc.pathname === '/') nav('/form')
  }
  const logout = async ()=>{
    await signOut(auth)
    nav('/')
  }

  return (
    <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold">Portfolio Generator</Link>
        <nav className="flex items-center gap-3">
          <Link to="/form" className="text-sm underline">Form</Link>
          <Link to="/preview" className="text-sm underline">Preview</Link>
          {user ? (
            <button onClick={logout} className="px-3 py-1 rounded bg-gray-900 text-white text-sm">Logout</button>
          ) : (
            <button onClick={login} className="px-3 py-1 rounded border text-sm">Login with Google</button>
          )}
        </nav>
      </div>
    </header>
  )
}
