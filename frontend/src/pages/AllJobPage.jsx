import React, { useEffect, useState } from 'react'
import { AllJobContext } from '../context/JobContext';
import { handleError } from '../toastMessage/error.message';
import { allJobApi } from '../API/allJobApi';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { deleteJobAPi } from '../API/deleteJobApi';
import { handleSuccess } from '../toastMessage/success.message';
import { Helmet } from "react-helmet";

export const AllJobPage = () => {

    const navigate = useNavigate();

    const { jobData, setJobData, fetchAllJob } = AllJobContext();

    const [title, setTitle] = useState(""); // to get the search bar data

    const handleSearch = (e) => {
        setTitle(e.target.value)
    }

    const fetchAlways = async () => {

        if (title.length > 0) {

            try {
                const result = await allJobApi(title);
                const { success, message, error, data } = result;

                if (success) {
                    setJobData(data);
                } else if (!success) {
                    setJobData([])
                } else {
                    setJobData([])
                }
            } catch (error) {
                handleError(error.message);
            };
        } else {
            fetchAllJob()
        }
    };

    const handleDeleteJob = async (id) => {
        try {
            const result = await deleteJobAPi(id);
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message)
                fetchAlways();
            } else if (!success) {
                handleError(message);
            } else {
                handleError(error);
            };
        } catch (error) {
            handleError(error.message)
        };
    };

    const handleDetails = (id) => {
        if (id) {
            const encoded = btoa(id);
            navigate(`/details/${encoded}`)
        };
    };

    useEffect(() => {
        fetchAlways();
    }, [title]);

    return (
        <>
            <Helmet>
                <title>Job Listing Page</title>
                <meta name='description' content='Get all the latest job that are available in market, just simply find it on Job Dekho...' />
                <meta name='keywords' content='Job, Job Dekho, All Job, Job List' />
            </Helmet>

            <main className='container mt-3'>
                {
                    jobData.length > 0 ? (

                        <div className="row g-4">
                            <div className='mb-3 col-12 col-md-6'>
                                <input type="search" name="title" onChange={handleSearch} value={title} className='form-control rounded-3 bg-white ps-3 py-2' placeholder='Search by job title...' />
                            </div>

                            <h2 className='mb-1'>All Jobs</h2>
                            {
                                jobData.map((curr) => (
                                    <div className="col-12 col-md-6 col-lg-4" key={curr._id}>
                                        <div className="card p-4 shadow-sm">
                                            <h5 className='card-title fw-semibold'>{curr.title}</h5>
                                            <p className='card-text'><b>Company Name: </b>{curr.companyName}</p>
                                            <p className='card-text'><b>Location: </b>{curr.location}</p>
                                            <p className='card-text'><b>Job Type: </b>{curr.jobType}</p>

                                            <div className="d-flex flex-column flex-md-row mt-2 gap-2 pe-md-5">
                                                <button className="btn btn-primary flex-grow-1" onClick={() => handleDetails(curr._id)}>See Details</button>
                                                <button className="btn btn-danger flex-grow-1" onClick={() => handleDeleteJob(curr._id)}>Delete</button>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    ) : (
                        <>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                                <h4>No data found</h4>
                            </div>

                        </>
                    )
                }
                <ToastContainer />
            </main>

        </>
    )
}
