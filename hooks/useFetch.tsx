import {useEffect, useState} from "react";

const useFetch = (url: string) => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState([])

    const GetData = async (link: string) => {
        // const {data} = await axios.get(link)
        // data && setData(data)
        // console.log({data})
        // return data
    }

    useEffect(() => {
        GetData(url)
    }, []);
    
    return {
        data,
        isLoading,
        errors
    }
}

export default useFetch