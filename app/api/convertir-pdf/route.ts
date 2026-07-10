import { PDFDocument } from 'pdf-lib'
import * as mammoth from 'mammoth'
import * as XLSX from 'xlsx'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return new Response(JSON.stringify({ error: 'No se recibió archivo' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const arrayBuffer = await file.arrayBuffer()
    let contenido = ''


    if (file.type === 'text/plain') {
      // TXT → convertir a string
      contenido = new TextDecoder().decode(arrayBuffer)
    } else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // DOCX → usar mammoth
      const buffer = Buffer.from(arrayBuffer)
      const result = await mammoth.extractRawText({ buffer })
      contenido = result.value
    } else if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      // XLSX → usar xlsx
      const buffer = Buffer.from(arrayBuffer)
      const workbook = XLSX.read(buffer, { type: 'buffer' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][]

      contenido = rows.map((row) => row.join(' | ')).join('\n')
    } else if (file.type === 'text/csv') {
      // CSV → usar xlsx también
      const text = new TextDecoder().decode(arrayBuffer)
      const workbook = XLSX.read(text, { type: 'string' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][]

      contenido = rows.map((row) => row.join(' , ')).join('\n')
    } else {
      contenido = `Tipo de archivo no soportado: ${file.type}`
    }
    // Crear PDF con contenido
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([600, 800])

    page.drawText(`Archivo recibido: ${file.name}`, { x: 50, y: 750, size: 14 })

    if (contenido) {
      page.drawText(contenido, {
        x: 50,
        y: 700,
        size: 12,
        maxWidth: 500,
        lineHeight: 14,
      })
    }

   const pdfBytes = await pdfDoc.save()

const pdfBuffer = Buffer.from(pdfBytes)

return new Response(pdfBuffer, {
  headers: {
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${file.name}.pdf"`,
  },
})
  } catch (error: any) {
    console.error('Error en la conversión:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
