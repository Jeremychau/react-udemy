// import { useState, useCallback, useRef, useEffect } from "react";
import { useState, useCallback } from "react";
import api from "../../apiConfig";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // const activeHttpRequests = useRef([]);

    const sendReq = useCallback( async (url, method = 'get', body = null) => {
        setIsLoading(true)
        // const httpAbortCtrll = new AbortController();
        // activeHttpRequests.current.push(httpAbortCtrll)
        try {
            let result = await api[method](url, body);
            if(!result) throw new Error(result.message)
            setIsLoading(false)
            return result.data
        } catch (err) {
            setError(err.message || 'Something Error');
            setIsLoading(false)
            throw err
        }
    }, []);

    const clearError = () => {
        setError(null)
    }

    // useEffect(() => {
    //     return () => {
    //         activeHttpRequests.current.map(abortCtrl => {abortCtrl.abort()} )
    //     };
    // }, [])

    return { isLoading, error, setError, sendReq, clearError }
}