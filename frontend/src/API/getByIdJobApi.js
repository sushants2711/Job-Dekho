export const getByIdJobApi = async (id) => {
    try {
        // const url = `http://localhost:2300/api/v1/job/details/${id}`;
        const url = `https://job-dekho-hcql.onrender.com/api/v1/job/details/${id}`;
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