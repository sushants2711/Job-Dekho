export const deleteJobAPi = async (id) => {
    try {
        // const url = `http://localhost:2300/api/v1/job/delete/${id}`;
        const url = `https://job-dekho-hcql.onrender.com/api/v1/job/delete/${id}`;
        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include"
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};