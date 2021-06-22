import { AbstractRequest } from './abstractRequest';

export interface RequestMessage extends AbstractRequest {
  message: string;
}
