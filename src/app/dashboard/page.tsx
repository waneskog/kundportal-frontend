'use client'
import { useState, useRef } from 'react'

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return setMessage('Välj en fil först!')
    setUploading(true)
    setMessage('')
    try {
      const token = localStorage.getItem('token')
      if (!token) throw new Error('Ingen token, logga in igen!')
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Uppladdning misslyckades')
      setMessage('Uppladdning lyckades! Filnamn: ' + data.originalname)
      setFile(null)
      if (fileInput.current) fileInput.current.value = ''
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard – Ladda upp fil</h1>
      <form onSubmit={handleUpload} className="space-y-4 w-full max-w-md">
        <input type="file" ref={fileInput} onChange={e => setFile(e.target.files?.[0] || null)} className="block w-full" />
        <button type="submit" disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded">
          {uploading ? 'Laddar upp...' : 'Ladda upp'}
        </button>
      </form>
      {message && <div className="mt-4 text-center text-sm text-blue-700">{message}</div>}
    </div>
  )
}
