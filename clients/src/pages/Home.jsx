import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers, validUser } from '../apis/auth.jsx'
import { setActiveUser } from '../redux/activeUserSlice'
import { BsSearch } from "react-icons/bs"
import { IoIosArrowDown } from "react-icons/io"
import { setShowNotifications, setShowProfile } from '../redux/profileSlice'
import Chat from './Chat'
import Profile from "../components/Profile"

import { acessCreate } from "../apis/chat.js"
import "./home.css"
import { fetchChats, setNotifications } from '../redux/chatsSlice'
import { MdOutlineNotificationsActive } from "react-icons/md"
import { getSender } from '../utils/logics'
import { setActiveChat } from '../redux/chatsSlice'
import Group from '../components/Group'
import Contacts from '../components/Contacts'
import Search from '../components/group/Search'
import { IoNotificationsSharp } from 'react-icons/io5'
function Home() {
  const dispatch = useDispatch()
  const { showProfile, showNotifications } = useSelector((state) => state.profile)
  const { notifications } = useSelector((state) => state.chats)
  const { activeUser } = useSelector((state) => state)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState("")

  const handleSearch = async (e) => {
    setSearch(e.target.value)
  }
  const handleClick = async (e) => {
    await acessCreate({ userId: e._id })
    dispatch(fetchChats())
    setSearch("")
  }
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true)
      const { data } = await searchUsers(search)
      setSearchResults(data)
      setIsLoading(false)
    }
    searchChange()
  }, [search])
  useEffect(() => {
    const isValid = async () => {
      const data = await validUser()

      const user = {
        id: data?.user?._id,
        email: data?.user?.email,
        profilePic: data?.user?.profilePic,
        bio: data?.user?.bio,
        name: data?.user?.name
      }
      dispatch(setActiveUser(user))
    }
    isValid()

  }, [dispatch, activeUser])


  return (
    <>
      <div className="pt-4 scrollbar-hide z-10 h-[100vh] overflow-x-hidden w-[95%] lg:mx-auto overflow-y-hidden shadow-2xl">
        <div className='flex gap-3'>
          {
            !showProfile ?
              <div className="md:flex rounded-xl md:flex-col min-w-[360px] h-[95vh]  bg-[#ffff] relative">  
                <div className='h-[61px] px-4'>
                  <div className='flex'>
                    <a className='flex items-center relative  -top-4  h-[90px]' href='/'>
                      <h3 className='text-[20px] text-[#1f2228] font-body font-extrabold tracking-wider'>Messages</h3>
                    </a>
                  </div>
                  <div className='absolute top-4 right-5 flex items-center gap-x-3'>
                    <button onClick={() => dispatch(setShowNotifications(!showNotifications))}>
                      <div className="bg-red-500 text-white rounded-full px-2 py-1 inline-flex items-center justify-center">{notifications.length}</div>
                      {
                        showNotifications ? <IoNotificationsSharp style={{ width: "25px", height: "25px", color: "#0000FF" }} /> : <MdOutlineNotificationsActive style={{ color: "#0000FF", width: "25px", height: "25px" }} />
                      }

                    </button>
                    <div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl" : "hidden"}`}>
                      <div className='text-[13px]'>

                        {!notifications.length && "No new messages"}
                      </div>
                      {
                        notifications.map((e, index) => {
                          return (
                            <div onClick={() => {
                              dispatch(setActiveChat(e.chatId))
                              dispatch(setNotifications(notifications.filter((data) => data !== e)))

                            }} key={index} className='text-[12.5px] text-black px-2 cursor-pointer' >

                              {e.chatId.isGroup ? `New Message in ${e.chatId.chatName}` : `New Message from ${getSender(activeUser, e.chatId.users)}`}
                            </div>

                          )

                        })
                      }
                    </div>
                    <button onClick={() => dispatch(setShowProfile(true))} className='flex items-center gap-x-1 relative'>
                      <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="" />
                      <IoIosArrowDown style={{ color: "#616c76", height: "14px", width: "14px" }} />
                    </button>
                  </div>
                </div>

                <div>

                  <div className='-mt-6 relative pt-6 px-4'>
                    <form onSubmit={(e) => e.preventDefault()}>

                      <input onChange={handleSearch} className='w-[99.5%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0' type="text" name="search" placeholder="Search" />

                    </form>

                    <div className='absolute top-[36px] left-[27px]'>
                      <BsSearch style={{ color: "#c4c4c5" }} />
                    </div>
                    <Group />

                    <div style={{ display: search ? "" : "none" }} className='h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-[#fff] flex flex-col gap-y-3 pt-3 px-4'>
                      <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />

                    </div>
                  </div>


                  <Contacts />


                </div>


              </div> : <Profile className="" />
          }
          <Chat className="chat-page relative lg:w-[100%] h-[95vh] rounded-xl bg-[#fafafa]" />
        </div>
      </div >

    </>
  )
}

export default Home