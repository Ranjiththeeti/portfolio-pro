import React from 'react'
export const GRADIENTS = [
  'from-rose-200 via-pink-200 to-purple-200',
  'from-sky-200 via-cyan-200 to-emerald-200',
  'from-amber-200 via-orange-200 to-rose-200',
  'from-indigo-200 via-purple-200 to-pink-200',
]
export default function ThemeSelector({ value, onChange }){
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">Theme</span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {GRADIENTS.map((g,i)=>(
          <button key={i}
            type="button"
            onClick={()=> onChange(g)}
            className={`h-10 rounded-lg bg-gradient-to-br ${g} border ${value===g?'ring-2 ring-black':''}`}
            title={g}
          />
        ))}
      </div>
    </label>
  )
}
