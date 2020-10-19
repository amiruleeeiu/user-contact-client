import React from 'react';

const SingleContact = (props) => {
    const{name,email,phone,_id}=props.contact;
    const handleDelete=(id)=>{
        console.log("delete",id);
        fetch(`http://localhost:4040/contacts/${id}`, {
            method: 'Delete',
            body: JSON.stringify({id}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then(window.location.pathname=('/'))
    }

    return (
        <>
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>
                    <button style={{marginRight:'5px'}} type="button" class="btn btn-danger" onClick={()=>handleDelete(_id)}>Delete</button>
                    <button type="button" class="btn btn-warning" onClick={()=>props.handleUpdate(props.contact)}>Update</button>
                </td>
            </tr>
        </>
    );
};

export default SingleContact;