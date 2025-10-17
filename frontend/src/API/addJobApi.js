export const addJobApi = async (data) => {
    try {
        const url = "http://localhost:2300/api/v1/job/add";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(data)
        });
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error(error.message);
    };
};