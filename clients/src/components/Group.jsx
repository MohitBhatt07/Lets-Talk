import React, { useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { searchUsers } from '../apis/auth.jsx';
import { RxCross2 } from 'react-icons/rx';
import { useEffect } from 'react';
import { createGroup } from '../apis/chat';
import { fetchChats } from '../redux/chatsSlice';
import { useDispatch } from 'react-redux';
import Search from './group/Search';
import ModalSheet from './ui/ModalSheet';


function Group() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUsers] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearch('');
    setSelectedUsers([]);
  };
  const handleFormSearch = async (e) => {
    setSearch(e.target.value);
  };
  const handleClick = (e) => {
    if (selectedUser.includes(e)) {
      return;
    }
    setSelectedUsers([...selectedUser, e]);
  };

  const deleteSelected = (ele) => {
    setSelectedUsers(selectedUser.filter((e) => e._id !== ele._id));
  };
  const handleSubmit = async () => {
    if (selectedUser.length >= 2) {
      await createGroup({
        chatName,
        users: JSON.stringify(selectedUser.map((e) => e._id)),
      });
      dispatch(fetchChats());
      handleClose();
    }
  };
  useEffect(() => {
    const searchChange = async () => {
      setIsLoading(true);
      const { data } = await searchUsers(search);
      setSearchResults(data);
      setIsLoading(false);
    };
    searchChange();
  }, [search]);
  useEffect(() => {}, []);
  return (
    <>
      <div
        className="mt-1 mb-4 transition duration-150 ease-in-out"
        onClick={handleOpen}
      >
        <div className="flex justify-start border-r-2">
          <button className="text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-orange-200 rounded-lg text-[#1f2228] py-1 -mb-7 mt-2  px-2">
            New Group <BsPlusLg />
          </button>
        </div>
      </div>
      <ModalSheet
        open={open}
        onClose={handleClose}
      >
        <div
          className={`
         z-30 w-5/6 md:w-2/6  m-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] animate-slide-in-elliptic-top-fwd from-amber-300 via-orange-300 to-rose-300 shadow-2xl shadow-slate-500 opacity-80 p-10 rounded-2xl`}
        >
          <h5 className="text-[18px] text-[#111b21] font-medium text-center">
            Create A Group
          </h5>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-y-3 mt-3"
          >
            <input
              onChange={(e) => setChatName(e.target.value)}
              className="border-[#c4ccd5] rounded-lg border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]"
              type="text"
              name="chatName"
              placeholder="Group Name"
              required
            />
            <input
              onChange={handleFormSearch}
              className="border-[#c4ccd5] rounded-lg border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]"
              type="text"
              name="users"
              placeholder="add users"
            />
            <div className="flex -mt-2">
              {selectedUser?.map((e) => {
                return (
                  <button
                    key={e}
                    onClick={() => deleteSelected(e)}
                    className="flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400"
                  >
                    <span>{e.name}</span>
                    <RxCross2 />
                  </button>
                );
              })}
            </div>

            <Search
              isLoading={isLoading}
              handleClick={handleClick}
              search={search}
              searchResults={searchResults}
            />

            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmit}
                className="bg-[#0086ea] rounded-lg text-[#fff] text-[15px] font-medium px-2 py-1 tracking-wide"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </ModalSheet>
    </>
  );
}

export default Group;
