import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Swal from 'sweetalert2'
import { withdrawHospitalWallet } from '../../../api/hospitalApi'
import '../../../assets/css/modalForm.css'

export default function WithdrawModal({ setShowModal, setRefresh, refresh }) {
    const [accountNo, setAccountNo] = useState("")
    const [ifsc, setIfsc] = useState("")
    const [branch, setBranch] = useState("")
    const [accountHolder, setAccountHolder] = useState("")
    const [errMessage, setErrMessage] = useState("")


    const [loading, setLoading] = useState({
        submit: false
    })


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading({ ...loading, submit: true })
        if (validForm()) {
            const data = await withdrawHospitalWallet(accountHolder, accountNo, branch, ifsc)
            if (data.err) {
                setErrMessage(data.message)
            } else {
                setRefresh(!refresh)
                Swal.fire(
                    'Success!',
                    'Your Money will be withdrawn in 3 days',
                    'success'
                )
                setShowModal(false)
            }
            setLoading({ ...loading, submit: false })
        }

    }
    function validForm() {
        if (branch.trim() === "" || accountHolder.trim()==="" || ifsc.trim().length!==11) {
            return false
        }
        if(accountNo.toString().length <12 || accountNo.toString.length>17){
            return false
        }
        return true
    }


    return (
        <div className="modal-form">
            <form className="modal-container" onSubmit={handleSubmit}>
                <div className="modal-form-row head">
                    <h5>Withdraw Wallet</h5>
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} label="Account Holder Name" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} label="Account No" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={ifsc} onChange={(e) => setIfsc(e.target.value)} label="IFSC Code" type="text" variant="outlined" fullWidth className='input' />
                </div>
                <div className="modal-form-row">
                    <TextField id="outlined-basic" value={branch} onChange={(e) => setBranch(e.target.value)} label="Branch" type="text" variant="outlined" fullWidth className='input' />
                </div>
                {errMessage &&
                    <div className="modal-form-row">
                        <b>{errMessage}</b>
                    </div>
                }
                <div className="modal-form-row">
                    <button type='button' onClick={() => setShowModal(false)} className='btn btn-outline-dark w-50'>close</button>
                    <button type='submmit' disabled={!validForm()} className='btn btn-dark w-50'>
                        Submit
                        <ClipLoader size={20} color="white" loading={loading.submit} />

                    </button>
                </div>

            </form>
        </div>
    )
}
