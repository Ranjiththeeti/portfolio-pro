import React, { useEffect, useState } from 'react'
import { auth, db } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import PortfolioCard from '../components/PortfolioCard'
import { useNavigate } from 'react-router-dom'

export default function Preview(){
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const [publishing, setPublishing] = useState(false)
  const nav = useNavigate()

  useEffect(()=> onAuthStateChanged(auth, setUser), [])
  useEffect(()=>{ (async()=>{
    if(!user) return
    const snap = await getDoc(doc(db, 'portfolios', user.uid))
    if (snap.exists()) setData(snap.data())
  })() }, [user])

  if(!user) return <p className="text-center mt-10">Please login.</p>
  if(!data) return <p className="text-center mt-10">No data. Go to Form and save.</p>

  const publish = async ()=>{
    setPublishing(true)
    const username = data.username || (user.email?.split('@')[0] ?? 'user')
    await setDoc(doc(db, 'published', username), {
      ...data,
      uid: user.uid,
      username,
      slug: username,
    }, { merge: true })
    setPublishing(false)
    nav(`/u/${username}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <PortfolioCard data={data} />
      <div className="mt-6 flex gap-3">
        <button onClick={()=> nav('/form')} className="px-4 py-2 rounded-lg border">Edit</button>
        <button onClick={publish} disabled={publishing} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">{publishing?'Publishing…':'Publish'}</button>
      </div>
    </div>
  )
}
