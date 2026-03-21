'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { lexicalToHtml } from '@/lib/lexicalToHtml'

type GenericBlock = Record<string, any>

type FlexibleRowColumn = {
  width?: string
  backgroundColor?: string
  padding?: string
  blocks?: GenericBlock[]
}

type FlexibleRowData = {
  heading?: string
  description?: string
  alignment?: 'left' | 'center' | 'right'
  sectionBackgroundColor?: string
  columnGap?: 'none' | 'small' | 'medium' | 'large' | 'xl'
  verticalAlign?: 'top' | 'center' | 'bottom' | 'stretch'
  columns?: FlexibleRowColumn[]
}

interface FlexibleRowBlockProps {
  data: FlexibleRowData
}

const gapMap: Record<string, string> = {
  none: '0px',
  small: '8px',
  medium: '16px',
  large: '24px',
  xl: '32px',
}

const paddingMap: Record<string, string> = {
  none: '0px',
  small: '8px',
  medium: '16px',
  large: '24px',
}

const fontSizeMap: Record<string, string> = {
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
}

const alignMap: Record<string, string> = {
  left: 'left',
  center: 'center',
  right: 'right',
}

const verticalAlignMap: Record<string, string> = {
  top: 'start',
  center: 'center',
  bottom: 'end',
  stretch: 'stretch',
}

const borderRadiusMap: Record<string, string> = {
  none: '0px',
  sm: '8px',
  md: '12px',
  lg: '18px',
  'full-circle': '9999px',
}

const getMediaUrl = (media: any): string => {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media.url || ''
}

const parseYouTubeEmbed = (url?: string): string => {
  if (!url) return ''
  try {
    if (url.includes('youtube.com/embed/')) return url
    if (url.includes('youtube.com/watch')) {
      const id = new URL(url).searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0]
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }
  } catch (_error) {
    return ''
  }
  return ''
}

const parseVimeoEmbed = (url?: string): string => {
  if (!url) return ''
  if (url.includes('player.vimeo.com/video/')) return url
  const id = url.split('/').pop()?.split('?')[0]
  return id ? `https://player.vimeo.com/video/${id}` : ''
}

