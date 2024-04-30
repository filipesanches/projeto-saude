import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import classes from './FormEdit.module.scss';
import { FormData, FormEditProps } from '../../interfaces/appInterfaces';
import { editItem } from '../../services/serverDataLocal';
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import { validateForm } from '../../utils/utils';
import consultCEP from '../../services/cepService';

export default function FormEdit({ toggleForm, dataForm, upToDate }: FormEditProps) {
  const [userData, setUserData] = useState<FormData>(dataForm);

  const [photoURL, setPhotoURL] = useState('');
  const [elementPhoto, setElementPhoto] = useState(0);
  const [errorPhoto, setErrorPhoto] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);

  const [cep, setCep] = useState(userData.cep);
  const cepRef = useRef<HTMLInputElement>(null);
  const [errorCep, setErrorCep] = useState(false);
  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });
  const [errorValidate, setErrorValidate] = useState({
    errorCpf: true,
    errorRg: true,
    errorContact: true,
    errorRequireFields: true,
    errorPhotoValid: true,
  });

  useEffect(() => {});

  useEffect(() => {
    setUserData(dataForm);
  }, [dataForm]);

  useEffect(() => {
    if (photoURL !== '') {
      setUserData({
        ...userData,
        photoURL: photoURL,
      });
      console.log(photoURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photoURL]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(userData);
    console.log(name, value);
    console.log(dataForm);
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePhotoUpload = () => {
    const file = photoInputRef.current?.files?.[0];
    console.log(file);
    if (file) {
      setElementPhoto(1);
      if (!file.type.startsWith('image')) {
        setErrorPhoto(true);
        console.error('Por favor, selecione um arquivo de imagem.');
        return;
      } else {
        setErrorPhoto(false);
      }
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result;
        setPhotoURL(base64Image as string);
      };

      reader.onerror = () => {
        setErrorPhoto(true);
        console.error('Erro ao carregar a foto.');
      };

      reader.readAsDataURL(file);
    }
  };

  const elementPhotoUpload = () => {
    return (
      <>
        {elementPhoto === 0 ? null : (
          <>
            {errorPhoto ? (
              <div className={classes.error}>
                <p>
                  <MdErrorOutline /> Por favor, selecione um arquivo de imagem.
                </p>
              </div>
            ) : null}
            {!errorPhoto && (
              <div className={classes.success}>
                <div>
                  <p>
                    <MdCheckCircle /> Imagem selecionada.
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </>
    );
  };

  const handleChangeCEP = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCep = event.target.value.replace(/\D/g, '');

    setCep(newCep);

    if (/^\d{8}$/.test(newCep)) {
      try {
        const consult = await consultCEP(newCep);
        setAddress(consult);
        setErrorCep(false);
      } catch {
        setErrorCep(true);
        console.error('CEP Incorreto!');
      }
    }
  };

  const saveLocalStorageDataEdit = async () => {
    console.log(address);
    setUserData({
      name: userData.name,
      errorPhoto: errorPhoto,
      birthDate: userData.birthDate,
      service: userData.service,
      crm: userData.crm,
      rg: userData.rg,
      cpf: userData.cpf,
      email: userData.email,
      phone: userData.phone,
      status: userData.status,
      photoURL: photoURL,
      number: userData.number,
      cep: cep,
      city: address.localidade,
      state: address.uf,
      street: address.logradouro,
      neighborhood: address.bairro,
    });
    const { errorCpf, errorRg, errorContact, errorRequireFields, errorPhotoValid } = validateForm(userData);
    console.log(userData);
    if (errorCpf && errorRg && errorContact && errorRequireFields && errorPhotoValid) {
      await editItem(userData);
      upToDate(userData);
      toggleForm();
      setErrorValidate({
        errorCpf: true,
        errorRg: true,
        errorContact: true,
        errorRequireFields: true,
        errorPhotoValid: true
      });
    } else {
      setErrorValidate({
        errorCpf,
        errorRg,
        errorContact,
        errorRequireFields,
        errorPhotoValid,
      });
    }
  };

  return (
    <>
      <div className={classes.backdrop} onClick={toggleForm}></div>
      <div className={classes.modal}>
        <Form>
          <div>
            <input type="text" name="name" id="name" required value={userData.name} onChange={handleInputChange} />
            <label htmlFor="name">Nome:</label>
          </div>
          <div>
            <input type="text" name="cpf" id="cpf" required value={userData.cpf} onChange={handleInputChange} />
            <label htmlFor="cpf">CPF:</label>
          </div>
          <div>
            <input type="text" name="rg" id="rg" required value={userData.rg} onChange={handleInputChange} />
            <label htmlFor="rg">RG:</label>
          </div>
          <div>
            <input type="date" name="birthDate" id="birthDate" required value={userData.birthDate} onChange={handleInputChange} />
            <label htmlFor="birthDate">Data de Nascimento:</label>
          </div>
          <div>
            <input type="email" name="email" id="email" required value={userData.email} onChange={handleInputChange} />
            <label htmlFor="email">Email:</label>
          </div>
          <div>
            <input type="text" name="phone" id="phone" required value={userData.phone} onChange={handleInputChange} />
            <label htmlFor="phone">Telefone:</label>
          </div>
          <div>
            <input type="text" name="crm" id="crm" required value={userData.crm} onChange={handleInputChange} />
            <label htmlFor="crm">CRM:</label>
          </div>
          <div className={classes.photo}>
            <p>Foto:</p>
            <div>
              <input type="file" name="photo" id="photo" required ref={photoInputRef} onChange={handlePhotoUpload} />
              <label htmlFor="photo">Selecionar Imagem</label>
            </div>
            {elementPhotoUpload()}
          </div>
          <div className={classes.service}>
            <p>Atendimento:</p>
            <div>
              <input type="radio" name="service" id="in-person" value="presencial" checked={userData.service === 'presencial'} onChange={handleRadioChange} />
              <label htmlFor="in-person">Presencial</label>
              <input type="radio" name="service" id="online" value="online" checked={userData.service === 'online'} onChange={handleRadioChange} />
              <label htmlFor="online">Online</label>
            </div>
          </div>
          <div className={classes.status}>
            <p>Status:</p>
            <div>
              <input type="radio" name="status" id="active" value={'ativo'} checked={userData.status === 'ativo'} onChange={handleRadioChange} />
              <label htmlFor="active">Ativo</label>
              <input type="radio" name="status" id="inactive" value={'inativo'} checked={userData.status === 'inativo'} onChange={handleRadioChange} />
              <label htmlFor="inactive">Inativo</label>
            </div>
          </div>
          <div className={classes.address}>
            <p>Endereço:</p>
            <div>
              <input type="text" name="cep" id="cep" required onChange={handleChangeCEP} value={cep} ref={cepRef} />
              <label htmlFor="cep">CEP:</label>
            </div>
            <div className={classes.twoInput}>
              <div>
                <input type="text" name="street" id="street" required value={address.logradouro || userData.street} onChange={handleInputChange} />
                <label htmlFor="street">Rua:</label>
              </div>
              <div>
                <input type="number" name="number" id="number" required value={userData.number} onChange={handleInputChange} />
                <label htmlFor="number">Número:</label>
              </div>
            </div>
            <div>
              <input type="text" name="neighborhood" id="neighborhood" required value={address.bairro || userData.neighborhood} onChange={handleInputChange} />
              <label htmlFor="neighborhood">Bairro:</label>
            </div>
            <div className={classes.twoInput}>
              <div>
                <input type="text" name="city" id="city" required value={address.localidade || userData.city} onChange={handleInputChange} />
                <label htmlFor="city">Cidade:</label>
              </div>
              <div>
                <input type="text" name="state" id="state" required value={address.uf || userData.state} onChange={handleInputChange} />
                <label htmlFor="state">Estado:</label>
              </div>
            </div>
            <div className={classes.error}>
              {errorCep && (
                <p>
                  <MdErrorOutline /> CEP Incorreto!
                </p>
              )}
            </div>
          </div>
          <div className={classes.buttons}>
            <button type="button" onClick={toggleForm}>
              Cancelar
            </button>
            <button type="button" onClick={saveLocalStorageDataEdit}>
              Salvar
            </button>
          </div>
          <div>
            <>
              <>
                {!errorValidate.errorCpf && (
                  <div className={classes.error}>
                    <p>
                      <MdErrorOutline /> CPF inválido.
                    </p>
                  </div>
                )}
                {!errorValidate.errorRg && (
                  <div className={classes.error}>
                    <p>
                      <MdErrorOutline /> RG inválido.
                    </p>
                  </div>
                )}
                {!errorValidate.errorContact && (
                  <div className={classes.error}>
                    <p>
                      <MdErrorOutline /> Por favor, preencha um email ou um telefone.
                    </p>
                  </div>
                )}
                {!errorValidate.errorRequireFields && (
                  <div className={classes.error}>
                    <p>
                      <MdErrorOutline /> Por favor, preencha todos os campos obrigatórios.
                    </p>
                  </div>
                )}
              </>
            </>
          </div>
        </Form>
      </div>
    </>
  );
}
