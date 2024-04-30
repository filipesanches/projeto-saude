export type DoctorData = {
  startWith(search: string): unknown;
  photoURL?: string;
  name: string;
  cpf: string;
  rg: string;
  birthDate: string;
  email?: string;
  phone?: string;
  errorPhoto?: string;
  service: string;
  status: string;
  crm: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
};

export interface FormData {
  name: string;
  photoURL?: string;
  cpf: string;
  rg: string;
  birthDate: string;
  email?: string | undefined;
  phone?: string;
  errorPhoto?: boolean | string | undefined;
  service: string;
  status: string;
  crm: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface CustomStorageEvent extends Event {
  detail: DoctorData[];
}

export interface FormEditProps {
  toggleForm: () => void;
  dataForm: FormData;
  upToDate: (dataForm: FormData) => void;
}
