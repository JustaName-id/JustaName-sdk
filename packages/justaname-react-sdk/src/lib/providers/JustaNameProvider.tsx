import React from 'react';
import { JustaName } from '@justaname.id/sdk'

export interface JustaNameContextProps {
  justaname: JustaName | null;
}


const JustaNameContext = React.createContext<JustaNameContextProps>({
  justaname: null,
})

interface JustaNameProvider {
  children: React.ReactNode;
}
export const JustaNameProvider: React.FC<JustaNameProvider> = ({ children }) => {

  const [justaname, setJustaName] = React.useState<JustaName | null>(null);

  React.useEffect(() => {
    const main = async () => {
      const justaname = await JustaName.init({});
      setJustaName(justaname);
    }
    main();
  }, []);
  return (
    <JustaNameContext.Provider value={{ justaname }}>
      {children}
    </JustaNameContext.Provider>
  )
}

export default JustaNameProvider;

export const useJustaName = () => {
  const context = React.useContext(JustaNameContext);
  if (!context) {
    throw new Error('useJustaName must be used within a JustaNameProvider');
  }
  return context;
}