import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../utils/firebase'
import { doc, getDoc } from 'firebase/firestore'
import PortfolioCard from '../components/PortfolioCard'

export default function PublicPortfolio(){
  const { username } = useParams()
  const [data, setData] = useState(null)

  useEffect(()=>{ (async()=>{
    if(!username) return
    const snap = await getDoc(doc(db, 'published', username))
    if (snap.exists()) setData(snap.data())
  })() }, [username])

  if (!data) return <p className="text-center mt-10">Loading portfolio…</p>
  return <div className="max-w-4xl mx-auto px-4 py-8"><PortfolioCard data={data} /></div>
}
