import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Read() {

    const { id } = useParams();

    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/read/'+ id)
        .then((res) => {
            setStudent(res.data);
        })
        .catch((err) => console.log(err));
    });

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Student Detail</h2>
            <br />
            <table className='table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                    {student.map((student, index) => {
                        return <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <Link to={'/'} className='btn btn-info me-2 fw-bold text-white'>Back</Link>
                                <Link to={`/edit/${student.id}`} className='btn btn-secondary fw-bold text-white'>Edit</Link>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Read;