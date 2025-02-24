export interface User {
    id?: string,
    name?: string,
    email?: string,
    profilePic?: string,
    password?: string,
}

export interface UserRegister {
    nick: string;
    name: string;
    email: string;
    password: string;
    profilePic?: string,
    confirmPassword: string;
}

export interface Dare {
    dare: { 
      id?: string,
    }
  }