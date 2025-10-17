import React, { createContext, useContext, useState } from 'react'
import { handleError } from '../toastMessage/error.message';
import { allJobApi } from '../API/allJobApi';
import { handleSuccess } from '../toastMessage/success.message';

export const JobContext = createContext();

export const AllJobContext = () => useContext(JobContext);

export const JobContextProvider = ({ children }) => {

    const [jobData, setJobData] = useState([]);

    const fetchAllJob = async () => {
        try {
            const result = await allJobApi();
            const { success, message, error, data } = result;

            if (success) {
                // handleSuccess(message);
                setJobData(data)
            } else if (!success) {
                // handleError(message);
                setJobData([]);
            } else {
                // handleError(error);
                setJobData([]);
            };
        }
        catch (error) {
            handleError(error.message);
        };
    };

    return <JobContext.Provider value={{ fetchAllJob, jobData, setJobData }}>
        {children}
    </JobContext.Provider>
}