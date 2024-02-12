import React from 'react';
import s from './Auth.module.css'
import Input from "../common/input/Input";
import logo from '../../assets/img/logo.png'
import Button from "../common/button/Button";
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import {useSendCodeMutation} from "../../scripts/api/auth-api";
import {useSelector} from "react-redux";
import {selectEmailVerify} from "../../scripts/store/slices/app/selectors";
import ProgressBar from "../common/progress-bar/ProgressBar";

const schema = yup.object().shape({
    verify: yup
        .string()
        .min(6, 'The code you entered is incorrect! Please try again or ask for a new verification code.')
        .max(50, 'The code you entered is incorrect! Please try again or ask for a new verification code.')
        .required('Required'),
});

const VerifyAccount = () => {

    const [sendCode,{isLoading}] = useSendCodeMutation();
    const email=useSelector(selectEmailVerify)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })
    const onSubmit = async (data) => {
        if(data){
            console.log(data)
            const res=await  sendCode({
                email:email,
                pin_code:data.verify
            })

        }
    }

    return (
        <div className={s.container}>
            <div className={s.content}>

                <img className={s.logo} src={logo}/>
                <h1 className={s.logo_text}>AIO</h1>
                <div style={{marginBottom:'50px'}}>
                    <h3 className={s.bold_text}>Verify account</h3>
                    <p style={{color:'rgba(255, 255, 255, 0.75',fontWeight: 700}}>

                        You should have received an email with a verification code to complete your sign up process.
                        Please check your inbox and spam folder and enter the code below.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={s.content} >

                    <Input placeholder="Enter the verification code here"
                           text="Verification Code"
                           error={errors.verify?.message}
                           register={() => register('verify')}
                    />
                    {
                        (errors.verify && errors.verify.message) && (
                            <Button
                                text="Resend"
                                error={(errors.verify && errors.verify.message)}
                                type="submit"
                                style={{width:'200px'}}
                                onClick={onSubmit}
                            />
                        )
                    }

                    <Button text="Verify and continue"
                            type="submit"
                            onClick={onSubmit}
                    />
                </form>


            </div>

            {isLoading&& <ProgressBar/>}

        </div>
    );
};

export default VerifyAccount;
