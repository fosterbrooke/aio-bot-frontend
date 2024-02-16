import {useDispatch, useSelector} from "react-redux";
import {useMeQuery} from "../../../scripts/api/auth-api";
import {useRoutes} from "react-router-dom";


export const AuthRedirectLayout = ({ children }) => {
    const dispatch =useDispatch()
    const { isLoading, isSuccess, isError, data } = useMeQuery();

    if (isLoading) {
        return (
           <div>
               loading
           </div>
        );
    }

    return (
       <div style={{width:"100%"}}>
           {children}
       </div>
    );
};
