import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db, storage, ts } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import ThemeSelector from '../components/ThemeSelector'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  about: '',
  skills: '',
  projects: [],
  github: '',
  linkedin: '',
  instagram: '',
  resumeUrl: '',
  photoUrl: '',
  theme: 'from-rose-200 via-pink-200 to-purple-200',
  username: '',
}

async function uploadToStorage(uid, file, folder) {
  const ext = file.name.split('.').pop().toLowerCase()
  if (folder === 'photos' && !['jpg', 'jpeg', 'png'].includes(ext)) {
    alert('Only JPG/PNG images allowed for profile photo.')
    return null
  }
  if (folder === 'resumes' && ext !== 'pdf') {
    alert('Only PDF files allowed for resume.')
    return null
  }
  const r = storageRef(storage, `${folder}/${uid}/${Date.now()}-${file.name}`)
  await uploadBytes(r, file)
  return await getDownloadURL(r)
}

export default function PortfolioForm() {
  const [user, setUser] = useState(null)
  const [data, setData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => onAuthStateChanged(auth, setUser), [])
  useEffect(() => {
    (async () => {
      if (!user) return
      const snap = await getDoc(doc(db, 'portfolios', user.uid))
      if (snap.exists()) setData({ ...emptyForm, ...snap.data() })
      else setData(d => ({ ...d, email: user.email || '' }))
      setLoading(false)
    })()
  }, [user])

  if (!user) return <p className="text-center">Please login.</p>
  if (loading) return <p className="text-center">Loading…</p>

  const setField = (k, v) => setData(d => ({ ...d, [k]: v }))
  const updateProject = (i, k, v) =>
    setData(d => ({
      ...d,
      projects: d.projects.map((p, idx) =>
        idx === i ? { ...p, [k]: v } : p
      ),
    }))

  const onFile = async (e, field, folder) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    const url = await uploadToStorage(user.uid, file, folder)
    if (url) setField(field, url)
  }

  const saveDraft = async () => {
    if (!user) return
    setSaving(true)
    const baseUsername = (data.username || (data.email?.split('@')[0] ?? 'user'))
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '')
    await setDoc(
      doc(db, 'portfolios', user.uid),
      {
        ...data,
        username: baseUsername,
        updatedAt: ts(),
        uid: user.uid,
        slug: baseUsername,
        email: data.email || user.email,
        name: data.name || (user.displayName ?? ''),
        photoUrl: data.photoUrl || (user.photoURL ?? ''),
      },
      { merge: true }
    )
    setSaving(false)
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-6 px-4">
      {/* Basic Info */}
      <section className="rounded-2xl p-6 bg-white shadow">
        <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Name" value={data.name} onChange={v => setField('name', v)} />
          <Input label="Email" value={data.email} onChange={v => setField('email', v)} />
          <Input label="Phone" value={data.phone} onChange={v => setField('phone', v)} />
          <ThemeSelector value={data.theme} onChange={v => setField('theme', v)} />
        </div>
        <TextArea label="About Me" value={data.about} onChange={v => setField('about', v)} />
        <Input label="Skills (comma separated)" value={data.skills} onChange={v => setField('skills', v)} />
        <Input label="Username for URL" value={data.username} onChange={v => setField('username', v)} />
      </section>

      {/* Projects */}
      <section className="rounded-2xl p-6 bg-white shadow">
        <h3 className="text-lg font-semibold mb-4">Projects</h3>
        <div className="grid gap-4">
          {data.projects.map((p, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border">
              <Input label={`Title ${i + 1}`} value={p.title} onChange={v => updateProject(i, 'title', v)} />
              <Input label={`Short Description ${i + 1}`} value={p.desc} onChange={v => updateProject(i, 'desc', v)} />
            </div>
          ))}
          <button
            onClick={() =>
              setData(d => ({
                ...d,
                projects: [...d.projects, { title: '', desc: '' }],
              }))
            }
            className="self-start px-3 py-2 rounded-lg border"
          >
            + Add project
          </button>
        </div>
      </section>

      {/* Social Links */}
      <section className="rounded-2xl p-6 bg-white shadow">
        <h3 className="text-lg font-semibold mb-4">Social Links</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="GitHub" value={data.github} onChange={v => setField('github', v)} />
          <Input label="LinkedIn" value={data.linkedin} onChange={v => setField('linkedin', v)} />
          <Input label="Instagram" value={data.instagram} onChange={v => setField('instagram', v)} />
        </div>
      </section>

      {/* Uploads */}
      <section className="rounded-2xl p-6 bg-white shadow">
        <h3 className="text-lg font-semibold mb-4">Uploads</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="text-sm font-medium">Profile Photo (JPG/PNG)(no need⚠️)</label>
            <input type="file" accept="image/jpeg,image/png" className="block w-full mt-2"
              onChange={e => onFile(e, 'photoUrl', 'photos')} />
            {data.photoUrl && (
              <img src={data.photoUrl} alt="profile" className="mt-3 w-28 h-28 rounded-xl object-cover" />
            )}
          </div>
          <div>
            <label className="text-sm font-medium">Resume (PDF) (Disabled)</label>
            <input type="file" accept="application/pdf" className="block w-full mt-2"
              onChange={e => onFile(e, 'resumeUrl', 'resumes')} />
            {data.resumeUrl && (
              <a
                className="mt-3 inline-block underline text-blue-600"
                href={data.resumeUrl}
                download="resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Resume ready to download
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={saveDraft}
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Draft'}
        </button>
        <button
          onClick={() => navigate('/preview')}
          className="px-4 py-2 rounded-lg border"
        >
          Preview
        </button>
      </div>
    </div>
  )
}

/* Reusable Inputs */
function Input({ label, value, onChange, type = 'text' }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <input className="border rounded-lg px-3 py-2" type={type} value={value} onChange={e => onChange(e.target.value)} />
    </label>
  )
}
function TextArea({ label, value, onChange }) {
  return (
    <label className="grid gap-1 text-sm">
      <span className="font-medium">{label}</span>
      <textarea rows={4} className="border rounded-lg px-3 py-2" value={value} onChange={e => onChange(e.target.value)} />
    </label>
  )
}
