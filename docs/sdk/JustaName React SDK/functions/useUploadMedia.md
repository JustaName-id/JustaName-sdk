# useUploadMedia

A React hook for uploading media files (Avatar or Banner) to JustaName's storage and managing the upload process.

---

## Usage

```typescript
import { useUploadMedia } from '@justaname.id/react'

// Basic usage
function UploadMediaComponent() {
  const { uploadMedia, isUploadPending } = useUploadMedia(
    { ens: 'example.eth', type: 'Avatar' }, // params
    { chainId: 1 } // hookParams (optional)
  )
  
  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const result = await uploadMedia({
        form: formData,
        ens: 'example.eth',
        type: 'Avatar',
        chainId: 1
      })
      console.log('Upload successful:', result.url)
    } catch (err) {
      console.error('Failed to upload media:', err)
    }
  }
  
  return (
    <div>
      <input 
        type="file" 
        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
        disabled={isUploadPending}
      />
      {isUploadPending && <p>Uploading...</p>}
    </div>
  )
}
```


---

## Returns

[`UseUploadMediaResult`](../interfaces/UseUploadMediaResult.md) - An object containing:
- `uploadMedia`: Function to upload media files (returns `UseUploadMediaResponse`)
- `isUploadPending`: Boolean indicating if the upload is in progress

## Parameters

- **params?**: [`UseUploadMediaParams`](../interfaces/UseUploadMediaParams.md) - Optional parameters for the hook including:
  - `ens?`: ENS name (string)
  - `type?`: Media type ('Avatar' | 'Banner')
  - `chainId?`: Blockchain chain ID
- **hookParams?**: Optional hook parameters including:
  - `address?`: Wallet address (string)
  - `chainId?`: Blockchain chain ID
  - `signature?`: Pre-signed signature (string)
  - `message?`: Signature message (string)

## Defined in

[packages/@justaname.id/react/src/lib/hooks/uploadMedia/useUploadMedia.ts:41](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/hooks/uploadMedia/useUploadMedia.ts#L41)
