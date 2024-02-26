import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"



export const useGetApis = (api, payload) => {
    const [returnData, setReturnData] = useState()
    const dispatch = useDispatch()
    const getData = async () => {
        const response = await dispatch(api(payload))
        console.log('response', response)
        setReturnData(response)
    }
    useEffect(() => {
        getData()
    }, [ payload, api])
    return returnData
}