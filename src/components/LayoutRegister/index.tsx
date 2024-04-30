import { Link } from 'react-router-dom';
import classes from './LayoutRegister.module.scss';
import { DoctorData } from '../../interfaces/appInterfaces';
import { TiDocumentText } from 'react-icons/ti';
import { HiOutlineIdentification } from 'react-icons/hi';
import { IoCalendarOutline } from 'react-icons/io5';
import { MdAlternateEmail } from 'react-icons/md';
import { CiMobile4 } from 'react-icons/ci';
import { GrStatusUnknown } from 'react-icons/gr';
import { LuMapPin } from 'react-icons/lu';
import { IoMdSearch, IoMdPersonAdd } from 'react-icons/io';
import { useState } from 'react';
import FormRegister from '../FormRegister';
import { FaUserDoctor } from 'react-icons/fa6';

export default function LayoutRegister({ doctors }: { doctors: DoctorData[] }) {
  const [search, setSearch] = useState('');
  const [openFormCadastro, setOpenFormCadastro] = useState(false);
  const toggleFormCadastro = () => {
    setOpenFormCadastro(!openFormCadastro);
  };

  const filteredData = doctors.filter((doctor) => doctor.cpf.startsWith(search) || doctor.name.startsWith(search) || doctor.crm.startsWith(search)  || doctor.specialty.startsWith(search));

  const formContainer = (
    <div className={classes['form-container']}>
      <FormRegister toggleForm={toggleFormCadastro} />
    </div>
  );
  return (
    <>
      <div className={classes.container}>
        <div className={classes['search-container']}>
          <form id="search-form" role="search">
            <div>
              <input placeholder="Busque por nome, CPF, CRM ou Especialidade" type="search" name="search" onChange={(e) => setSearch(e.target.value)} value={search} />
              <IoMdSearch className={classes['icon-search']} />
            </div>
          </form>
          <button className={classes['icon-add']} onClick={toggleFormCadastro}>
            <IoMdPersonAdd /> <span>Novo Cadastro</span>
          </button>
        </div>
        {openFormCadastro && formContainer}
        <div className={classes['card-container']}>
          {filteredData.map((doctor) => (
            <div key={doctor.cpf} className={classes['card-register']}>
              <Link to={`/cadastro/${doctor.cpf}`} className={classes.cardLink}>
                <div className={classes['card-register-header']}>
                  {doctor.photoURL && <img src={doctor.photoURL} alt={doctor.name} />}
                  <h3>{doctor.name}</h3>
                </div>
                <div className={classes['card-register-body']}>
                  <p>
                    <TiDocumentText />
                    CPF: {doctor.cpf}
                  </p>
                  <p>
                    <HiOutlineIdentification /> Rg: {doctor.rg}
                  </p>
                  <p>
                    <IoCalendarOutline /> Data de Nascimento: {doctor.birthDate}
                  </p>
                  <p>
                    <MdAlternateEmail /> Email: {doctor.email}
                  </p>
                  <p>
                    <CiMobile4 /> Telefone: {doctor.phone}
                  </p>
                  <p>
                    <HiOutlineIdentification /> CRM: {doctor.crm}
                  </p>
                  <p>
                    <FaUserDoctor /> Especialidade: {doctor.specialty}
                  </p>
                  <p>
                    <TiDocumentText /> Serviço: {doctor.service}
                  </p>
                  <p>
                    <GrStatusUnknown /> Status: {doctor.status}
                  </p>
                  <div className={classes.address}>
                    <p>
                      <LuMapPin /> Endereço:
                    </p>
                    <div className={classes['address-info']}>
                      <p>
                        {doctor.cep} - {doctor.street} - {doctor.number} - {doctor.neighborhood} - {doctor.city} - {doctor.state}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
