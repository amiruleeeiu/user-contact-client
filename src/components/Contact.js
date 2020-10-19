import React, { useEffect, useState } from 'react';
import SingleContact from './SingleContact';

const Contact = () => {

    const[updateContact,setUpdateContact]=useState([])
    const [contacts,setContacts]=useState([])
    const [newContact,setNewContact]=useState([])
    console.log(newContact);
    useEffect(() => {
        fetch('http://localhost:4040/contacts')
            .then(res => res.json())
            .then(data => setContacts(data));
    }, []);

    

    const handleChange=(e)=>{
        const newUser={...newContact}
        newUser[e.target.name]=e.target.value;
        setNewContact(newUser);
    }

    const handleSendData=()=>{
        fetch('http://localhost:4040/contacts', {
        method: 'POST',
        body: JSON.stringify(newContact),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(window.location.pathname='/')
    }

    const handleUpdate=(contact)=>{
        contact.isUpdate=true;
        setUpdateContact(contact)
        setNewContact(contact)
    }
    const handleUpdateContact=(id,contact)=>{
        console.log("put request",id,contact);
        fetch(`http://localhost:4040/contacts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({id,contact}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(window.location.pathname=('/'))
    }

    return (
        <div className="container">
            <div className="my-4">
                <h4>Contact Info</h4>
                <form>
                    <div className="form-group mr-3">
                        <input type="text" name="name" onBlur={handleChange}  placeholder="Name" className="form-control" defaultValue={updateContact.name}/>
                    </div>
                    <div className="form-group mr-3">
                        <input type="email" name="email" onBlur={handleChange} placeholder="Email" className="form-control" defaultValue={updateContact.email}/>
                    </div>
                    <div className="form-group mr-3">
                        <input type="text" name="phone" onBlur={handleChange} placeholder="Phone" className="form-control" defaultValue={updateContact.phone}/>
                    </div>
                    <div className="form-group mr-3">
                        <input type="hidden" name="id"/>
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" name="description" onBlur={handleChange} rows="5" placeholder="Description........"></textarea>
                    </div>
                    
                    {
                        updateContact.isUpdate ? <div className="form-group mr-3">
                                                    <input  type="button" onClick={()=>handleUpdateContact(updateContact._id,newContact)} className="btn btn-success" value="Update"/>
                                                </div>
                                                :
                                                <div className="form-group mr-3">
                                                    <input onClick={handleSendData} type="button" className="btn btn-success" value="Submit"/>
                                                </div>
                    }
                    
                </form>
            </div>
            <div>
                <h4>Database Information</h4>
                <br/>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                            {
                                contacts.map(contact=><SingleContact key={contact} contact={contact} handleUpdate={handleUpdate}></SingleContact>)
                            }
                        
                    </tbody>
                </table>
            </div>
            
            
            
        </div>
    );
};

export default Contact;