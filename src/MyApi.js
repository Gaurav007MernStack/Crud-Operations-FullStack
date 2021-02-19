import React, { useState,useEffect } from 'react';
import axios from 'axios';
export const MyApi = ()=>{
    const[users,setUsers] = useState([]);
    const[id,setid] = useState({
        id: "",
    });
    const [userData,setuserData] = useState({
        name: "",
        age:  Number,
        email: "",
    });
    //using useEffect HOOKS for auto-rendering Users
    useEffect(()=> {
        fetchUsers();
    },[])
    // get data from DB
    const fetchUsers = async ()=>{
        try {
            const res = await axios.get(`http://localhost:7000/getFriendsFromDb`);
            console.log("res",res);
            setUsers(res.data);
        } catch (error) {
            console.log("error",error);
        }
    };
    const handleDataChange=(e)=>{
        const {name, value} = e.target
        setuserData({...userData,[name]:value})
        //if(name==="Country"){
        //    setuserData({...userData,[Country]:value})
        //}
        //else{
        //    setuserData({...userData,[Country]:value})
        //}
        
    };
    // post data on DB by from Submit
    const OnFormSubmit = (e)=>{
        e.preventDefault();
        console.log(userData);
        createUser();
        setuserData({
            name: "",
            age: Number,
            email: ""
        })
    };
    // post data on DB by from Submit
    const createUser = async () =>{
        //let dummy = {
        //    name: "Maharana Pratap",
        //    age: 19,
        //    email: "maharana@gmail.com"
        //}
        try {
            const res = await axios.post(`http://localhost:7000/addFriend`,userData);
            console.log("res",res);
            fetchUsers();
        } catch (error) {
            console.log("error",error.response);
        }
    }
    //delete user from DB
    const deleteUser = async(_id)=>{
        try {
            const res = await axios.delete(`http://localhost:7000/deleteBYId/${_id}`);
            console.log("res",res);
            fetchUsers();
        } catch (error) {
            console.log("error",error);
        }
    };
    //for updating(put) user from DB on form
    const OnFormSubmit2 = (e) =>{
        e.preventDefault();
        updateUser(id.id);
        console.log(id.id)

    }
    
    //for getting user Data after click on Update
    const getSingleUser = async(_id)=>{
        try {
            const res = await axios.get(`http://localhost:7000/getFriendByIdFromDb/${_id}`);
            setuserData({
                name: res.data.name,
                age: res.data.age,
                email: res.data.email,
            });
            setid({
                id: res.data._id,
            });
        } catch (error) {
            console.log("error",error);
        }
    }
    
    // for put data into DB
    const updateUser = async(id) =>{
        try {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            };
            const res = await axios.put(`http://localhost:7000/update/${id}`,userData);
            setuserData({
                name: "",
                age: Number,
                email: "",
            })
            fetchUsers();
        } catch (error) {
            console.log("error",error);
        }
    };
    return(
        <div className="main d-flex justify-content-center">
            <h2 className="header">Full Stack Operation</h2>
            <form onSubmit={(e)=>OnFormSubmit(e)} className="form">
                <div>
                <input 
                    type="text" 
                    placeholder="Name:" 
                    value={userData.name}
                    name="name"
                    onChange={(e)=>handleDataChange(e)}/>
                </div>
                <div>
                <input 
                    type="Number" 
                    placeholder="Age:" 
                    value={userData.age}
                    name="age"
                    onChange={(e)=>handleDataChange(e)}/>
                </div>
                <div>
                <input 
                    type="text" 
                    placeholder="Email:" 
                    value={userData.email}
                    name="email"
                    onChange={(e)=>handleDataChange(e)}/>
                </div>
                <button type="submit">Add DataToDB</button>
            </form>

            <form onSubmit={(e)=>OnFormSubmit2(e)} className="main2form">
            <button type="submit" >Update</button>
            
            <button onClick={fetchUsers} id="get">GET DATA</button>
            </form>
            <div className="infoParent">
                <h2 className="infoTitle">Mongo DB Data:</h2>
                {
                    users.map((user)=>{
                        return (
                            <div className="infoHead">
                                <p><span id="info">Name:</span>{user.name}</p>
                                <p><span id="info">Age:</span>{user.age}</p>
                                <p><span id="info">Email:</span>{user.email}</p>
                                <button className="userBtn1" onClick={() =>getSingleUser(user._id)}>Update</button>
                                <button className="userBtn2" onClick={() =>deleteUser(user._id)}>Delete</button>
                            </div>
                        )
                        
                    })
                }
            </div>
            

        </div>
    );
};