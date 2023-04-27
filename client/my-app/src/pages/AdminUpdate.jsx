import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const AdminUpdate = () => {
    // const [students, getStudents] = useState([]);
    const { id } = useParams();

    const [inputs, setInputs] = useState({
        username: "",
        // email: "",
        company: "",
        salary: "",
        city: "",
        sid: "",
        // from: "",
        // to: "",
        // stipend: "",
        // iid: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/students/placement/get/${id}`);
                const data = res.data;
                setInputs({
                    // ...data,
                    // sid: data.id,
                    // username: data.username,
                    username: data.username,
                    // email: data.email,
                    company: data.company,
                    salary: data.salary,
                    city: data.city,
                    sid: data.id
                });
            } catch (err) {
                setError(err.response.data);
            }
        };
        fetchData();
    }, [id]);

    const [err, setError] = useState(null)
    const [selectedOption, setSelectedOption] = useState("");

    const navigate = useNavigate()

    const handleChange = async (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const table = document.getElementById('plac-intern').value;
    //         const data = { table, ...inputs };
    //         await axios.get('/placement' + id, data)
    //             .then(res => {
    //                 console.log(res)
    //                 setInputs({ ...inputs, username: res.data[0].username, sid: res.data[0].rid, iid: res.data[0].rid })
    //             })
    //         navigate("/home");
    //     } catch (err) {
    //         setError(err.response.data);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { ...inputs };
            await axios.put(`http://localhost:8000/api/students/placement/update/${id}`, data);
            navigate("/home");
        } catch (err) {
            setError(err.response.data);
        }
    };

    return (
        <div>
            <form className='form-container'>
                <div className='form-group'>
                    <label htmlFor="username">Username</label>
                    <input type="text" placeholder='username' name='username' value={inputs.username} onChange={handleChange} disabled />
                </div>
                {/* <input type="text" placeholder='email' name='email' value={inputs.email} onChange={handleChange} /> */}
                <div className='form-group'>
                    <label htmlFor="company">Company</label>
                    <input required type="text" placeholder='Company Name' name='company' value={inputs.company} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="salary">Salary</label>
                    <input required type="number" placeholder='Salary' name='salary' value={inputs.salary} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="city">City</label>
                    <input required type="text" placeholder='City' name='city' value={inputs.city} onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="sid">Register</label>
                    <input required type="number" placeholder='Register Number' name='sid' value={inputs.sid} onChange={handleChange} disabled />
                </div>
                <div className='form-group'>
                    <button onClick={handleSubmit} className='form-submit'>Update</button>
                </div>
                {err && <p>{err}</p>}
            </form>
        </div>
    )
}

export default AdminUpdate