import { Form } from 'react-router-dom';
import { useRef, useState } from 'react';
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import classes from './FormRegister.module.scss';
import consultCEP from '../../services/cepService';
import { setItem } from '../../services/serverDataLocal';
import { checkDoctorExists, validateForm } from '../../utils/utils';

export default function FormRegister({ toggleForm }: { toggleForm: () => void }) {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
  });
  const [errorCep, setErrorCep] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [elementPhoto, setElementPhoto] = useState(0);
  const [errorPhoto, setErrorPhoto] = useState(false);
  const [errorValidate, setErrorValidate] = useState({
    errorCpf: true,
    errorRg: true,
    errorContact: true,
    errorRequireFields: true,
    errorPhotoValid: true,
    exists: true,
  });

  // refs form register
  const photoInputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const cpfRef = useRef<HTMLInputElement>(null);
  const rgRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const crmRef = useRef<HTMLInputElement>(null);
  const specialtyRef = useRef<HTMLInputElement>(null);
  const serviceRefInPerson = useRef<HTMLInputElement>(null);
  const serviceRefOnline = useRef<HTMLInputElement>(null);
  const statusActiveRef = useRef<HTMLInputElement>(null);
  const statusInactiveRef = useRef<HTMLInputElement>(null);
  const cepRef = useRef<HTMLInputElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const neighborhoodRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = () => {
    const file = photoInputRef.current?.files?.[0];
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

  const clearForm = () => {
    // Limpar os estados dos inputs controlados
    setCep('');
    setAddress({
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
    });
    setPhotoURL('');
    setElementPhoto(0);
    setErrorPhoto(false);

    // Limpar os valores dos inputs não controlados usando refs
    if (nameRef.current) nameRef.current.value = '';
    if (cpfRef.current) cpfRef.current.value = '';
    if (rgRef.current) rgRef.current.value = '';
    if (birthDateRef.current) birthDateRef.current.value = '';
    if (emailRef.current) emailRef.current.value = '';
    if (phoneRef.current) phoneRef.current.value = '';
    if (crmRef.current) crmRef.current.value = '';
    if (photoInputRef.current) photoInputRef.current.value = ''; // Limpar o campo de entrada de arquivo
    if (serviceRefInPerson.current) serviceRefInPerson.current.checked = false;
    if (serviceRefOnline.current) serviceRefOnline.current.checked = false;
    if (statusActiveRef.current) statusActiveRef.current.checked = false;
    if (statusInactiveRef.current) statusInactiveRef.current.checked = false;
    if (cepRef.current) cepRef.current.value = '';
    if (streetRef.current) streetRef.current.value = '';
    if (numberRef.current) numberRef.current.value = '';
    if (neighborhoodRef.current) neighborhoodRef.current.value = '';
    if (cityRef.current) cityRef.current.value = '';
    if (stateRef.current) stateRef.current.value = '';
  };

  const handleSave = async () => {
    const formData = {
      name: nameRef.current?.value || '',
      cpf: cpfRef.current?.value.replace(/\D/g, '') || '',
      rg: rgRef.current?.value || '',
      birthDate: birthDateRef.current?.value || '',
      email: emailRef.current?.value || '',
      phone: phoneRef.current?.value || '',
      crm: crmRef.current?.value || '',
      specialty: specialtyRef.current?.value || '',
      photoURL: photoURL,
      service: serviceRefInPerson.current?.checked ? 'presencial' : serviceRefOnline.current?.checked ? 'online' : '',
      status: statusActiveRef.current?.checked ? 'ativo' : statusInactiveRef.current?.checked ? 'inativo' : '',
      errorPhoto: errorPhoto,

      cep: cepRef.current?.value || '',
      street: streetRef.current?.value || '',
      number: numberRef.current?.value || '',
      neighborhood: neighborhoodRef.current?.value || '',
      city: cityRef.current?.value || '',
      state: stateRef.current?.value || '',
    };
    const storedCpfsJSON = localStorage.getItem('delete');
    if (storedCpfsJSON) {
      const storedCpfs = JSON.parse(storedCpfsJSON);
      const cpf = formData.cpf.replace(/\D/g, ''); // Remove caracteres não numéricos do CPF
      if (storedCpfs.includes(cpf)) {
        console.log('CPF encontrado na lista de exclusão, removendo...');
        // Remove o CPF da lista
        const updatedCpfs = storedCpfs.filter((item: string) => item !== cpf);
        localStorage.setItem('delete', JSON.stringify(updatedCpfs));
      }
    }
    const exists = await checkDoctorExists(formData.cpf);
    const { errorCpf, errorRg, errorContact, errorRequireFields, errorPhotoValid } = validateForm(formData);

    if (exists) {
      console.error('Médico já cadastrado!');
      setErrorValidate({
        errorCpf,
        errorRg,
        errorContact,
        errorRequireFields,
        errorPhotoValid,
        exists: false,
      });
      return;
    }

    if (errorCpf && errorRg && errorContact && errorRequireFields && errorPhotoValid && !exists) {
      setItem(JSON.stringify(formData));
      console.log('Formulário enviado:', formData);
      const newDoctor = formData; // Supondo que newDoctor é o novo médico adicionado pelo formulário
      const doctors = JSON.parse(localStorage.getItem('medicos') || '[]');
      doctors.push(newDoctor);
      localStorage.setItem('medicos', JSON.stringify(doctors));
      // Emitir um evento personalizado
      const event = new CustomEvent('localStorageChanged', { detail: doctors });
      window.dispatchEvent(event);
      clearForm();
      setErrorValidate({
        errorCpf: true,
        errorRg: true,
        errorContact: true,
        errorRequireFields: true,
        errorPhotoValid: true,
        exists: true,
      });
    } else {
      setErrorValidate({
        errorCpf,
        errorRg,
        errorContact,
        errorRequireFields,
        errorPhotoValid,
        exists: true,
      });
      console.error('Não enviado.');
    }
  };

  return (
    <>
      <div className={classes.backdrop} onClick={toggleForm}></div>
      <div className={classes.modal}>
        <Form>
          <div>
            <input type="text" name="name" id="name" required ref={nameRef} />
            <label htmlFor="name">Nome:</label>
          </div>
          <div>
            <input type="text" name="cpf" id="cpf" required ref={cpfRef} />
            <label htmlFor="cpf">CPF:</label>
          </div>
          <div>
            <input type="text" name="rg" id="rg" required ref={rgRef} />
            <label htmlFor="rg">RG:</label>
          </div>
          <div>
            <input type="date" name="birthDate" id="birthDate" required ref={birthDateRef} />
            <label htmlFor="birthDate">Data de Nascimento:</label>
          </div>
          <div>
            <input type="email" name="email" id="email" required ref={emailRef} />
            <label htmlFor="email">Email:</label>
          </div>
          <div>
            <input type="text" name="phone" id="phone" required ref={phoneRef} />
            <label htmlFor="phone">Telefone:</label>
          </div>
          <div>
            <input type="text" name="crm" id="crm" required ref={crmRef} />
            <label htmlFor="crm">Especialidade:</label>
          </div>
          <div>
            <input type="text" name="specialty" id="specialty" required ref={specialtyRef} />
            <label htmlFor="specialty">CRM:</label>
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
              <input type="radio" name="service" id="in-person" ref={serviceRefInPerson} />
              <label htmlFor="in-person">Presencial</label>
              <input type="radio" name="service" id="online" ref={serviceRefOnline} />
              <label htmlFor="online">Online</label>
            </div>
          </div>
          <div className={classes.status}>
            <p>Status:</p>
            <div>
              <input type="radio" name="status" id="active" value={'ativo'} ref={statusActiveRef} />
              <label htmlFor="active">Ativo</label>
              <input type="radio" name="status" id="inactive" value={'inativo'} ref={statusInactiveRef} />
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
                <input type="text" name="street" id="street" required defaultValue={address.logradouro} ref={streetRef} />
                <label htmlFor="street">Rua:</label>
              </div>
              <div>
                <input type="number" name="number" id="number" required ref={numberRef} />
                <label htmlFor="number">Número:</label>
              </div>
            </div>
            <div>
              <input type="text" name="neighborhood" id="neighborhood" required defaultValue={address.bairro} ref={neighborhoodRef} />
              <label htmlFor="neighborhood">Bairro:</label>
            </div>
            <div className={classes.twoInput}>
              <div>
                <input type="text" name="city" id="city" required defaultValue={address.localidade} ref={cityRef} />
                <label htmlFor="city">Cidade:</label>
              </div>
              <div>
                <input type="text" name="state" id="state" required defaultValue={address.uf} ref={stateRef} />
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
            <button type="button" onClick={handleSave}>
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
                {!errorValidate.exists && (
                  <div className={classes.error}>
                    <p>
                      <MdErrorOutline /> Já existe um médico cadastrado com esse CPF.
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
