import { Outlet } from "react-router-dom"
import HomeHeader from "../../../component/home/header/home-header.component"
import {useDispatch} from "react-redux";
import {useEffect} from 'react'
import {setLoggedInUser} from "../../../reducers/user.reducers"
import authSvc from "../../../pages/home/auth/auth.service"

const HomeLayout = () => {
    const dispatch = useDispatch()
    
    const getLoggedInuser = async() => {
        try {
            const response = await authSvc.getLoggedInUser()
            if(response.result) {
                dispatch(
                    setLoggedInUser(response.result)
                )
            }
        } catch(exception) {

        }
    }
    useEffect(() => {
        let token = localStorage.getItem("_au")
        if(token) {
            getLoggedInuser()
        }
    }, [])
    return (<>
        <HomeHeader />
        <Outlet />
    
    </>)
}
export default HomeLayout;