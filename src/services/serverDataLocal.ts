import { FormData } from '../interfaces/appInterfaces';

export const getItem = async () => {
  return localStorage.getItem('medicos');
};

export const clearItem = async () => {
  localStorage.removeItem('medicos');
  console.log('Item limpo');
  return;
};

export const editItem = async (userData: FormData) => {
  const dataLocalStorage = await getItem();
  const newDataArray = dataLocalStorage ? JSON.parse(dataLocalStorage) : [];
  const index = newDataArray.findIndex((data: { cpf: string }) => data.cpf === userData.cpf);

  if (index !== -1) {
    newDataArray[index] = userData;
  } else {
    newDataArray.push(userData);
  }

  console.log('AQUI', newDataArray);
  return localStorage.setItem('medicos', JSON.stringify(newDataArray));
};

export const setItem = async (data: string) => {
  try {
    const dataItem = await getItem();
    let newDataArray: FormData[] = [];

    if (dataItem) {
      newDataArray = JSON.parse(dataItem);
    }

    const newItemObject: FormData = JSON.parse(data);

    if (Object.keys(newItemObject).length !== 0) {
      const index = newDataArray.findIndex((item) => item.cpf === newItemObject.cpf);
      if (index !== -1) {
        newDataArray[index] = newItemObject;
      } else {
        newDataArray.push(newItemObject);
      }
    }

    localStorage.setItem('medicos', JSON.stringify(newDataArray));

    const message = dataItem ? 'Item atualizado' : 'Item salvo';
    console.log(`${message}:`, newDataArray);
  } catch (error) {
    console.error('Erro ao definir o item:', error);
  }
};

export const removeItem = (cpfToRemove: string) => {
  const dataLocalStorage = localStorage.getItem('medicos');
  const deleteCpf = localStorage.getItem('delete');
  const arrDelete = []
  if (deleteCpf) {
    arrDelete.push(...JSON.parse(deleteCpf), cpfToRemove);
    console.log(arrDelete);
    localStorage.setItem('delete', JSON.stringify(arrDelete));
    if (dataLocalStorage) {
      const dataArray: FormData[] = JSON.parse(dataLocalStorage);
      const newDataArray = dataArray.filter((item) => item.cpf !== cpfToRemove);
      localStorage.setItem('medicos', JSON.stringify(newDataArray));
      return newDataArray;
    } else {
      console.error('Nenhum dado encontrado no localStorage');
      return [];
    }
  } else {
    arrDelete.push(cpfToRemove)
    localStorage.setItem('delete', JSON.stringify(arrDelete));
    if (dataLocalStorage) {
      const dataArray: FormData[] = JSON.parse(dataLocalStorage);
      const newDataArray = dataArray.filter((item) => item.cpf !== cpfToRemove);
      localStorage.setItem('medicos', JSON.stringify(newDataArray));
      return newDataArray;
    } else {
      console.error('Nenhum dado encontrado no localStorage');
      return [];
    }
  }
};
