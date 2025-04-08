import Sidebar from '../components/SideBar/SideBar'
import NavBar from '../components/NavBar/NavBar'


function Dashboard({ children }) {
  return (
    <>
      <Sidebar />
      <NavBar />
      {children}
    </>
  );
}

export default Dashboard;
