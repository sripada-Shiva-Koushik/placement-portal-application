import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [students, setStudents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/students")
                setStudents(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);
    return (
        <div className='home'>

        </div>
    )
}

export default Home