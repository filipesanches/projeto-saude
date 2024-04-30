import { DoctorData, FormData } from '../interfaces/appInterfaces';
import serverData from '../services/serverData';

export const validateCPF = (valueCPF: string) => {
  let sum = 0;
  let remainder;
  const cpf = valueCPF.replace(/\D/g, '');

  if (cpf === '00000000000') return false;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;

  return true;
};

export const validateRG = (rg: string): boolean => {
  rg = rg.toUpperCase().replace(/[^0-9X]/g, '');

  const regex = /^(\d{1,2})(\d{3})(\d{3})([\dX])$/;
  if (rg.length === 8 || rg.length === 9) {
    if (regex.test(rg)) {
      return true;
    }
  }
  console.error('Por favor, preencha o RG corretamente.');

  return false;
};

export const validateRequireFields = (fields: string[]) => {
  console.log('Validando campos obrigatórios.');
  return fields.every((field) => field.length > 0);
};

export const validateContactInfo = (email: string, phone: string) => {
  if (!email && !phone) {
    console.error('É necessário fornecer um email ou um telefone.');
    return false;
  }

  return true;
};

export const validatePhoto = (error: boolean | undefined | string) => {
  if (error) {
    console.error('Por favor, selecione um arquivo de imagem.');
    return false;
  }

  return true;
};

export const checkDoctorExists = async (cpf: string): Promise<boolean> => {
  // Verificar no localStorage
  const localDoctors = JSON.parse(localStorage.getItem('medicos') || '[]');
  if (localDoctors.find((doctor: DoctorData) => doctor.cpf === cpf)) {
    console.error('CPF encontrado no localStorage!');
    return true;
  }

  // Verificar no servidor
  const serverDoctors = await serverData();
  if (serverDoctors.find((doctor: DoctorData) => doctor.cpf === cpf)) {
    console.error('CPF encontrado no servidor!');
    return true;
  }

  // Se não encontrou no localStorage nem no servidor, retorna false
  return false;
};

export const validateForm = (formData: FormData): { errorCpf: boolean; errorRg: boolean; errorContact: boolean; errorRequireFields: boolean; errorPhotoValid: boolean } => {
  const { name, cpf, rg, birthDate, email, phone, crm, errorPhoto, specialty, service, status, cep, street, number, neighborhood, city, state } = formData;

  const errorCpf = validateCPF(cpf);
  const errorRg = validateRG(rg);
  const errorContact = validateContactInfo(email || '', phone || '');
  const errorRequireFields = validateRequireFields([name, cpf, rg, service, status, birthDate, crm, specialty, cep, street, number, neighborhood, city, state]);
  const errorPhotoValid = validatePhoto(errorPhoto || false);

  return {
    errorCpf,
    errorRg,
    errorContact,
    errorRequireFields,
    errorPhotoValid,
  };
};

export async function fetchData(): Promise<DoctorData[]> {
  try {
    // Buscar os dados do servidor
    const serverDoctorsData = await serverData();
    console.log('Dados do servidor:', serverDoctorsData);

    // Buscar os dados do localStorage
    const localStorageDoctorsDataString = localStorage.getItem('medicos');
    let localStorageDoctorsData: DoctorData[] = [];
    if (localStorageDoctorsDataString) {
      localStorageDoctorsData = JSON.parse(localStorageDoctorsDataString);
    }
    console.log('Dados do localStorage:', localStorageDoctorsData);

    // Combinar os dados do servidor e do localStorage, dando preferência aos dados do localStorage
    let combinedDoctorsData: DoctorData[] = [];

    // Adicionar os dados do servidor ao array combinado
    serverDoctorsData.forEach((serverDoctor: DoctorData) => {
      const index = localStorageDoctorsData.findIndex((localStorageDoctor) => localStorageDoctor.cpf === serverDoctor.cpf);
      if (index !== -1) {
        combinedDoctorsData.push(localStorageDoctorsData[index]); // Adicionar os dados do localStorage se o CPF for igual
        localStorageDoctorsData.splice(index, 1); // Remover o item do array localStorageDoctorsData
      } else {
        combinedDoctorsData.push(serverDoctor); // Adicionar os dados do servidor se o CPF não for igual
      }
    });

    // Adicionar os dados restantes do localStorage ao array combinado
    combinedDoctorsData = [...combinedDoctorsData, ...localStorageDoctorsData];

    console.log('Dados combinados:', combinedDoctorsData);

    return combinedDoctorsData;
  } catch (error) {
    console.error('Ocorreu um erro ao buscar os médicos:', error);
    throw error;
  }
}
