import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Read = () => {
    const { id } = useParams();
    useEffect(() => {
        // const fetchData = async () => {

        // }
        axios.get(`http://localhost:8000/api/students/placement/get/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))

    }, [id])
    //         try {
    //             const res = await axios.get(`http://localhost:8000/api/students/read/${id}`)
    //             getStudent(res.data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     fetchData();
    // }, [id]);
    return (
        <div>Read</div>
    )
}

export default Read