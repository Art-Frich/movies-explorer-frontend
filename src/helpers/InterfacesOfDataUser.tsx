import { IobjValStr } from './InterfacesOthers';

// MainApiInterfaces
interface Iemail {
  [email: string]: string,
}

interface Iname {
  [name: string]: string,
}

interface Ipassword {
  [password: string]: string,
}

export interface IdataUser {
  data: {
    '_id': string,
    email: string,
    name: string,
  }
}

export interface IdataRegister extends Iemail, Iname, Ipassword { }
export interface IdataLogin extends Iemail, Ipassword { }
export interface IdataUserUpdate extends Iemail, Iname { }

export interface IdataUserAndInputValues {
  values: IdataUser & IobjValStr
}
