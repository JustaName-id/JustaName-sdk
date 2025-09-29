# useSubnameSignature

A React hook for managing subname signature operations and authentication.

---

## Usage

```typescript
import { useSubnameSignature } from '@justaname.id/react'

// Basic usage
function SubnameSignatureComponent() {
  const { 
    signSubname, 
    verifySignature, 
    isLoading, 
    error, 
    signature 
  } = useSubnameSignature()
  
  const handleSign = async () => {
    try {
      await signSubname({
        subname: 'alice.justaname.eth',
        message: 'Sign this subname for authentication'
      })
    } catch (err) {
      console.error('Failed to sign subname:', err)
    }
  }
  
  return (
    <div>
      <button onClick={handleSign} disabled={isLoading}>
        {isLoading ? 'Signing...' : 'Sign Subname'}
      </button>
      {error && <p>Error: {error.message}</p>}
      {signature && <p>Signature: {signature}</p>}
    </div>
  )
}
```

```typescript
// With advanced signature management
function AdvancedSignatureComponent() {
  const { 
    signSubname, 
    verifySignature, 
    isLoading, 
    error, 
    signature,
    isVerified 
  } = useSubnameSignature()
  
  const [subname, setSubname] = useState('alice.justaname.eth')
  const [message, setMessage] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  
  const handleSign = async () => {
    if (!subname || !message) return
    
    try {
      await signSubname({
        subname,
        message,
        nonce: Date.now().toString()
      })
    } catch (err) {
      console.error('Failed to sign subname:', err)
    }
  }
  
  const handleVerify = async () => {
    if (!signature) return
    
    try {
      const result = await verifySignature({
        signature,
        subname,
        message
      })
      setVerificationResult(result)
    } catch (err) {
      console.error('Failed to verify signature:', err)
    }
  }
  
  return (
    <div className="subname-signature">
      <h3>Subname Signature Management</h3>
      
      <div className="signature-form">
        <div className="form-group">
          <label htmlFor="subname">Subname:</label>
          <input
            id="subname"
            type="text"
            placeholder="alice.justaname.eth"
            value={subname}
            onChange={(e) => setSubname(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="message">Message to Sign:</label>
          <textarea
            id="message"
            placeholder="Enter message to sign..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />
        </div>
        
        <div className="form-actions">
          <button 
            onClick={handleSign} 
            disabled={isLoading || !subname || !message}
            className="sign-btn"
          >
            {isLoading ? 'Signing...' : 'Sign Message'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="error">
          <p>❌ Error: {error.message}</p>
        </div>
      )}
      
      {signature && (
        <div className="signature-result">
          <h4>Signature Generated</h4>
          <div className="signature-display">
            <p><strong>Signature:</strong></p>
            <code className="signature-code">{signature}</code>
          </div>
          
          <div className="verification-section">
            <h5>Verify Signature</h5>
            <button 
              onClick={handleVerify}
              className="verify-btn"
            >
              Verify Signature
            </button>
            
            {verificationResult !== null && (
              <div className={`verification-result ${verificationResult ? 'success' : 'error'}`}>
                {verificationResult ? (
                  <p>✅ Signature is valid</p>
                ) : (
                  <p>❌ Signature is invalid</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="info">
        <h4>About Subname Signatures</h4>
        <p>Subname signatures allow you to prove ownership and authenticate actions using your subname. This is useful for:</p>
        <ul>
          <li>Proving ownership of a subname</li>
          <li>Authenticating API requests</li>
          <li>Signing messages for verification</li>
          <li>Creating non-repudiable actions</li>
        </ul>
      </div>
    </div>
  )
}
```

---

## Returns

[`UseSubnameSignatureResult`](../interfaces/UseSubnameSignatureResult.md) - An object containing:
- `signSubname`: Function to sign a message with the subname
- `verifySignature`: Function to verify a signature
- `isLoading`: Boolean indicating if the operation is in progress
- `error`: Error object if the operation failed
- `signature`: The generated signature string
- `isVerified`: Boolean indicating if the signature is verified

## Defined in

[packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx:204](https://github.com/JustaName-id/JustaName-sdk/blob/dc845c10af242e3ca87d95ef392516ac0bfa8b95/packages/@justaname.id/react/src/lib/providers/JustaNameProvider.tsx#L204)
