/*for displaying records*/
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users()
{
    /*create state*/
    const [users, setUsers] = useState([])

    /*const[users, setUsers] = useState([{
        Name: "rutvika", Email: "rutvika.ganglia@gmail.com", Age: 24 
    }])*/ /* hardcode - creating state using useState hook and it is in array type for which we add array card which will be fetched from database later*/
    
    //useEffect hook used to fetch other data and records and display
    useEffect(() => { //fetch from server
        axios.get('http://localhost:3001/createUser')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    },[])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/createUser/deleteUser/'+id)
        .then(res => {console.log(res)
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white round p-3'>
                <Link to="/create" className='btn btn-success'>Add</Link>{/* link to create new user */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>{
                                //Name for hardcode
                                return<tr>
                                    <td>{user.name}</td> 
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>
                                    <Link to={`/update/${user._id}`} className='btn  btn-success'>Update</Link>{/* link to update user */}
                                        <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td> {/* for action we have buttons */}
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;