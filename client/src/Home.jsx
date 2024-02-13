import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001')
        .then((res) => {
            setData(res.data);
        })
        .catch((err) => console.log(err));
    }, []);

    function handleDelete(id) {
        axios.delete('http://localhost:3001/delete/' + id)
        .then(() => {
            window.location.reload();
            alert("Deleted student record...");
        })
        .catch((err) => console.log(err));
    };

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Student List</h2>
            <div className='d-flex justify-content-end'>
                <Link to={'/create'} className='btn btn-success'>Create +</Link>
            </div>
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
                    {data.map((student, index) => {
                        return <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <Link to={`/read/${student.id}`} className='btn btn-sm btn-info fw-bold text-white'>Read</Link>
                                <Link to={`/edit/${student.id}`} className='btn btn-sm btn-primary mx-2 fw-bold text-white'>Edit</Link>
                                <button onClick={() => handleDelete(student.id)} className='btn btn-sm btn-danger fw-bold text-white'>Delete</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home;