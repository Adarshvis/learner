// Media Renderer Components for Flexible Hero Layouts

export function TextMediaRenderer({ data }: { data: any }) {
  return (
    <div className="media-text-content">
      {data.title && <h2>{data.title}</h2>}
      {data.description && <p>{data.description}</p>}
      {data.buttons && data.buttons.length > 0 && (
        <div className="media-buttons">
          {data.buttons.map((btn: any, idx: number) => (
            <a key={idx} href={btn.link} className="btn btn-primary">
              {btn.text}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function ImageMediaRenderer({ data }: { data: any }) {
  const imgSrc = typeof data.file === 'object' ? data.file.url : data.file
  return (
    <div className="media-image-content">
      <img src={imgSrc} alt={data.alt || 'Image'} className="img-fluid w-100" />
      {data.caption && <p className="media-caption">{data.caption}</p>}
    </div>
  )
}

export function VideoMediaRenderer({ data }: { data: any }) {
  const videoSrc = typeof data.file === 'object' ? data.file.url : data.file
  const posterSrc = data.poster && typeof data.poster === 'object' ? data.poster.url : data.poster

  return (
    <div className="media-video-content">
      <video
        src={videoSrc}
        poster={posterSrc}
        controls={data.controls !== false}
        autoPlay={data.autoplay === true}
        loop={data.loop === true}
        muted={data.muted === true}
        className="w-100"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  )
}

export function AudioMediaRenderer({ data }: { data: any }) {
  const audioSrc = typeof data.file === 'object' ? data.file.url : data.file

  return (
    <div className="media-audio-content">
      <audio
        src={audioSrc}
        controls={data.controls !== false}
        autoPlay={data.autoplay === true}
        className="w-100"
      >
        Your browser does not support the audio tag.
      </audio>
    </div>
  )
}

export function YouTubeEmbedRenderer({ data }: { data: any }) {
  // Extract video ID from various YouTube URL formats
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const videoId = data.url ? getYouTubeId(data.url) : null
  
  if (!videoId) {
    return <div className="media-embed-error">Invalid YouTube URL</div>
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${data.autoplay ? 1 : 0}&controls=${data.controls !== false ? 1 : 0}`

  return (
    <div className="media-embed-content ratio ratio-16x9">
      <iframe
        src={embedUrl}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export function VimeoEmbedRenderer({ data }: { data: any }) {
  const getVimeoId = (url: string) => {
    const regExp = /vimeo.*\/(\d+)/i
    const match = url.match(regExp)
    return match ? match[1] : null
  }

  const videoId = data.url ? getVimeoId(data.url) : null
  
  if (!videoId) {
    return <div className="media-embed-error">Invalid Vimeo URL</div>
  }

  const embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=${data.autoplay ? 1 : 0}`

  return (
    <div className="media-embed-content ratio ratio-16x9">
      <iframe
        src={embedUrl}
        title="Vimeo video"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export function AnimationMediaRenderer({ data }: { data: any }) {
  const fileSrc = typeof data.file === 'object' ? data.file.url : data.file

  if (data.format === 'lottie') {
    // For Lottie, we'll need to use lottie-web library (client-side)
    return (
      <div className="media-animation-content">
        <div 
          className="lottie-container"
          data-lottie-src={fileSrc}
          data-autoplay={data.autoplay}
          data-loop={data.loop}
        >
          {/* Lottie will be initialized via client-side script */}
        </div>
      </div>
    )
  }

  // For GIF/APNG
  return (
    <div className="media-animation-content">
      <img src={fileSrc} alt="Animation" className="img-fluid w-100" />
    </div>
  )
}

export function DocumentMediaRenderer({ data }: { data: any }) {
  const fileSrc = typeof data.file === 'object' ? data.file.url : data.file

  if (data.displayMode === 'embed' && data.format === 'pdf') {
    return (
      <div className="media-document-content">
        <iframe
          src={fileSrc}
          className="w-100"
          style={{ height: '600px' }}
          title="Document viewer"
        />
      </div>
    )
  }

  return (
    <div className="media-document-content text-center">
      <a href={fileSrc} download className="btn btn-primary">
        {data.buttonText || 'Download Document'}
      </a>
    </div>
  )
}

export function ThreeDModelRenderer({ data }: { data: any }) {
  const modelSrc = typeof data.file === 'object' ? data.file.url : data.file

  return (
    <div className="media-3d-content">
      <div 
        className="model-viewer-container"
        data-model-src={modelSrc}
        data-auto-rotate={data.autoRotate}
        data-enable-zoom={data.enableZoom}
      >
        {/* 3D viewer will be initialized via client-side script (Three.js or model-viewer) */}
        <p className="text-muted">Loading 3D model...</p>
      </div>
    </div>
  )
}

export function DataVisualizationRenderer({ data }: { data: any }) {
  if (data.type === 'iframe' && data.embedUrl) {
    return (
      <div className="media-data-content">
        <iframe
          src={data.embedUrl}
          className="w-100"
          style={{ height: `${data.height || 400}px` }}
          title="Data visualization"
          frameBorder="0"
        />
      </div>
    )
  }

  return (
    <div className="media-data-content">
      <p className="text-muted">Data visualization not configured</p>
    </div>
  )
}

export function MapsMediaRenderer({ data }: { data: any }) {
  if (!data?.embedUrl) {
    return (
      <div className="media-maps-content">
        <p className="text-muted">No map URL provided</p>
      </div>
    )
  }

  // Convert Google Maps sharing URLs to embed URLs
  const convertToGoogleMapsEmbed = (url: string): string => {
    if (!url) return ''
    
    if (url.includes('/maps/embed')) {
      return url
    }
    
    if (url.includes('maps.app.goo.gl') || url.includes('google.com/maps')) {
      const match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/)
      if (match) {
        const lat = match[1]
        const lng = match[2]
        return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15282!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1`
      }
      
      console.warn('Please use Google Maps Embed URL. Go to Google Maps → Share → Embed a map → Copy HTML')
      return url
    }
    
    return url
  }

  return (
    <div className="media-maps-content" style={{ width: '100%', height: '100%' }}>
      <iframe
        src={convertToGoogleMapsEmbed(data.embedUrl)}
        style={{ border: 'none', width: '100%', height: '100%' }}
        title="Map"
        allowFullScreen={data.interactive !== false}
      />
    </div>
  )
}

// Main Media Item Renderer
export function MediaItemRenderer({ item }: { item: any }) {
  const { mediaCategory } = item

  switch (mediaCategory) {
    case 'text':
      return <TextMediaRenderer data={item.textContent} />
    case 'image':
      return <ImageMediaRenderer data={item.imageMedia} />
    case 'video':
      return <VideoMediaRenderer data={item.videoMedia} />
    case 'audio':
      return <AudioMediaRenderer data={item.audioMedia} />
    case 'document':
      return <DocumentMediaRenderer data={item.documentMedia} />
    case 'animation':
      return <AnimationMediaRenderer data={item.animationMedia} />
    case '3d':
      return <ThreeDModelRenderer data={item.threeDMedia} />
    case 'embed':
      if (item.embedMedia?.type === 'youtube') {
        return <YouTubeEmbedRenderer data={item.embedMedia} />
      } else if (item.embedMedia?.type === 'vimeo') {
        return <VimeoEmbedRenderer data={item.embedMedia} />
      }
      return <div className="media-embed-content">{item.embedMedia?.url}</div>
    case 'data':
      return <DataVisualizationRenderer data={item.dataMedia} />
    case 'maps':
      return <MapsMediaRenderer data={item.mapsMedia} />
    default:
      return <div className="media-unsupported">Media type not supported</div>
  }
}
