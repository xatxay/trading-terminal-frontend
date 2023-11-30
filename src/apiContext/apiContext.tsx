import React, { ReactNode, createContext, useContext, useState } from "react";
import { ApiData, BybitApiContextType } from "../utils/interface";

const BybitApiContext = createContext<BybitApiContextType | undefined>(
  undefined
);

export const useApiKeys = () => {
  const context = useContext(BybitApiContext);
  if (context === undefined) {
    throw new Error("useApikeys must be used within a BybitApiProvider");
  }
  return context;
};

export const BybitApiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bybitApi, setBybitApi] = useState<ApiData>({
    apiKey: "",
    apiSecret: "",
  });

  const updateApiKeys = (newKeys: ApiData) => {
    setBybitApi(newKeys);
  };

  return (
    <BybitApiContext.Provider value={{ bybitApi, updateApiKeys }}>
      {children}
    </BybitApiContext.Provider>
  );
};
