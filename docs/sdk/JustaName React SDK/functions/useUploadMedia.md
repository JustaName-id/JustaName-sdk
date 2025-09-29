# useUploadMedia

A React hook for uploading media files (images, videos, documents) to decentralized storage and managing the upload process.

---

## Usage

```typescript
import { useUploadMedia } from '@justaname.id/react'

// Basic usage
function UploadMediaComponent() {
  const { uploadMedia, isLoading, error, data } = useUploadMedia()
  
  const handleFileUpload = async (file) => {
    try {
      await uploadMedia({
        file,
        type: 'image',
        metadata: {
          name: file.name,
          description: 'Uploaded image'
        }
      })
    } catch (err) {
      console.error('Failed to upload media:', err)
    }
  }
  
  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        disabled={isLoading}
      />
      {isLoading && <p>Uploading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Uploaded: {data.url}</p>}
    </div>
  )
}
```

```typescript
// With advanced media management and preview
function AdvancedUploadMediaComponent() {
  const { uploadMedia, isLoading, error, data, progress } = useUploadMedia({
    onSuccess: (result) => {
      console.log('Media uploaded successfully:', result)
      // Show success notification
    },
    onError: (error) => {
      console.error('Error uploading media:', error)
      // Show error notification
    },
    onProgress: (progress) => {
      console.log('Upload progress:', progress)
    }
  })
  
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [metadata, setMetadata] = useState({
    name: '',
    description: '',
    tags: []
  })
  const [uploadType, setUploadType] = useState('image')
  
  const handleFileSelect = (file) => {
    setSelectedFile(file)
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target.result)
      reader.readAsDataURL(file)
    }
    
    // Set default metadata
    setMetadata(prev => ({
      ...prev,
      name: file.name.split('.')[0]
    }))
  }
  
  const handleUpload = async () => {
    if (!selectedFile) return
    
    try {
      await uploadMedia({
        file: selectedFile,
        type: uploadType,
        metadata: {
          ...metadata,
          size: selectedFile.size,
          mimeType: selectedFile.type,
          uploadedAt: new Date().toISOString()
        },
        options: {
          generateThumbnail: true,
          optimizeImage: uploadType === 'image',
          maxFileSize: 10 * 1024 * 1024 // 10MB
        }
      })
    } catch (err) {
      console.error('Failed to upload media:', err)
    }
  }
  
  const addTag = (tag) => {
    if (tag && !metadata.tags.includes(tag)) {
      setMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }))
    }
  }
  
  const removeTag = (tagToRemove) => {
    setMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }
  
  return (
    <div className="upload-media">
      <h3>Upload Media</h3>
      
      <div className="file-selector">
        <input
          type="file"
          accept="image/*,video/*,application/pdf"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          disabled={isLoading}
        />
      </div>
      
      {selectedFile && (
        <div className="file-preview">
          <h4>File Preview</h4>
          <div className="file-info">
            <p><strong>Name:</strong> {selectedFile.name}</p>
            <p><strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
            <p><strong>Type:</strong> {selectedFile.type}</p>
          </div>
          
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}
        </div>
      )}
      
      <div className="upload-form">
        <div className="form-group">
          <label htmlFor="uploadType">Media Type:</label>
          <select
            id="uploadType"
            value={uploadType}
            onChange={(e) => setUploadType(e.target.value)}
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
            <option value="audio">Audio</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="mediaName">Name:</label>
          <input
            id="mediaName"
            type="text"
            value={metadata.name}
            onChange={(e) => setMetadata(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter media name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="mediaDescription">Description:</label>
          <textarea
            id="mediaDescription"
            value={metadata.description}
            onChange={(e) => setMetadata(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter media description"
            rows={3}
          />
        </div>
        
        <div className="form-group">
          <label>Tags:</label>
          <div className="tags-input">
            <input
              type="text"
              placeholder="Add a tag"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addTag(e.target.value)
                  e.target.value = ''
                }
              }}
            />
            <div className="tags-list">
              {metadata.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button onClick={() => removeTag(tag)}>×</button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {isLoading && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress || 0}%` }}
            ></div>
          </div>
          <p>Uploading... {progress || 0}%</p>
        </div>
      )}
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
        </div>
      )}
      
      {data && (
        <div className="success">
          <p>✅ Media uploaded successfully!</p>
          <div className="upload-result">
            <p><strong>URL:</strong> {data.url}</p>
            <p><strong>Hash:</strong> {data.hash}</p>
            <p><strong>Size:</strong> {data.size} bytes</p>
            {data.thumbnail && (
              <p><strong>Thumbnail:</strong> {data.thumbnail}</p>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={handleUpload} 
        disabled={isLoading || !selectedFile}
        className="upload-btn"
      >
        {isLoading ? 'Uploading...' : 'Upload Media'}
      </button>
      
      <div className="info">
        <h4>About Media Upload</h4>
        <p>Upload media files to decentralized storage for use in your subname records. Supported features:</p>
        <ul>
          <li>Images, videos, documents, and audio files</li>
          <li>Automatic thumbnail generation for images</li>
          <li>Image optimization and compression</li>
          <li>Metadata and tagging support</li>
          <li>Progress tracking and error handling</li>
        </ul>
      </div>
    </div>
  )
}
```

---

## Returns

[`UseUploadMediaResult`](../interfaces/UseUploadMediaResult.md) - An object containing:
- `uploadMedia`: Function to upload media files
- `isLoading`: Boolean indicating if the upload is in progress
- `error`: Error object if the upload failed
- `data`: Result data if the upload succeeded
- `progress`: Upload progress percentage

## Parameters

- **params?**: [`UseUploadMediaParams`](../interfaces/UseUploadMediaParams.md) - Optional parameters for the hook

## Defined in

[packages/@justaname.id/react/src/lib/hooks/uploadMedia/useUploadMedia.ts:41](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/uploadMedia/useUploadMedia.ts#L41)
