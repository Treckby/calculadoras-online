import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') ?? 'CalcFácil'
  const desc  = searchParams.get('desc')  ?? 'Calculadoras Online Gratis'

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          padding: '60px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 16,
            fontSize: 28,
          }}>
            🧮
          </div>
          <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 24, fontWeight: 600 }}>
            CalcFácil
          </span>
        </div>
        <div style={{ color: 'white', fontSize: 52, fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>
          {title}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 24 }}>
          {desc}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}