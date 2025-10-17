export const allJobApi = async (data) => {
    try {
        // const url = data
        //     ? `http://localhost:2300/api/v1/job/all?title=${data}`
        //     : "http://localhost:2300/api/v1/job/all";

        const url = data
            ? `https://job-dekho-hcql.onrender.com/api/v1/job/all?title=${data}`
            : "https://job-dekho-hcql.onrender.com/api/v1/job/all";

        const response = await fetch(url, {
            method: "GET",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};