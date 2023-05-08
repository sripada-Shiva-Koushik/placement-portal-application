import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [data, setDate] = useState({
        studentname: '',
        regNo: '',
        email: '',
        password: '',
        year: '',
        dept: '',
        image: ''
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('studentname', data.studentname);
        formdata.append('regNo', data.regNo);
        formdata.append('email', data.email);
        formdata.append('password', data.password);
        formdata.append('year', data.year);
        formdata.append('dept', data.dept)
        formdata.append('image', data.image);
        axios.post('http://localhost:8080/create', formdata)
            .then(res => {
                navigate('/placement')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Add Student</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label for='inputName' className='form-label'>Name</label>
                    <input type="text" className='form-control' placeholder='Enter Name' id="inputName" autoComplete='off'
                        onChange={e => setDate({ ...data, studentname: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label for='inputRegister' className='form-label'>Register No</label>
                    <input type="text" className='form-control' placeholder='Enter Register' id="inputRegister" autoComplete='off'
                        onChange={e => setDate({ ...data, regNo: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label for='inputEmail4' className='form-label'>Email</label>
                    <input type="email" className='form-control' placeholder='Enter Email' id="inputEmail4" autoComplete='off'
                        onChange={e => setDate({ ...data, email: e.target.value })} />
                </div>

                <div className='col-12'>
                    <label for='inputPassword' className='form-label'>Password</label>
                    <input type="password" className='form-control' placeholder='Enter Password' id="inputPassword" autoComplete='off' onChange={e => setDate({ ...data, password: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label for='Year' className='form-label'>Year</label>
                    <input type="number" className='form-control' placeholder='Enter Year' id="inputYear" autoComplete='off' onChange={e => setDate({ ...data, year: e.target.value })} />
                </div>
                <div className='col-12'>
                    <label for='inputDept' className='form-label'>Department</label>
                    <input type="text" className='form-control' placeholder='Enter Department' id="inputDept" autoComplete='off' onChange={e => setDate({ ...data, dept: e.target.value })} />
                </div>
                <div className='col-12 mb-3'>
                    <label for='inputGroupFile01' className='form-label'>Select Image</label>
                    <input type="file" className='form-control' id="inputGroupFile01" onChange={e => setDate({ ...data, image: e.target.files[0] })} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default AddStudent