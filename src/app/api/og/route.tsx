import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import path from 'path';
import { getRandomBackgroundImagePath } from '@/lib/backgroundImages';

export const runtime = 'nodejs';

// Load fonts
// NOTE: We read them outside the handler to cache them in Node.js memory
const fontRegular = readFileSync(path.join(process.cwd(), 'public/fonts/NotoSerifJP-Regular.otf'));
const fontBold = readFileSync(path.join(process.cwd(), 'public/fonts/NotoSerifJP-Bold.otf'));

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Retrieve parameters
    const title = searchParams.get('title') || 'YASHIRO';
    const subtitle = searchParams.get('subtitle') || '- Philosophy & Design -';
    const hook = searchParams.get('hook') || '妥協が 0 の空間。';
    const bottomText = searchParams.get('bottom') || '真の豊かさを手に入れる空間。';
    const number = searchParams.get('number') || '';
    const numberPrefix = searchParams.get('numberPrefix') || '厳選';
    const numberSuffix = searchParams.get('numberSuffix') || '選';
    const type = searchParams.get('type') || 'og'; // 'og' (1200x630) or 'insta' (1080x1350)
    
    const rawBg = searchParams.get('bg');
    
    let bgDataUrl = '';
    if (rawBg && rawBg.startsWith('http')) {
      // If user passed an absolute URL, we just use it directly
      bgDataUrl = rawBg;
    } else {
      // Pick a local image based on title
      const bgPath = getRandomBackgroundImagePath(title);
      const bgBuffer = readFileSync(path.join(process.cwd(), bgPath));
      bgDataUrl = `data:image/jpeg;base64,${bgBuffer.toString('base64')}`;
    }

    const isInsta = type === 'insta';
    const width = isInsta ? 1080 : 1200;
    const height = isInsta ? 1350 : 630;

    // Font size scaling based on format and text length
    let titleSize = isInsta ? 130 : 96;
    if (title.length > 25) {
      titleSize = isInsta ? 70 : 48;
    } else if (title.length > 15) {
      titleSize = isInsta ? 90 : 64;
    }
    const subSize = isInsta ? 40 : 32;
    const hookSize = isInsta ? 64 : 48;
    const bottomSize = isInsta ? 36 : 28;
    const numberSize = isInsta ? 160 : 120;
    const numberSideSize = isInsta ? 48 : 36;
    const padding = isInsta ? '60px' : '40px';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundColor: '#111',
            color: 'white',
            fontFamily: '"Noto Serif JP"',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Image using base64 for Satori compatibility */}
          <img 
            src={bgDataUrl} 
            alt="background" 
            style={{ 
              position: 'absolute', 
              top: 0, left: 0, 
              width: '100%', height: '100%', 
              objectFit: 'cover' 
            }} 
          />

          {/* Dark Overlay for better text readability */}
          <div
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
          />

          {/* White Border Frame */}
          <div
            style={{
              position: 'absolute',
              top: isInsta ? '8%' : '10%',
              bottom: isInsta ? '8%' : '10%',
              left: '5%',
              right: '5%',
              border: '3px solid rgba(255, 255, 255, 0.7)',
              display: 'flex',
              flexDirection: 'column',
              padding: padding,
            }}
          >
            {/* Top Header: Brand & Line */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '-20px', marginBottom: isInsta ? '40px' : '20px' }}>
              <span style={{ fontSize: isInsta ? 32 : 24, letterSpacing: '0.1em' }}>YASHIRO</span>
              <div style={{ width: isInsta ? '400px' : '250px', height: '1px', backgroundColor: 'rgba(255,255,255,0.6)', marginLeft: '30px' }} />
            </div>

            {/* Hook Phrase */}
            <div style={{ fontSize: hookSize, fontWeight: 700, marginBottom: 'auto', textShadow: '4px 4px 10px rgba(0,0,0,0.8)' }}>
              {hook}
            </div>

            {/* Main Title (Centered) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                textShadow: '4px 4px 15px rgba(0,0,0,0.9)',
              }}
            >
              <div style={{ 
                fontSize: titleSize, 
                fontWeight: 700, 
                letterSpacing: '0.05em', 
                textAlign: 'center', 
                wordBreak: 'break-word',
                lineHeight: 1.4 
              }}>
                {title}
              </div>
              <div style={{ fontSize: subSize, marginTop: '16px', letterSpacing: '0.1em', opacity: 0.9 }}>
                {subtitle}
              </div>
            </div>

            {/* Bottom Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '-10px' }}>
                  <div style={{ width: isInsta ? '200px' : '150px', height: '1px', backgroundColor: 'rgba(255,255,255,0.6)', marginRight: '20px' }} />
                  <span style={{ fontSize: bottomSize, letterSpacing: '0.05em', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>
                    {bottomText}
                  </span>
                </div>
              </div>

              {/* Number Highlight (e.g. 厳選 10 選) */}
              {number && (
                <div style={{ display: 'flex', alignItems: 'baseline', textShadow: '4px 4px 15px rgba(0,0,0,0.9)' }}>
                  <span style={{ fontSize: numberSideSize, marginRight: '8px' }}>{numberPrefix}</span>
                  <span style={{ fontSize: numberSize, fontWeight: 700, lineHeight: 0.8 }}>{number}</span>
                  <span style={{ fontSize: numberSideSize, marginLeft: '8px' }}>{numberSuffix}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      {
        width: width,
        height: height,
        fonts: [
          {
            name: 'Noto Serif JP',
            data: fontRegular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Noto Serif JP',
            data: fontBold,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    console.error('OG Generation Error:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
