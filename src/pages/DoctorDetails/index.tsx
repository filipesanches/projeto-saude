import { useState, useEffect, SetStateAction } from 'react';
import { Link, useParams } from 'react-router-dom';
import { DoctorData, FormData } from '../../interfaces/appInterfaces';
import { fetchData } from '../../utils/utils';
import classes from './DoctorDetails.module.scss';
import { TiDocumentText } from 'react-icons/ti';
import { HiOutlineIdentification } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdAlternateEmail, MdDelete, MdEdit } from 'react-icons/md';
import { CiMobile4 } from 'react-icons/ci';
import { GrStatusUnknown } from 'react-icons/gr';
import { LuMapPin } from 'react-icons/lu';
import FormEdit from '../../components/FormEdit';
import { removeItem } from '../../services/serverDataLocal';

export default function DoctorDetails() {
  const [doctorData, setDoctorData] = useState<DoctorData[]>([]);
  const { cpf } = useParams();
  const [openFormCadastro, setOpenFormCadastro] = useState(false);
  const [updateDataCard, setUpdateDataCard] = useState<FormData | DoctorData[]>([]);

  const toggleFormCadastro = () => {
    console.log(openFormCadastro);
    setOpenFormCadastro(!openFormCadastro);
  };

  const updateFormCadastro = (upToDate: SetStateAction<FormData | DoctorData[]>) => {
    setUpdateDataCard(upToDate);
  };

  useEffect(() => {
    async function fetchDataAndSetDoctors() {
      try {
        const combinedDoctorsData = await fetchData();
        setDoctorData(combinedDoctorsData);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os médicos:', error);
      }
    }

    fetchDataAndSetDoctors();
  }, [cpf]);

  const doctor = doctorData.find((doctor) => doctor.cpf === cpf);

  const name = (Array.isArray(updateDataCard) ? updateDataCard[0]?.name : updateDataCard?.name) || doctor?.name;
  const cpfData = (Array.isArray(updateDataCard) ? updateDataCard[0]?.cpf : updateDataCard?.cpf) || doctor?.cpf;
  const rg = (Array.isArray(updateDataCard) ? updateDataCard[0]?.rg : updateDataCard?.rg) || doctor?.rg;
  const birthDate = (Array.isArray(updateDataCard) ? updateDataCard[0]?.birthDate : updateDataCard?.birthDate) || doctor?.birthDate;
  const email = (Array.isArray(updateDataCard) ? updateDataCard[0]?.email : updateDataCard?.email) || doctor?.email;
  const phone = (Array.isArray(updateDataCard) ? updateDataCard[0]?.phone : updateDataCard?.phone) || doctor?.phone;
  const crm = (Array.isArray(updateDataCard) ? updateDataCard[0]?.crm : updateDataCard?.crm) || doctor?.crm;
  const photo = (Array.isArray(updateDataCard) ? updateDataCard[0]?.photoURL : updateDataCard?.photoURL) || doctor?.photoURL;
  const service = (Array.isArray(updateDataCard) ? updateDataCard[0]?.service : updateDataCard?.service) || doctor?.service;
  const status = (Array.isArray(updateDataCard) ? updateDataCard[0]?.status : updateDataCard?.status) || doctor?.status;
  const cep = (Array.isArray(updateDataCard) ? updateDataCard[0]?.cep : updateDataCard?.cep) || doctor?.cep;
  const street = (Array.isArray(updateDataCard) ? updateDataCard[0]?.street : updateDataCard?.street) || doctor?.street;
  const number = (Array.isArray(updateDataCard) ? updateDataCard[0]?.number : updateDataCard?.number) || doctor?.number;
  const neighborhood = (Array.isArray(updateDataCard) ? updateDataCard[0]?.neighborhood : updateDataCard?.neighborhood) || doctor?.neighborhood;
  const city = (Array.isArray(updateDataCard) ? updateDataCard[0]?.city : updateDataCard?.city) || doctor?.city;
  const state = (Array.isArray(updateDataCard) ? updateDataCard[0]?.state : updateDataCard?.state) || doctor?.state;

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className={classes['modal-cancel']}>
          <div className={classes['modal-content']}>
            <h2>Tem certeza que deseja excluir?</h2>
            <div>
              <Link to={`/cadastro/${doctor?.cpf}`} onClick={toggleModal}>
                Cancelar
              </Link>

              <Link
                to={`/cadastro`}
                onClick={() => {
                  removeItem(doctor?.cpf as string);
                }}
              >
                Confirmar
              </Link>
            </div>
          </div>
        </div>
      )}

      {openFormCadastro && (
        <div className={classes.formEdit}>
          <FormEdit upToDate={updateFormCadastro} dataForm={doctor ?? ({} as FormData)} toggleForm={toggleFormCadastro} />
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.cardRegister}>
          <div className={classes.cardRegisterHeader}>
            <div className={classes.cardRegisterPhoto}>
              <img src={photo} alt={'Foto do médico'} />
              <h3>{name}</h3>
            </div>
            <div className={classes.buttons}>
              <MdEdit onClick={toggleFormCadastro} />
              <MdDelete onClick={toggleModal} />
            </div>
          </div>
          <div className={classes.cardRegisterBody}>
            <p>
              <TiDocumentText />
              CPF: {cpfData}
            </p>
            <p>
              <HiOutlineIdentification /> Rg: {rg}
            </p>
            <p>
              <IoCalendarOutline /> Data de Nascimento: {birthDate}
            </p>
            <p>
              <MdAlternateEmail /> Email: {email}
            </p>
            <p>
              <CiMobile4 /> Telefone: {phone}
            </p>
            <p>
            <HiOutlineIdentification /> CRM: {crm}
            </p>
            <p>
              <TiDocumentText /> Serviço: {service}
            </p>
            <p>
              <GrStatusUnknown /> Status: {status}
            </p>
            <div className={classes.address}>
              <p>
                <LuMapPin /> Endereço:
              </p>
              <div className={classes.addressInfo}>
                <p>
                  {cep} - {street} - {number} - {neighborhood} - {city} - {state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
