import React, {useState} from 'react';
import s from './Auth.module.css'
import Input from "../common/input/Input";
import logo from '../../assets/img/logo.png'
import Button from "../common/button/Button";
import CheckBox from "../common/checkbox/CheckBox";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import {Link, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../../scripts/api/auth-api";
import {setLocalStorage} from "../../scripts/common/helpers/localStorage";
import ProgressBar from "../common/progress-bar/ProgressBar";

const schema = yup.object().shape({
    email: yup.string().email('Please enter the correct email and try again.').required('Email is required.'),
    password: yup
        .string()
        .min(8, 'The password must contain 8 to 40 characters! Please try again.')
        .max(40, 'The password must contain 8 to 40 characters! Please try again.')
        .required('Password is required.'),
});
const Login = () => {

    const [login,{ isLoading }] = useLoginMutation();

    const navigate = useNavigate();
    const [isError,setIsError]=useState()
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })


    const onSubmit = async (data) => {

        if(data){
            const res =await login({
                email: data.email,
                password: data.password,
            })
            if (res.error){
                setIsError(res.error.message)
                return
            }

            if (keepLoggedIn) {
                setLocalStorage('access-token', res.data.access_token);
            }
            console.log('login')

            navigate('/chat');
        }

    }
    const changePage=()=>{
        navigate('/');
    }

    return (
        <div className={s.container}>
            <div className={s.btn_back} onClick={()=>changePage()} >Back</div>
            <div className={s.content}>

                <img className={s.logo} src={logo}/>
                <h1 className={s.logo_text} style={{ marginBottom: '10px'}}>AIO</h1>
                <h3 className={s.bold_text} style={{ marginBottom: '20px'}}>Welcome back!</h3>
                <form onSubmit={handleSubmit(onSubmit)} className={s.content}>

                    <Input placeholder="Enter with your email"
                           text="Email"
                           error={errors.email?.message}
                           register={() => register('email')}
                    />
                    <Input placeholder="Type your password here"
                           text="Password"
                           error={errors.password?.message}
                           register={() => register('password')}
                    />

                    <CheckBox checked={keepLoggedIn}
                              onChange={() => setKeepLoggedIn(!keepLoggedIn)}>
                    <span style={{color: 'rgba(255, 255, 255, 0.75)',fontWeight: 300}}>
                          Keep me logged in
                    </span>

                    </CheckBox>
                    <span className={s.error}>{isError}</span>

                    <Button text={(errors.email && errors.email.message) || (errors.password && errors.password.message)
                        ? 'Try again'
                        : 'Login'}
                            error={(errors.email && errors.email.message) || (errors.password && errors.password.message)}
                            type="submit"
                            onClick={onSubmit}
                           />
                </form>

                <p style={{color:'rgba(255, 255, 255, 0.75',fontWeight: 700}}> Don’t have an account?
                    <Link to="/registration" style={{color:"#643CF0"}}>  Sign up</Link>
                </p>
                <Link to="/recovery" style={{color:"#643CF0",fontWeight: 700}}> Forgot Password?</Link>

            </div>
            {isLoading&& <ProgressBar/>}


        </div>
    );
};

export default Login;
