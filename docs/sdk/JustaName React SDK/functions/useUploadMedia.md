# useUploadMedia

A React hook for uploading media files (images, videos, documents) to JustaName's storage and managing the upload process.

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
