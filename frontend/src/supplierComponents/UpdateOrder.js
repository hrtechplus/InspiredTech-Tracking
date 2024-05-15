import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateOrder() {
    const { oid } = useParams(); 
    const [values, setValues] = useState({
        oid: oid || "",
        supplier: "",
        date: "",
        bname: "",
        quantity: ""
    });

    const [errors, setErrors] = useState({}); // State to hold validation errors

    useEffect(() => {
        axios.get(`http://localhost:5000/order/get/${oid}`)
            .then((res) => {
                console.log("Response data:", res.data);

                setValues({
                    ...values,
                    oid: res.data.order.oid,
                    supplier: res.data.order.supplier,
                    date: res.data.order.date,
                    bname: res.data.order.bname,
                    quantity: res.data.order.quantity  
                });
                console.log("Updated values:", values);
            })
            .catch((err) => {
                console.error("Error fetching supplier:", err);
                setValues({ ...values, oid: "Error fetching NIC" });
            });
    },[oid]);

    const navigate= useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form fields
        const validationErrors = {};
        if (!values.supplier.trim()) {
            validationErrors.supplier = "Supplier is required";
        }
        if (!values.bname.trim()) {
            validationErrors.bname = "Brand Name is required";
        }
        if (!values.quantity.toString().trim()) {
            validationErrors.quantity = "Quantity is required";
        } else if (parseInt(values.quantity) < 0) {
            validationErrors.quantity = "Quantity cannot be negative";
        }
        
    
        if (Object.keys(validationErrors).length === 0) {
            // If no errors, submit the form
            axios.put(`http://localhost:5000/order/update/${oid}`, values)
                .then((res) => {
                    console.log("order updated successfully:", res.data);
                    navigate('/allOrders');
                })
                .catch((err) => {
                    console.error("Error updating order:", err);
                });
        } else {
            // If there are errors, set the errors state
            setErrors(validationErrors);
        }
    }
    

    return (
        <div style={{background:'radial-gradient(circle, rgba(234,234,234,1) 56%, rgba(125,232,133,1) 100%)'}}>
        <div style={{marginLeft:'100px' ,display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}} className="container">
            <div style={{ marginTop:"-30px",backgroundColor:'#ededed',width: '500px' ,border:'2px solid rgba(0, 0, 0, 0.2)',padding: '50px 50px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',borderRadius:'10px' }}>
            <h1 style={{fontFamily:'serif',fontWeight:'bold',textAlign:'center',marginBottom:"30px"}}>Update Order Details</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Order ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="oid"
                        name="oid"
                        value={values.oid}
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nic">Supplier</label>
                    <input
                        type="text"
                        className="form-control"
                        id="supplier"
                        name="supplier"
                        value={values.supplier}
                        onChange={(e) => setValues({ ...values, supplier: e.target.value })}
                    />
                    {errors.supplier && <div className="text-danger">{errors.supplier}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Date</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        value={values.date}
                        readOnly
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="wname">Brand Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bname"
                        value={values.bname}
                        onChange={(e) => setValues({ ...values, bname: e.target.value })} />
                    {errors.bname && <div className="text-danger">{errors.bname}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="quantity"
                        value={values.quantity}
                        onChange={(e) => setValues({ ...values, quantity: e.target.value })}
                    />
                    {errors.quantity && <div className="text-danger">{errors.quantity}</div>}
                </div>
                <button style={{backgroundColor:'green',width:'100%'}} type="submit" className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
        </div>
    );
}

export default UpdateOrder;
