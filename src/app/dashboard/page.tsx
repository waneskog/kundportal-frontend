"use client"

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabaseClient'

const supabase = createClient()

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
      // Ladda upp filen till Supabase Storage (bucket: "uploads")
      const { error } = await supabase.storage.from('uploads').upload(file.name, file, { upsert: true })
      if (error) throw error
      setMessage('Uppladdning lyckades! Filnamn: ' + file.name)
      setFile(null)
      if (fileInput.current) fileInput.current.value = ''
    } catch (err) {
      setMessage((err instanceof Error ? err.message : 'Uppladdning misslyckades'))
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
