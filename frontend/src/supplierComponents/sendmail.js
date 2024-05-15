import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function Sendmail() {

    const { nic } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        nic: nic || "",
        email: '',
        message: ''
      });
    
      useEffect(() => {
        axios.get(`http://localhost:5000/supplier/get/${nic}`)
            .then((res) => {
                console.log("Response data:", res.data);

                setFormData({
                    ...formData,
                    name: res.data.order.name,
                    email: res.data.order.email,
                });
                console.log("Updated values:", formData);
            })
            .catch((err) => {
                console.error("Error fetching supplier:", err);
                setFormData({ ...formData, nic: "Error fetching NIC" });
            });
    },[nic]);

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:5000/supplier/Sendmail', formData);
          alert("Email sent successfully!")
          console.log('Email sent successfully!');
         
        } catch (error) {
            console.log(formData);
            alert(error)
          console.error('Error sending email:', error);
        }
      };



    return(


        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',background:'radial-gradient(circle, rgba(234,234,234,1) 28%, rgba(94,137,255,1) 100%)'}}>
           <div style={{ width: '600px' ,border:'2px solid rgba(0, 0, 0, 0.2)',padding: '60px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px',background:'white' }}>
            <form  style={{ maxWidth: '400px', margin: '0 auto' }} onSubmit={handleSubmit}>
            <h1 style={{fontSize:'28px',fontFamily:'Times New Roman',fontWeight:'bold',marginBottom:'20px'}}>Send Mail</h1>

                <label  style={{ display: 'block', marginBottom: '10px' }} htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} required />

                <label htmlFor="email" style={{ display: 'block', marginBottom: '10px' }}>Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

                <label htmlFor="message" style={{ display: 'block', marginBottom: '10px' }}>Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />

                <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send</button>
                </form>
                </div>   
        </div>
    );
}
export default Sendmail;