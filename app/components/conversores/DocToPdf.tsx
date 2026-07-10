'use client'

import { useState } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'

export default function DocToPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  async function handleConvert() {
    if (!file) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/convertir-pdf', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) throw new Error('Error en la conversión')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    } catch (err) {
      console.error(err)
    }

    setLoading(false)
  }

  function resetForm() {
    setFile(null)
    setPdfUrl(null)
    setLoading(false)
  }

  return (
    <div className="max-w-xxl mx-auto p-10 border rounded-lg bg-white shadow space-y-8">
      {!pdfUrl && (
        <>
          <Input
            label="Selecciona un archivo"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            error={!file ? 'Debes subir un archivo' : undefined}
          />

          <Button
            variant="primary"
            size="md"
            onClick={handleConvert}
            disabled={!file || loading}
          >
            {loading ? 'Convirtiendo...' : 'Convertir a PDF'}
          </Button>
        </>
      )}

      {pdfUrl && (
        <div className="flex flex-col items-center space-y-4">
          <a href={pdfUrl} download="archivo.pdf">
            <Button variant="secondary" size="md">
              Descargar PDF
            </Button>
          </a>

          <Button variant="ghost" size="md" onClick={resetForm}>
            Convertir otro archivo
          </Button>
        </div>
      )}
    </div>
  )
}
