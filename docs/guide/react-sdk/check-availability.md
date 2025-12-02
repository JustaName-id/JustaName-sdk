# Check Availability

Before allowing users to claim a subname, you'll want to check if it's already taken. The `useIsSubnameAvailable` hook queries JustaName's registry to determine availability in real-time.

#### How It Works

The hook accepts a `username` parameter (the subname without the parent domain) and returns:

* `isSubnameAvailable`: Boolean indicating if the name is free to claim
* `isLoading`: Boolean for loading state during the check

#### Best Practice: Debouncing

Since users type character-by-character, you should debounce the input to avoid excessive API calls. This improves performance and reduces unnecessary network requests.

```tsx
import { useIsSubnameAvailable } from '@justaname.id/react';
import { useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';

export const CheckAvailability = () => {
  const [username, setUsername] = useState('');
  
  // Wait 500ms after user stops typing before checking
  const debouncedUsername = useDebounce(username, 500);
  
  const { isSubnameAvailable, isLoading } = useIsSubnameAvailable({
    username: debouncedUsername
  });

  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      {isLoading && <span>Checking...</span>}
      {!isLoading && debouncedUsername && (
        <span>{isSubnameAvailable ? '✅ Available' : '❌ Taken'}</span>
      )}
    </div>
  );
};
```
