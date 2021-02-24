import { InputField } from '../interfaces/input-field';

export interface FormService {
  form: InputField[];
  key: string;
  serviceName: string;
  title: string;
}
