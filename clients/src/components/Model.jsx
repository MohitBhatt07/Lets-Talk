import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx"
import { useEffect } from 'react';
import { searchUsers } from '../apis/auth.jsx';
import { addToGroup, removeUser, renameGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import Search from './group/Search';
import { getChatName, getChatPhoto } from '../utils/logics';
import ModalSheet from './ui/ModalSheet';

function Model(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [searchResults, setSearchResults] = useState([])
  const [name, setName] = useState("")
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [members, setMembers] = useState([])
  const { activeChat } = useSelector((state) => state.chats)
  const activeUser = useSelector((state) => state.activeUser)

  const handleOpen = () => {
    setOpen(true);
    setName(getChatName(activeChat, activeUser))
  };
  const handleClose = () => {
    setOpen(false);
    setSearch("")
    setSearchResults([])
  };
  const handleClick = async (e) => {
    if (members.includes(e)) {
      return
    }
    await addToGroup({ userId: e?._id, chatId: activeChat?._id })
    setMembers([...members, e])

  }

  const updateBtn = async () => {
    if (name) {
      let data = await renameGroup({ chatId: activeChat._id, chatName: name })
      if (data) {
        dispatch(fetchChats())
        setOpen(false)
      }
    }
    setOpen(false)
  }
  const deleteSelected = async (ele) => {
    const res = await removeUser({ chatId: activeChat._id, userId: ele._id })
    if (res._id) {
      setMembers(members.filter((e) => e._id !== ele._id))

      dispatch(fetchChats())
      setOpen(false)

    }
    return
  }
  const leaveGroup = async () => {
    const res = await removeUser({ chatId: activeChat._id, userId: activeUser.id })
    if (res._id) {
      dispatch(fetchChats())
      setOpen(false)
    }
    return
  }
  useEffect(() => {
    setMembers(activeChat?.users.map((e) => e))
  }, [activeChat])
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true)
      const { data } = await searchUsers(search)
      setSearchResults(data)
      setIsLoading(false)
    }
    searchChange()
  }, [search])
  return (
    <>
      <button onClick={handleOpen}>
        <img className='w-[40px] h-[40px] rounded-[25px]' alt="Profile Pic" src={getChatPhoto(activeChat, activeUser)} />

      </button>
      {
        activeChat?.isGroup ?

          <ModalSheet onClose={handleClose} open={open}>
            <div className='p-6 z-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300 via-orange-300 to-rose-300 shadow-2xl shadow-slate-500 opacity-80 animate-slide-in-elliptic-top-fwd rounded-lg' >
              <h5 className='text-[22px] font-semibold tracking-wide text-center text-[#111b21]'>{getChatName(activeChat, activeUser)}</h5>
              <div>
                <h6 className='text-[14px] text-[#111b21] tracking-wide font-semibold'>Members</h6>
                <div className='flex flex-wrap gap-y-2'>
                  {
                    members.length > 0 && members?.map((e) => {
                      
                      return (
                        <button key={e._id} className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400' >
                          <span className='text-[10px]'>{e._id === activeUser.id ? "You" : e.name}</span>
                          <RxCross2 onClick={() => deleteSelected(e)} />
                        </button>
                      )
                    })
                  }
                </div>
                <div>
                  <form className='mt-5 flex flex-col gap-y-3' onSubmit={(e) => e.preventDefault()}>
                    <input onChange={(e) => setName(e.target.value)} value={name} className="  text-base rounded-lg py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
                    <input onChange={(e) => setSearch(e.target.value)} className=" text-base py-[4px] px-2 rounded-lg w-[100%]" type="text" name="users" placeholder="add users" />
                  </form>
                  

                  <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />

                  <div className='flex justify-center gap-x-3 mt-7'>
                    <button onClick={updateBtn} className='bg-[#0086ea] rounded-lg transition hover:bg-[#00A1C9]  px-4 py-1 text-lg tracking-wide text-[#fff]'>Update</button>
                    <button onClick={() => leaveGroup()} className='bg-[#880808] hover:bg-[#A52A2A] transition delay-150 px-4 py-1 text-lg rounded-lg tracking-wide text-[#fff]'>Leave</button>

                  </div>
                </div>
              </div>
            </div>
          </ModalSheet> : <ModalSheet
            open={open}
            onClose={handleClose}
            >
            <div>
              <div className='w-[250px] bg-orange-200  rounded-md h-[250px] flex flex-col items-center justify-center -mt-4'>
                <img className='w-[70px] h-[70px] rounded-[35px] shadow-lg' src={getChatPhoto(activeChat, activeUser)} alt="" />
                <h2 className='text-[17px] tracking-wider font-semibold text-[#313439]'>{getChatName(activeChat, activeUser)}</h2>

                <h3 className='text-[14px] font-semibold text-[#268d61]'>{!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id ? activeChat?.users[1]?.email : activeChat?.users[0]?.email}</h3>
                <div className='flex flex-col items-start'>

                  <h5 className='text-[13px]'>{!activeChat?.isGroup && activeChat?.users[0]?._id === activeUser.id ? activeChat?.users[1]?.bio : activeChat?.users[0]?.bio}</h5>
                </div>
              </div>


            </div>
          </ModalSheet>
      }

    </>
  )
}

export default Model