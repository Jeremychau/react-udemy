import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {
    const USERS = [
        {
            id: 'u1',
            name: 'Eunji',
            image: 'https://post-phinf.pstatic.net/MjAyMjA0MTRfMTMz/MDAxNjQ5OTI5Mjk5Nzg2.Glcp4trcvGaCTp0l0_J_G836YkrDwzA49gk0gl4neScg.zzZ5wkqQNV3vzG4Qp3LxStd7LnbJOB14NjxXcfxAtVAg.JPEG/56.jpg?type=w1200',
            places: 1
        }
    ]

    return (
        <UsersList items={USERS}/>
    )
}

export default Users