function MixedCarousel({ block }: { block: GenericBlock }) {
  const slides = block.slides || []
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!block.autoplay || slides.length < 2) return
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, Number(block.intervalMs) || 3500)

    return () => window.clearInterval(timer)
  }, [block.autoplay, block.intervalMs, slides.length])

  if (!slides.length) {
    return <div className="flex-row-placeholder">No slides added yet.</div>
  }

  return (
    <div className="flex-row-carousel aspect-video">
      {slides.map((slide: any, index: number) => {
        const isActive = index === activeIndex
        const imageUrl = getMediaUrl(slide.image)
        const uploadedVideo = getMediaUrl(slide.videoUpload)
        const youtubeUrl = parseYouTubeEmbed(slide.youtubeUrl)

        return (
          <div
            key={index}
            className={`flex-row-carousel-slide ${isActive ? 'is-active' : ''}`}
          >
            {slide.mediaType === 'image' && imageUrl && (
              <Image src={imageUrl} alt={slide.alt || 'carousel image'} fill style={{ objectFit: 'cover' }} />
            )}
            {slide.mediaType === 'videoUpload' && uploadedVideo && (
              <video src={uploadedVideo} controls className="flex-row-media-el" />
            )}
            {slide.mediaType === 'youtube' && youtubeUrl && (
              <iframe
                src={youtubeUrl}
                title={`Slide ${index + 1}`}
                className="flex-row-media-el"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        )
      })}

      {block.showArrows !== false && slides.length > 1 && (
        <>
          <button
            type="button"
            className="flex-row-arrow flex-row-arrow-prev"
            onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            type="button"
            className="flex-row-arrow flex-row-arrow-next"
            onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
            aria-label="Next slide"
          >
            ›
          </button>
        </>
      )}

      {block.showDots !== false && slides.length > 1 && (
        <div className="flex-row-dots">
          {slides.map((_: any, index: number) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={index === activeIndex ? 'is-active' : ''}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ColumnBlockRenderer({ block }: { block: GenericBlock }) {
  switch (block.blockType) {
    case 'flexRichText': {
      const html = lexicalToHtml(block.content)
      return (
        <div
          className="flex-row-frame aspect-video flex-row-richtext"
          style={{
            fontFamily: block.fontFamily || 'inherit',
            fontSize: fontSizeMap[block.fontSize] || fontSizeMap.base,
            color: block.textColor || '#111111',
          }}
          dangerouslySetInnerHTML={{ __html: html || '<p>No content</p>' }}
        />
      )
    }

    case 'flexImage': {
      const imageUrl = getMediaUrl(block.image)
      return (
        <div
          className="flex-row-frame aspect-video"
          style={{ borderRadius: borderRadiusMap[block.borderRadius] || '12px' }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={block.caption || 'Flexible row image'}
              fill
              style={{ objectFit: block.objectFit || 'cover' }}
            />
          ) : (
            <div className="flex-row-placeholder">No image selected.</div>
          )}
          {block.caption && (
            <div className="flex-row-caption" style={{ color: block.captionColor || '#ffffff' }}>
              {block.caption}
            </div>
          )}
        </div>
      )
    }

    case 'flexVideo': {
      const sourceType = block.sourceType || 'youtube'
      const uploadUrl = getMediaUrl(block.videoUpload)
      const posterUrl = getMediaUrl(block.posterImage)
      const youtubeUrl = parseYouTubeEmbed(block.videoUrl)
      const vimeoUrl = parseVimeoEmbed(block.videoUrl)

      return (
        <div className="flex-row-frame aspect-video">
          {sourceType === 'upload' && uploadUrl && (
            <video
              src={uploadUrl}
              poster={posterUrl || undefined}
              autoPlay={Boolean(block.autoplay)}
              loop={Boolean(block.loop)}
              muted={Boolean(block.autoplay)}
              controls={block.showControls !== false}
              className="flex-row-media-el"
            />
          )}
          {sourceType === 'external' && block.videoUrl && (
            <video
              src={block.videoUrl}
              poster={posterUrl || undefined}
              autoPlay={Boolean(block.autoplay)}
              loop={Boolean(block.loop)}
              muted={Boolean(block.autoplay)}
              controls={block.showControls !== false}
              className="flex-row-media-el"
            />
          )}
          {sourceType === 'youtube' && youtubeUrl && (
            <iframe
              src={youtubeUrl}
              title="YouTube video"
              className="flex-row-media-el"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          {sourceType === 'vimeo' && vimeoUrl && (
            <iframe
              src={vimeoUrl}
              title="Vimeo video"
              className="flex-row-media-el"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      )
    }

    case 'flexCarousel':
      return <MixedCarousel block={block} />

    case 'flexEmbed': {
      return (
        <div className="flex-row-frame aspect-video" style={{ minHeight: `${Number(block.heightPx) || 320}px` }}>
          {block.embedType === 'iframe' && block.iframeUrl && (
            <iframe
              src={block.iframeUrl}
              className="flex-row-media-el"
              loading="lazy"
              allowFullScreen
              title="Embedded frame"
            />
          )}
          {block.embedType === 'html' && (
            <div className="flex-row-media-el" dangerouslySetInnerHTML={{ __html: block.htmlCode || '' }} />
          )}
        </div>
      )
    }

    case 'flexAnimation': {
      const gifUrl = getMediaUrl(block.gifFile)
      return (
        <div className="flex-row-frame aspect-video">
          {block.animationType === 'lottie' && block.lottieUrl && (
            <iframe
              src={block.lottieUrl}
              title="Lottie animation"
              className="flex-row-media-el"
              allow="autoplay"
            />
          )}
          {block.animationType === 'gif' && gifUrl && (
            <Image src={gifUrl} alt="GIF animation" fill style={{ objectFit: 'contain' }} unoptimized />
          )}
        </div>
      )
    }

    default:
      return <div className="flex-row-placeholder">Unsupported block: {block.blockType}</div>
  }
}

export default function FlexibleRowBlock({ data }: FlexibleRowBlockProps) {
  const columns = data.columns || []
  const align = alignMap[data.alignment || 'left']

  const templateColumns = useMemo(() => {
    if (!columns.length) return '1fr'
    if (columns.length > 3) {
      return 'repeat(2, minmax(0, 1fr))'
    }

    const dynamic = columns.map((column) => {
      if (!column.width || column.width === 'auto') return 'minmax(0, 1fr)'
      return `${column.width}%`
    })

    return dynamic.join(' ')
  }, [columns])

  return (
    <section
      className="section flexible-row-section"
      style={{ backgroundColor: data.sectionBackgroundColor || 'transparent' }}
    >
      <div className="container">
        {(data.heading || data.description) && (
          <div className="section-title" style={{ textAlign: align as 'left' | 'center' | 'right' }}>
            {data.heading && <h2>{data.heading}</h2>}
            {data.description && <p>{data.description}</p>}
          </div>
        )}

        <div
          className="flex-row-grid"
          style={{
            gap: gapMap[data.columnGap || 'medium'] || gapMap.medium,
            alignItems: verticalAlignMap[data.verticalAlign || 'stretch'] as
              | 'start'
              | 'center'
              | 'end'
              | 'stretch',
            gridTemplateColumns: templateColumns,
          }}
        >
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className="flex-row-column"
              style={{
                backgroundColor: column.backgroundColor || 'transparent',
                padding: paddingMap[column.padding || 'medium'] || paddingMap.medium,
              }}
            >
              {(column.blocks || []).map((block, blockIndex) => (
                <div className="flex-row-subblock" key={blockIndex}>
                  <ColumnBlockRenderer block={block} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .flex-row-grid {
          display: grid;
        }

        .flex-row-column {
          border-radius: 12px;
          min-width: 0;
        }

        .flex-row-subblock + .flex-row-subblock {
          margin-top: 12px;
        }

        .flex-row-frame,
        .flex-row-carousel {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: #e9eef3;
        }

        .aspect-video {
          aspect-ratio: 16 / 9;
        }

        .flex-row-richtext {
          overflow: auto;
          padding: 14px;
          background: #f8fbfd;
        }

        .flex-row-media-el {
          width: 100%;
          height: 100%;
          border: 0;
          object-fit: cover;
        }

        .flex-row-placeholder {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          color: #3b4d5c;
          background: #eaf0f5;
          padding: 12px;
          text-align: center;
        }

        .flex-row-caption {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 8px;
          padding: 6px 8px;
          font-size: 0.85rem;
        }

        .flex-row-carousel-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 320ms ease;
          pointer-events: none;
        }

        .flex-row-carousel-slide.is-active {
          opacity: 1;
          pointer-events: auto;
        }

        .flex-row-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: 0;
          background: rgba(0, 0, 0, 0.55);
          color: #ffffff;
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
          opacity: 0;
          transition: opacity 200ms ease;
          z-index: 4;
        }

        .flex-row-carousel:hover .flex-row-arrow {
          opacity: 1;
        }

        .flex-row-arrow-prev {
          left: 10px;
        }

        .flex-row-arrow-next {
          right: 10px;
        }

        .flex-row-dots {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 10px;
          display: flex;
          gap: 6px;
          z-index: 4;
        }

        .flex-row-dots button {
          width: 9px;
          height: 9px;
          border: 0;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 0;
        }

        .flex-row-dots button.is-active {
          background: #ffffff;
        }

        @media (max-width: 768px) {
          .flex-row-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
