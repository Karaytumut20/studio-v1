import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Studio V1 - Digital Excellence';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'black',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          letterSpacing: '-0.05em',
          fontFamily: 'sans-serif',
          fontWeight: 800,
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex' }}>STUDIO</div>
        <div style={{ fontSize: 40, marginTop: 40, opacity: 0.5, fontWeight: 400, letterSpacing: '0.2em' }}>
          Creative Architecture
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}