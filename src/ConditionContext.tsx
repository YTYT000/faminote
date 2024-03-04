import React from "react";

export type ConditionContextType = {
  condition: number;
  setCondition: (value: number) => void;
};

const ConditionContext = React.createContext<ConditionContextType>({
  condition: 0,
  setCondition: () => {},
});

export default ConditionContext;
