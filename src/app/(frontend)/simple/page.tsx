export default function SimplePage() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎉 Success! Template is Working!</h1>
      <p>The Next.js setup is working correctly.</p>
      <div style={{ 
        background: '#d4edda', 
        border: '1px solid #c3e6cb', 
        padding: '1rem', 
        borderRadius: '4px',
        marginTop: '1rem'
      }}>
        ✅ Frontend template integration is successful!
      </div>
      <p style={{ marginTop: '1rem' }}>
        <a href="/" style={{ color: '#007bff' }}>← Back to Homepage</a>
      </p>
    </div>
  )
}
