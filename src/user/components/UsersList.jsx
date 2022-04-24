import React from 'react'

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card'
import './UsersList.css';

const UsersList = (props) => {

      if(props.items.length === 0) {
        return <div className='center' >
            <h2>No Users Found.</h2>
        </div>
      }

      return (
        <ul className="users-list">
            {
                props.items.map( (user, index) => {
                    return <UserItem key={index} user={user} id={user.id} image={user.image} name={user.name} placeCount={user.places} />
                })
            }
        </ul>
      )
}

export default UsersList
