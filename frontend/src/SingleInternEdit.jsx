import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const SingleInternEdit = () => {
    const [data, setDate] = useState({
        regNo: '',
        company: '',
        from: '',
        to: '',
        stipend: '',
        loi: ''
    })

    const navigate = useNavigate()
    const { id, company } = useParams();

    useEffect(() => {

        axios.get('http://localhost:8080/getInternCompany/' + id + '/' + company)
            .then(res => {
                // setDate({
                //     ...data, regNo: res.data.Result[0].regNo,
                //     company: res.data.Result[0].company,
                //     from: res.data.Result[0].from,
                //     to: res.data.Result[0].to,
                //     stipend: res.data.Result[0].stipend,
                //     loi: null,
                // })
                const formattedResult = res.data.Result.map(entry => ({
                    ...entry,
                    from: formatDate(entry.from),
                    to: formatDate(entry.to)
                }));

                setDate({
                    ...data,
                    regNo: formattedResult[0].regNo,
                    company: formattedResult[0].company,
                    from: formattedResult[0].from,
                    to: formattedResult[0].to,
                    stipend: formattedResult[0].stipend,
                    loi: null
                });
            })
            .catch(err => console.log(err))
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/singleInternUpdate/' + id + '/' + company, data)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate('/placement')
                    alert("Successfully Updated")
                }

            })
            .catch(err => console.log(err))
    }

    const formatDate = dateString => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
    };

    return (
        <div className='d-flex flex-column align-items-center pt-3'>
            <h2>Update Internship Details</h2>
            <form className='row g-3 w-50' onSubmit={handleSubmit}>
                <div className='col-12'>
                    <label for='inputRegister' className='form-label'>Register No</label>
                    <input type="text" className='form-control' placeholder='Enter Register No.' id="inputName" autoComplete='off'
                        onChange={e => setDate({ ...data, regNo: e.target.value })} value={data.regNo} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputCompany' className='form-label'>Company</label>
                    <input type="text" className='form-control' placeholder='Enter Company' id="inputCompany" autoComplete='off'
                        onChange={e => setDate({ ...data, company: e.target.value })} value={data.company} disabled />
                </div>
                <div className='col-12'>
                    <label for='inputFrom' className='form-label'>From</label>
                    <input type="date"
                        className='form-control'
                        placeholder='Enter From'
                        id="inputFrom"
                        autoComplete='off'
                        onChange={e => setDate({ ...data, from: e.target.value })}
                        value={data.from ? formatDate(data.from) : ''} />
                </div>
                <div className='col-12'>
                    <label for='inputTo' className='form-label'>To</label>
                    <input type="date"
                        className='form-control'
                        placeholder='Enter To'
                        id="inputTo"
                        autoComplete='off'
                        onChange={e => setDate({ ...data, to: e.target.value })}
                        value={data.to ? formatDate(data.to) : ''} />
                </div>

                <div className='col-12'>
                    <label for='stipend' className='form-label'>tipendy</label>
                    <input type="number" className='form-control' placeholder='Enter Stipend' id="stipend" autoComplete='off'
                        onChange={e => setDate({ ...data, stipend: e.target.value })} value={data.stipend} />
                </div>
                <div className='col-12'>
                    <label for='inputLOI' className='form-label'>Letter of Intent</label>
                    <input type="file" className='form-control' placeholder='Letter of Intent' id="inputLOI" autoComplete='off'
                        onChange={e => setDate({ ...data, loi: e.target.files[0] })} value={data.loi} />
                </div>
                <div className='col-12'>
                    <button type='submit' className='btn btn-primary'>Update</button>
                </div>
                {/* <div>
                    <Link to={`/placementEdit/${id}`} className='btn btn-primary'>Placement</Link>
                </div> */}
            </form>
        </div>
    )
}

export default SingleInternEdit