// Used to get the current status of the user's authentication
import { createContext, useContext } from 'react';
import type { AuthContextType } from './typings';

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType>({
    authStatus: 'initial',
    emailVerificationStatus: 'unknown',
    metadata: undefined,
    user: undefined,
    loading: true,
    setMetadata: () => {},
});

// Custom hook to access the AuthContext value
// https://react.dev/learn/reusing-logic-with-custom-hooks#extracting-your-own-custom-hook-from-a-component
// https://react.dev/reference/react/useContext 
export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;

