// Helper to convert Lexical richText to HTML
export function lexicalToHtml(lexicalData: any): string {
  if (!lexicalData) return ''
  
  // If it's already a string, return it
  if (typeof lexicalData === 'string') return lexicalData
  
  // If it has a root node, process it
  if (lexicalData.root) {
    return processNode(lexicalData.root)
  }
  
  return ''
}

function processNode(node: any): string {
  if (!node) return ''
  
  // Handle text nodes
  if (node.type === 'text') {
    let text = node.text || ''
    
    // Apply formatting
    if (node.format) {
      if (node.format & 1) text = `<strong>${text}</strong>` // Bold
      if (node.format & 2) text = `<em>${text}</em>` // Italic
      if (node.format & 8) text = `<u>${text}</u>` // Underline
      if (node.format & 16) text = `<code>${text}</code>` // Code
    }
    
    return text
  }

  // Handle upload nodes (images, files)
  if (node.type === 'upload') {
    const value = node.value
    if (value && typeof value === 'object') {
      const imageUrl = value.url || (value.sizes?.large?.url) || (value.sizes?.medium?.url)
      const alt = value.alt || value.filename || 'Image'
      const caption = value.caption
      
      if (imageUrl) {
        let html = `<img src="${imageUrl}" alt="${alt}" class="img-fluid" loading="lazy" style="max-height: 400px; width: 100%; object-fit: contain;" />`
        if (caption) {
          html += `<p class="text-center text-muted mt-2"><small>${caption}</small></p>`
        }
        return html
      }
    }
    return ''
  }
  
  // Handle container nodes with children
  const children = node.children?.map((child: any) => processNode(child)).join('') || ''
  
  switch (node.type) {
    case 'root':
      return children
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading':
      const tag = node.tag || 'h2'
      return `<${tag}>${children}</${tag}>`
    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${children}</${listTag}>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'link':
      return `<a href="${node.url || '#'}">${children}</a>`
    case 'linebreak':
      return '<br />'
    default:
      return children
  }
}
