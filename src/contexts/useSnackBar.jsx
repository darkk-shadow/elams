import { useSnackbar } from 'notistack';
import React from 'react'

const useSnackBar = () => {

  const {enqueueSnackbar} = useSnackbar();

  const showSnackBar  = (msg, varient="success") => {
    enqueueSnackbar(msg,{anchorOrigin: {horizontal: "right", vertical:"bottom"}, variant:varient})
  }

  return showSnackBar ;
}

export default useSnackBar