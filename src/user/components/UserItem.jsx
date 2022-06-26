import React from 'react'
import { Link } from 'react-router-dom';

import Acatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'
import './UserItem.css';

const UserItem = (props) => {
    console.log(`http://192.168.1.13:3000/${props.image}`);
  return (
      <li className='user-item'>
            <Card className='user-item__content'>
                <Link to={`/${props.user._id}/places`}>
                    <div className='user-item__image'>
                        <Acatar image={`http://localhost:3030/${props.image}`} alt={props.name} />
                    </div>
                    <div className='user-item__info'>
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'} </h3>
                    </div>
                </Link>
            </Card>
      </li>
  )
}

export default UserItem