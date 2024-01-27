import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowProfile } from '../redux/profileSlice'
import { IoMdLogOut } from "react-icons/io"
import InputEdit from './profile/InputEdit'
import { updateUser } from '../apis/auth.jsx'
import { toast } from 'react-toastify'
import { setUserNameAndBio } from '../redux/activeUserSlice'
import  ModalSheet from './ui/ModalSheet.jsx';
import { IoMailOpen } from "react-icons/io5";

function Profile(props) {
  const dispatch = useDispatch();
  const { showProfile } = useSelector((state) => state.profile);
  const activeUser = useSelector((state) => state.activeUser);
  
  const [formData, setFormData] = useState({
    name: activeUser.name,
    bio: activeUser.bio
  });

  
  const handleClose = () => {
    dispatch(setShowProfile(false));
  };

  const logoutUser = () => {
    toast.success("Logout Successfull!")
    localStorage.removeItem("userToken")
    window.location.href = "/login"
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submit = async () => {
    dispatch(setUserNameAndBio(formData))
    toast.success("Updated!")
    await updateUser(activeUser.id, formData)

  }

  return (
    <ModalSheet open = {showProfile} onClose = {handleClose}>
    <div className=" max-w-4xl  flex items-center h-[85%]  flex-wrap mx-auto my-28 lg:my-0">
      <div
        id="profile"
        className=" lg:h-2/3 w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] animate-slide-in-elliptic-top-fwd from-amber-300 via-orange-300 to-rose-300  z-30 lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center  lg:text-left">
          <div
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            
          >
            <img className="max-[1023px]:rounded-full h-48 w-48" src={activeUser?.profilePic} />
          </div>

          <InputEdit type="name" handleChange={handleChange} input={formData.name} handleSubmit={submit} />
          <InputEdit type="bio" handleChange={handleChange} input={formData.bio} handleSubmit={submit} />
          
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p className="pt-4 text-base font-bold flex items-center justify-center gap-2 lg:justify-start">
            <IoMailOpen className="h-4 text-green-700 pr-1"/>
            <span>{activeUser?.email }</span>
          </p>
        

          <div onClick={logoutUser} className='mt-2 mx-auto bg-red-700 w-fit flex hover:bg-red-900 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-full'>
          <IoMdLogOut className='text-white h-[23px]' />
          <h6 className='text-[17px] text-white font-semibold'>Logout</h6>
        </div>
          
        </div>
      </div>

      <div className="border border-gray-400 shadow-lg rounded-xl w-full h-[80%] object-cover lg:w-2/5 z-30 animate-slide">
        <img
          src={activeUser?.profilePic}
          className="rounded-none h-full object-cover lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>

    </div>
  </ModalSheet>
  )
}

export default Profile