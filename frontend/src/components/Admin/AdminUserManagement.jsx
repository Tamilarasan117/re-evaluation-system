import React, { useEffect, useState} from 'react'
import { Search } from 'lucide-react'

import toast from 'react-hot-toast'

import { useAdmin } from './../hooks/useAdmin.js'
import { useAuth } from '../hooks/useAuth.js'

import '../../styles/styles.css'
import UsersList from './UsersList.jsx'
import UserState from './UserState.jsx'
import noResult from '../../assets/no-user.jpg'

const AdminUserManagement = () => {
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { deleteUser, getUsers, userList, updateUserRole, updateUserStatus } = useAdmin()
  const { user } = useAuth()
  
  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUser = userList ? userList.filter(user => (
    user.username.toLowerCase().includes(searchValue.toLowerCase())
    || 
    user.email.toLowerCase().includes(searchValue.toLowerCase())
  )) : ''

  // pagination
  const usersPerPage = 5
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUser ? filteredUser.slice(indexOfFirstUser, indexOfLastUser) : ''
  const totalPages = Math.ceil(filteredUser.length / usersPerPage)
  const pages = [...Array(totalPages + 1).keys()].slice(1)
  
  const handlePrevPage  = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleDeleteUser = async (userId) => {    
    const confirm = window.confirm("Are you sure you want to delete this user?")
    if (!confirm) return

    try {
      const getUserRole = filteredUser.filter(
        eachUser => userId === eachUser._id
      )
      if (getUserRole[0].role === 'admin' && getUserRole[0].email === user.email) {
        toast.error('You are the admin, you cannot delete yourself')
      } else {
        await deleteUser(userId)
        toast.success('User deleted successfully')
      }
    } catch (error) {
      toast.error('Failed to delete user')
      console.error(error)
    }
  }

  const handleUpdateUserRole = async (userId, userRole) => {
    const confirm = window.confirm("Are you sure you want to update this user's role?")
    if (!confirm) return
    try {
      const getUserRole = filteredUser.filter(
        eachUser => userId === eachUser._id
      )
      if (getUserRole[0].role === 'admin' && getUserRole[0].email === user.email) {
        toast.error('You are the admin, you cannot update your role')
      } else {
        await updateUserRole(userId, userRole)
        toast.success('User role updated successfully')
      }
    } catch (error) {
      toast.error('Failed to update user role')
      console.error(error)
    }
  }

  const handleUpdateUserStatus = async (userId, userStatus) => {
    const confirm = window.confirm("Are you sure you want to update this user's status?")
    if (!confirm) return
    try {
      const getUserRole = filteredUser.filter(
        eachUser => userId === eachUser._id
      )
      if (getUserRole[0].role === 'admin' && getUserRole[0].email === user.email) {
        toast.error('You are the admin, you cannot update yourself your status')
      } else {
        await updateUserStatus(userId, userStatus)
        toast.success('User status updated successfully')
      }
    } catch (error) {
      toast.error('Failed to update user status')
      console.error(error)
    }
  }

  const filtered = filteredUser.length > 0 
    ? currentUsers.map((user, index) => (
    <UsersList
      key={ index }
      user={ user }
      handleDeleteUser={ handleDeleteUser }
      handleUpdateUserRole={ handleUpdateUserRole }
      handleUpdateUserStatus={ handleUpdateUserStatus }
    />
  )) : ''

  const NoResultImg = () => {
    return (
      <div className='no-result-card'>
        <img src={ noResult } className='no-result-img' alt='No User Available' />
      </div>
    )
  }

  const totalUserCount = userList ? userList.length : 0
  const activeUser = userList ? userList.filter(each => each.status === 'active') : 0
  const activeUserCount = activeUser ? activeUser.length : 0
  const inactiveUser = userList ? userList.filter(each => each.status === 'inactive') : 0
  const inactiveUserCount = inactiveUser ? inactiveUser.length : 0
  const student = userList ? userList.filter(each => each.role === 'student') : 0
  const studentCount = student ? student.length : 0

  return (
    <div className='user-manage-cont'>
      <UserState
        totalUserCount={ totalUserCount }
        activeUserCount={ activeUserCount }
        inactiveUserCount={ inactiveUserCount }
        studentCount={ studentCount }
      />
      <ul className='users-list-card'>
        <li className='users-list-head-card'>
          <h1 className='users-list-main-head'>All User</h1>
          <div className="user-search-container">
            <input
              type="search"
              placeholder='Search by name or email address'
              className="user-search-field"
              onChange={ (e) => setSearchValue(e.target.value) }
              value={ searchValue }
            />
            <Search color='grey' />
          </div>
        </li>
        <li className='users-list-header'>
          <div className='list-header-box-1'>
            <h3 className='list-header-head'>Name</h3>
          </div>
          <div className='list-header-box-2'>
            <h3 className='list-header-head'>Email</h3>
          </div>
          <div className='list-header-box-3'>
            <h3 className='list-header-head'>Role</h3>
          </div>
          <div className='list-header-box-3'>
            <h3 className='list-header-head'>Status</h3>
          </div>
          <div className='list-header-box-1'>
            <h3 className='list-header-head'>Change Role</h3>
          </div>
          <div className='list-header-box-1'>
            <h3 className='list-header-head'>Change Status</h3>
          </div>
          <div className='list-header-box-4'>
            <h3 className='list-header-head'>Action</h3>
          </div>
        </li>
        {
          filteredUser.length > 0 ? filtered : NoResultImg()
        }
      </ul>
      <ul className='page-menu'>
        <li className='page-item'>
            <button
              className="page-btn"
              onClick={ handlePrevPage }
            >
            Prev
            </button>
          </li>
          {
            pages.map((page, index) => (
              <li key={ index } className='page-item'>
                <button
                  className="page-btn"
                  onClick={() => handlePageChange(page)}
                >
                  { page } of { totalPages }
                </button>
              </li>
            ))
          }
          <li className='page-item'>
            <button
              className="page-btn"
              onClick={ handleNextPage }
            >
            Next
            </button>
          </li>
        </ul>
    </div>
  )
}

export default AdminUserManagement