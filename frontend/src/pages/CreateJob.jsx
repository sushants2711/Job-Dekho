import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { handleError } from '../toastMessage/error.message';
import { addJobApi } from '../API/addJobApi';
import { handleSuccess } from '../toastMessage/success.message';
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export const CreateJob = () => {

    const navigate = useNavigate();

    const [jobData, setJobData] = useState({
        title: "",
        companyName: "",
        salary: "",
        description: "",
        location: "",
        jobType: "",
        qualification: []
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "qualification") {
            const qualificationsArray = value
                .split(",")
            setJobData({
                ...jobData,
                qualification: qualificationsArray
            });
        } else {
            setJobData({
                ...jobData,
                [name]: value
            });
        };
    };

    const handleFormSubmission = async (e) => {
        try {
            e.preventDefault();

            const { title, companyName, salary, description, location, jobType, qualification } = jobData;

            if (!title) return handleError("Job Title is Required");
            if (!companyName) return handleError("Company Name is Required");
            if (!salary) return handleError("Salary is Required");
            if (!description) return handleError("Description is required");
            if (!location) return handleError("Location is Required");
            if (!jobType) return handleError("Job Type is Required");
            if (!qualification || qualification.length === 0) return handleError("At least one Qualification is required");

            if (title.length < 5) return handleError("Job Title must be at least 5 characters");
            if (description.length < 15) return handleError("Description must be at least 15 characters");
            if (salary <= 0) return handleError("Salary must be greater than 0");
            if (companyName.length < 3) return handleError("Company Name must be at least 3 characters");
            if (location.length < 5) return handleError("Location must be at least 5 characters");

            const result = await addJobApi(jobData);
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setJobData({
                    title: "",
                    companyName: "",
                    salary: "",
                    description: "",
                    location: "",
                    jobType: "",
                    qualification: []
                });

                setTimeout(() => navigate("/"), 3000);
            }
            else if (!success) {
                handleError(message);
            }
            else {
                handleError(error);
            };
        } catch (error) {
            handleError(error.message);
        };
    };

    return (
        <>
            <Helmet>
                <title>Post a Job</title>
                <meta
                    name="description"
                    content="Post a new job listing easily on Job Dekho. Connect with potential candidates and grow your team efficiently."
                />
                <meta
                    name="keywords"
                    content="Job, Job Dekho, Post Job, Hiring, Recruitment, Job List, Employment"
                />
            </Helmet>

            <main className='container my-3'>
                <h2 className='mb-4'>Post a Job</h2>

                <form onSubmit={handleFormSubmission}>
                    <div className='mb-3'>
                        <label htmlFor="title" className='form-label'>Job Title:</label>
                        <input type="text" name='title' id="title" className='form-control' onChange={handleChange} value={jobData.title} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="companyName" className='form-label'>Company Name:</label>
                        <input type="text" name="companyName" id="companyName" className='form-control' onChange={handleChange} value={jobData.companyName} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="location" className='form-label'>Location:</label>
                        <input type="text" name="location" id="location" className='form-control' onChange={handleChange} value={jobData.location} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="salary" className='form-label'>Salary:</label>
                        <input type="number" name="salary" id="salary" className='form-control' onChange={handleChange} value={jobData.salary} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="jobType" className='form-label'>Job Type:</label>
                        <select name="jobType" id="jobType" className='form-select' onChange={handleChange} value={jobData.jobType}>
                            <option value="">Select job type</option>
                            <option value="Full-time (On-site)">Full-time (On-site)</option>
                            <option value="Part-time (On-site)">Part-time (On-site)</option>
                            <option value="Full-time (Remote)">Full-time (Remote)</option>
                            <option value="Part-time (Remote)">Part-time (Remote)</option>
                        </select>
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="description" className='form-label'>Job Description:</label>
                        <textarea name="description" id="description" className='form-control' rows="2" onChange={handleChange} value={jobData.description}></textarea>
                    </div>


                    <div className='mb-3'>
                        <label htmlFor="qualification" className='form-label'>Job Qualifications:</label>
                        <input type="text" name="qualification" id="qualification" className='form-control' onChange={handleChange} value={jobData?.qualification?.join(",")} />
                    </div>

                    <button type="submit" className='btn btn-primary'>Post Job</button>
                </form>
                <ToastContainer />
            </main>
        </>
    );
};
