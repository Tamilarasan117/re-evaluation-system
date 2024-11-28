import React from 'react'

import { Trash2 } from 'lucide-react'

import '../../styles/styles.css'

const UsersList = (props) => {
  const { handleDeleteUser, handleUpdateUserRole, handleUpdateUserStatus, user } = props
  const { _id, username, email, role, status } = user
  
  const onDeleteUser = () => {
    handleDeleteUser(_id)
  }

  const handleChangeRole = (_id, userRole) => {
    handleUpdateUserRole(_id, userRole)
  }

  const handleChangeStatus = (_id, userStatus) => {
    handleUpdateUserStatus(_id, userStatus)
  }

  const isActive = status === 'active' ? 'is-active' : 'is-inactive'
  const isAdmin = role === 'admin' ? 'is-active' : ''

  return (
      <li className='users-list-cell'>
        <div className='list-header-box-1'>
          <span className='list-cell-text'>{ username }</span>
        </div>
        <div className='list-header-box-2'>
          <span className='list-cell-text'>{ email }</span>
        </div>
        <div className='list-header-box-3'>
          <span className={`list-cell-text ${ isAdmin }`}>{ role }</span>
        </div>
        <div className='list-header-box-3'>
          <span className={`list-cell-text ${ isActive }`}>{ status }</span>
        </div>
        <div className='list-header-box-1'>
          <select
            className='list-drop-down'
            value={user.role}
            onChange={(e) => handleChangeRole(_id, e.target.value)}
          >
            <option value="student">Student</option>
            <option value="evaluator">Evaluator</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className='list-header-box-1'>
          <select
            className='list-drop-down'
            value={user.status}
            onChange={(e) => handleChangeStatus(_id, e.target.value)}
          >
            <option value='active'>Active</option>
            <option value='inactive'>Inactive</option>
          </select>
        </div>
        <div className='list-header-box-4'>
          <div className='list-delete-card'>
            <button className='list-delete-btn' onClick={ onDeleteUser }> <Trash2 color='#333' /> </button>
          </div>
        </div>
      </li>
  )
}

export default UsersList


/*




*/