export interface User {
    id?: string;
    name?: string;
    email?: string;
    profilePic?: string;
    password?: string;
}

export interface UserRegister {
    nick: string;
    name: string;
    email: string;
    password: string;
    profilePic?: {
      uri: string | undefined;
      type: string;
      name: string;
    };
    confirmPassword: string;
}

export interface Dare {
    dare: { 
      id?: string,
    }
  }