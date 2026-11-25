import {WorkflowEnvironmentConfig} from '@sourceloop/workflows-creator';

declare global {
  interface Window {
    workflowEnv: WorkflowEnvironmentConfig;
  }
}
