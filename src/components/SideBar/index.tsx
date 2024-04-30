import { Link, NavLink } from 'react-router-dom';
import { RiHealthBookFill } from 'react-icons/ri';
import { IoMenu } from 'react-icons/io5';
import classes from './SideBar.module.scss'
import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

export default function SideBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className={classes.sideBar}>
      <Link
        to={`/`}
        className={classes.logo}
        onClick={() => {
          if (openMenu) toggleMenu();
        }}
      >
        <RiHealthBookFill className={classes.iconLogo} />
        <span>Sistema Saúde</span>
      </Link>
      <button className={classes.menu} onClick={toggleMenu}>
        {!openMenu ? <IoMenu /> : <FaXmark />}
      </button>
      <nav className={classes.navBar + ' ' + (openMenu ? classes.open : '')}>
        <ul>
          <li>
            <NavLink to={`/cadastro`} onClick={toggleMenu} className={({ isActive }) => (isActive ? classes.active : '')}>
              Cadastrar
            </NavLink>
          </li>
          <li>
            <NavLink to={`/lista-de-medicos`} onClick={toggleMenu} className={({ isActive }) => (isActive ? classes.active : '')}>
              Lista de Médicos
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
