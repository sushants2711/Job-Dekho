import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { handleError } from '../toastMessage/error.message';
import { getByIdJobApi } from '../API/getByIdJobApi';
import { handleSuccess } from '../toastMessage/success.message';
import { Helmet } from 'react-helmet';

export const JobDetailsPage = () => {

    const { id } = useParams();

    const [displayData, setDisplayData] = useState({});

    let decoded = "";
    if (id) {
        decoded = atob(id);
    };

    const fetchJobDetails = async () => {
        try {
            const result = await getByIdJobApi(decoded);
            const { success, message, error, data } = result;

            if (success) {
                handleSuccess(message);
                setDisplayData(data)
            } else if (!success) {
                handleError(message);
                setDisplayData({})
            } else {
                handleError(error);
                setDisplayData({});
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    useEffect(() => {
        fetchJobDetails();
    }, [id])


    return (
        <>
            <Helmet>
                <title>{`${displayData.title} at ${displayData.companyName}`}</title>
                <meta
                    name="description"
                    content={`Apply for ${displayData.title} at ${displayData.companyName} located in ${displayData.location}. ${displayData.description?.slice(0, 30)}...`}
                />
                <meta
                    name="keywords"
                    content={`${displayData.title}, ${displayData.companyName}, ${displayData.location}, Job Dekho, Hiring, Recruitment`}
                />
            </Helmet>

            <main className='container mt-3'>
                <h2>{displayData.title}</h2>

                <div className="card mt-3">
                    <div className="card-body">
                        <p className="card-text"><b>Company Name: </b>{displayData.companyName}</p>
                        <p className='card-text'><b>Location: </b>{displayData.location}</p>
                        <p className='card-text'><b>Salary: </b>{displayData.salary}</p>
                        <p className='card-text'><b>Job Type: </b>{displayData.jobType}</p>
                        <p className='card-text'><b>Description: </b>{displayData.description}</p>
                        <p className='card-text'><b>Qualifications: </b></p>
                        <ol>
                            {displayData?.qualification?.map((curr, index) => (
                                <li key={index}>{curr}</li>
                            ))}
                        </ol>

                    </div>
                </div>
            </main>
        </>
    )
}
