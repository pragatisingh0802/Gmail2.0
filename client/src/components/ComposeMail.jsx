import { useState } from 'react'
import { Box, Button, Dialog, InputBase, TextField, Typography,styled } from '@mui/material'
import { Close, DeleteOutline } from '@mui/icons-material'
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urlS';

const dialogStyle = {
    height:'80%',
    width :'70%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    borderRadius:'10px 10px 0 0'
}
const HeaderStyle =styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    background: '#f2f6fc',
    '&>p':{
        fontSize:14,
        fontWeight:500
    }
})

const RecipientWrapper =styled(Box)({
    display:'flex',
    flexDirection:'column',
    padding:'0 15px',
    '&>div':{
        fontSize:14,
        borderBottom:'1px solid #f5f5f5',
        marginTop:10
    }
})

const Footer= styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
})

const SendButton= styled(Button)({
    background:'#0b57d0',
    color:'#fff',
    width:100,
    fontWeight:500,
    textTransform:'none',
    borderRadius:18
})
const ComposeMail = ({openDialog, setOpenDialog}) => {
    const [data, setData] = useState({});
    const sentEmailServices = useApi(API_URLS.saveSentEmail);
    const saveDraftServices = useApi(API_URLS.saveDraftEmails);

    //this code snippet is from smtpjs to send mails. 
        //we hace created a disposable email using YOPMAIL to create the below credentials 
    const config={
        Host : "smtp.elasticemail.com",
        Username : "gmailclonesmtp@yopmail.com",
        Password : "8E7091B86F46B80DED309789D5B04DBB6913",
        Port:2525,
    }

    const closeComposeMail=(e)=>{
        e.preventDefault();

        const payload={
            to: data.to,
            from: 'pragatisingh0802@gmail.com',
            subject: data.subject,
            body:data.body,
            date: new Date(),
            image: '',
            name:'PRAGATI SINGH GMAIL',
            starred: false,
            type:'drafts'
        }

        saveDraftServices.call(payload);

        if(!saveDraftServices.error){
            setOpenDialog(false);
            setData({});
        }
        else{//if errror

        }
    }

    const sendMail= async(e)=>{
        e.preventDefault();

        if(window.Email){
            window.Email.send({
                ...config,
                To : data.to,
                From : "pragatisingh0802@gmail.com",
                Subject : data.subject,
                Body : data.body
            }).then(
              message => alert(message)
            );
        }
        const payload={
            to: data.to,
            from: 'pragatisingh0802@gmail.com',
            subject: data.subject,
            body:data.body,
            date: new Date(),
            image: '',
            name:'PRAGATI SINGH GMAIL',
            starred: false,
            type:'sent'
        }

        sentEmailServices.call(payload);

        if(!sentEmailServices.error){
            setOpenDialog(false);
            setData({});
        }
        else{//if errror

        }
        // setOpenDialog(false);
    }

    const onValueChange=(e)=>{
        setData({...data, [e.target.name]: e.target.value});
    }

  return (
    <Dialog
        open={openDialog}
        PaperProps={{sx:dialogStyle}}
    > 
        <HeaderStyle>
            <Typography>New Message</Typography>
            <Close fontSize='small' onClick={(e)=>closeComposeMail(e)}/>
        </HeaderStyle>

        <RecipientWrapper>
            <InputBase placeholder='Recipients' name='to' onChange={(e) => onValueChange(e) } value={data.to}/>
            <InputBase placeholder='Subject' name='subject' onChange={(e) => onValueChange(e)} value={data.subject}/>
        </RecipientWrapper>
        <TextField
            multiline
            rows={20}
            sx={{'& .MuiOutlinedInput-notchedOutline':{border:'none'}}}
            name='body'
            onChange={(e) => onValueChange(e)}
            value={data.body}
        />
        <Footer>
            <SendButton onClick={(e)=>sendMail(e)}>Send</SendButton>
            <DeleteOutline onClick={()=> setOpenDialog(false)}/>
        </Footer>
    </Dialog>
  )
}

export default ComposeMail