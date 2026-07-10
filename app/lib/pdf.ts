import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image-more'

export async function exportarPDF(
  elementoId: string,
  nombreArchivo: string
): Promise<void> {
  const elemento = document.getElementById(elementoId)
  if (!elemento) return

  // Mostrar header del PDF temporalmente
  const headers = elemento.querySelectorAll('.pdf-header')
  headers.forEach((h) => (h as HTMLElement).style.display = 'block')

  try {
    const escala = 2
    const ancho  = elemento.offsetWidth  * escala
    const alto   = elemento.offsetHeight * escala

    const dataUrl = await domtoimage.toPng(elemento, {
      width:  ancho,
      height: alto,
      style: {
        transform:       `scale(${escala})`,
        transformOrigin: 'top left',
        width:  `${elemento.offsetWidth}px`,
        height: `${elemento.offsetHeight}px`,
      },
    })

    headers.forEach((h) => (h as HTMLElement).style.display = 'none')

    const pdf      = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    const pdfW     = pdf.internal.pageSize.getWidth()
    const pdfH     = pdf.internal.pageSize.getHeight()
    const imgW     = pdfW - 20
    const imgH     = (alto * imgW) / ancho
    let   posY     = 10
    let   restante = imgH

    while (restante > 0) {
      pdf.addImage(dataUrl, 'PNG', 10, posY, imgW, imgH)
      restante -= (pdfH - 20)
      if (restante > 0) {
        pdf.addPage()
        posY = 10 - (imgH - restante)
      }
    }

    pdf.save(`${nombreArchivo}.pdf`)

  } catch (error) {
    headers.forEach((h) => (h as HTMLElement).style.display = 'none')
    console.error('Error generando PDF:', error)
  }
}