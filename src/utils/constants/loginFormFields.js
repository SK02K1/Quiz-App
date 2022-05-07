import { v4 as uuid } from 'uuid';

export const loginFormFields = [
  {
    id: uuid(),
    label: 'Email',
    name: 'email',
    type: 'email',
  },
  {
    id: uuid(),
    label: 'Password',
    name: 'password',
    type: 'password',
  },
];
