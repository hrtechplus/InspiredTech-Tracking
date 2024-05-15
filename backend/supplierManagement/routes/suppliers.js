const router= require( 'express').Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
let supplier=require('../models/supplier')

router.route('/add').post((req, res)=>{

    const name =req.body.name; 
    const nic =req.body.nic;
    const address = req.body.address;
    const mobile = Number(req.body.mobile);
    const email= req.body.email;
    const wname = req.body.wname;

    const newSupplier=new supplier({

        name,
        nic,
        address,
        mobile,
        email,
        wname
    })
  
    newSupplier.save()
     .then(()=>{
         res.json("Supplier added")
     }).catch((err)=> {res.status(400).send("unable to add Supplier")})
})

router.route("/").get((req, res) => {

   supplier.find().then((suppliers)=>{
    res.json(suppliers)

   }).catch((err)=>{
       console.log(err)
   })
})



router.route("/update/:nic").put(async(req,res)=>{

    let userNic=req.params.nic;
    const{name,nic,address,mobile,email,wname}=req.body;

    const updateSupplier={
        name,
        nic,
        address,
        mobile,
        email,
        wname
    }
    const update=await supplier.findOneAndUpdate({ nic: userNic }, updateSupplier, { new: true });
    if(!update){
        return res.status(404).send('No User found')
    }else{

        return res.status(200).send({status:"user updated"});
    }
})


router.route("/delete/:nic").delete(async (req, res) => {
    try {
        const userNic = req.params.nic;
        
        const deletedSupplier = await supplier.findOneAndDelete({ nic: userNic });

        if (deletedSupplier) {
            res.status(200).send({ status: 'Deleted' });
            
        } else {
            res.status(404).send({ status: "Supplier not found" });
        }
    } catch (err) {
        res.status(500).send({ status: "Error in deleting" });
        console.log(err);
    }
});




router.route("/get/:nic").get(async(req,res)=>{
    let userId = req.params.nic; 
    try {
        const founduser = await supplier.findOne({ nic: userId });

        if (!founduser) {
            return res.status(404).send({ status: 'user not found' });
        }

        return res.status(200).send({ status: 'user fetched', order: founduser });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "Error in fetch", error: error.message });
    }
});



const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  
  router.route("/Sendmail").post(async(req, res) => {
    const { name, email, message } = req.body;
  
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email, 
      subject: 'New message from your website contact form',
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent successfully:', info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  });
module.exports=router;
