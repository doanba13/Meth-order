import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback( async (hookConfig, dataProcess) => {
        setIsLoading(true);

        try {
            const response = await fetch(
                hookConfig.url,
                {
                    method: hookConfig.method ? hookConfig.method : 'GET',
                    headers: hookConfig.headers ? hookConfig.headers : {},
                    body: hookConfig.body? JSON.stringify(hookConfig.body) : null
                }
            );
            if (!response.ok){
                throw new Error("Error to fetch data!");
            }

            const data = await response.json();
            dataProcess(data);

        } catch (errr){
            setError(errr.message);
        }
        setIsLoading(false);
    }, []);
    return{
        isLoading,
        error,
        sendRequest
    }
};

export default useHttp;