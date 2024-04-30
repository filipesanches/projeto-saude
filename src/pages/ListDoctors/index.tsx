import { useEffect, useState } from 'react';
import { CustomStorageEvent, DoctorData } from '../../interfaces/appInterfaces';
import { fetchData } from '../../utils/utils';
import classes from './ListDoctors.module.scss';
import { HiIdentification } from 'react-icons/hi';
import { BiSolidCity } from 'react-icons/bi';
import { MdInfo } from 'react-icons/md';
import { HiBriefcase } from 'react-icons/hi2';
import { IoMdSearch } from 'react-icons/io';

export default function ListDoctors() {
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [update, setUpdate] = useState(0); // Adicionar um estado para forçar a atualização
  const [search, setSearch] = useState('');

  const filteredData = doctors.filter((doctor) => doctor.city.startsWith(search) || doctor.name.startsWith(search) || doctor.crm.startsWith(search));


  useEffect(() => {
    async function fetchDataAndSetDoctors() {
      try {
        const combinedDoctorsData = await fetchData();
        setDoctors(combinedDoctorsData);
      } catch (error) {
        console.error('Ocorreu um erro ao buscar os médicos:', error);
      }
    }
    fetchDataAndSetDoctors();

    function handleLocalStorageChange(e: CustomStorageEvent) {
      setDoctors(e.detail);
      setUpdate(update + 1); // Atualizar o estado 'update' para forçar a atualização do componente
    }

    window.addEventListener('localStorageChanged', handleLocalStorageChange as EventListener);

    // Limpeza na desmontagem
    return () => {
      window.removeEventListener('localStorageChanged', handleLocalStorageChange as EventListener);
    };
  }, [update]); // Adicionar 'update' às dependências do useEffect

  return (
    <>
      <div className={classes.container}>
        <div className={classes['search-container']}>
          <form id="search-form" role="search">
            <div>
              <input placeholder="Busque por nome, local ou crm" type="search" name="search" onChange={(e) => setSearch(e.target.value)} value={search} />
              <IoMdSearch className={classes['icon-search']} />
            </div>
          </form>
        </div>
        <div className={classes['container-card']}>
          {filteredData.map((doctor) => {
            return (
              <div className={classes['doctor-card']} key={doctor.cpf}>
                <div>
                  {doctor.photoURL === '' ? null : <img src={doctor.photoURL} alt="" />}
                  <p className={classes['doctor-name']}>{doctor.name}</p>
                </div>
                <p className={classes['doctor-info']}>
                  <HiIdentification /> {doctor.crm}
                </p>
                <p className={classes['doctor-info']}>
                  <BiSolidCity /> {doctor.city}
                </p>
                <p className={classes['doctor-info']}>
                  <MdInfo /> <span className={`${doctor.status === 'ativo' ? classes['doctor-active'] : classes['doctor-inactive']} ${classes['doctor-info']}`}>{doctor.status}</span>
                </p>
                <p className={classes['doctor-info']}>
                  <HiBriefcase /> {doctor.service}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
