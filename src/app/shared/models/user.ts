export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
  status?: string;
  id?: number;
  agree: boolean;
}
