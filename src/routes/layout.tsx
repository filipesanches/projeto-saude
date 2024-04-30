import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function Layout() {
  return (
    <>
      <div className={'layout'}>
        <SideBar />
        <div className={'content'}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
