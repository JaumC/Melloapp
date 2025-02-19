export interface User {
    id?: string,
    name?: string,
    email?: string,
    profilePic?: string,
    password?: string,
}

export interface UserRegister {
  username: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Dare {
    dare: { 
      id?: string,
    }
  }