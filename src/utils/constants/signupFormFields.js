import { v4 as uuid } from 'uuid';

export const signupFormFields = [
  {
    id: uuid(),
    label: 'Name',
    name: 'name',
    type: 'text',
  },
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
