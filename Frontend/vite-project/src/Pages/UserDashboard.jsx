import Titlebar from '../Components/Titlebar'
import Sidebar from '../Components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function UserDashboard() {
  return (
    <>
        <Titlebar/>
        <div className='flex gap-6'>
            <Sidebar/>
            <Outlet/>
        </div>
        
        
    
    
    </>
  )
}
