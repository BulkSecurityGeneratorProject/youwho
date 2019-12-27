import React from 'react';
import { IProfilingVariable } from 'app/shared/model/profiling-variable.model';
import { ProfilingPill } from 'app/modules/results/profiling-pill';

export interface IProfilingVariableResultsProps {
  profilingVariable: IProfilingVariable;
  personalValue?: number;
  totalValue: number;
  personal?: boolean;
}

export const ProfilingVariableResults = (props: IProfilingVariableResultsProps) => {
  const { profilingVariable, personalValue, totalValue, personal } = props;

  return (
    <div className="profile-pill">
      <div className="results-labels">{profilingVariable.upperEnd.name}</div>
      <div className="pill-container">
        {personal && <ProfilingPill value={personalValue} className="personal-pill" />}
        <ProfilingPill value={totalValue} />
      </div>
      <div className="results-labels">{profilingVariable.lowerEnd.name}</div>
    </div>
  );
};
