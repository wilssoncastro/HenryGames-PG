import React, { useState, /* useEffect */ } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, /* useSelector */ } from "react-redux";
import swal from 'sweetalert'
import { editProfile } from "../../redux/actions";


export default function EditProfile() {
    const id_user = localStorage.getItem('id')
     const dispatch = useDispatch();

   const navigate = useNavigate();

    const [profile, setProfile] = useState({
        name: "",
        lastname: "",
        user: "",
        profile_pic: "",
        date_of_birth: "",
        phone: "",
        adress: ""
    });
    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    }

    const handleImage = (e) => {
        let image = document.getElementById("main_image").value
        if (image != "") {
            {
                setProfile({
                    ...profile,
                    profile_pic: image,
                });
            }
        }
    };

    const handleDeleteImage = (e) => {
        setProfile({
            ...profile,
            profile_pic: ""
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        function alertSubmit() {
            swal({
                title: "Edit Profile",
                text: "Are you sure you want to edit your profile?",
                icon: "info",
                buttons: ["No", "Yes"]
            }).then(response => {
                if (response) {
                    dispatch(editProfile(id_user,profile));
                    setProfile({
                        name: "",
                        lastname: "",
                        user: "",
                        profile_pic: "",
                        date_of_birth: "",
                        phone: "",
                        adress: ""
                    });
                    swal({
                        title: "Confirmed",
                        text: "Profile edited"
                    })
                    navigate(`/profile/${id_user}`);
                }
            })
        }
            alertSubmit()
    }



return (
    <div className="videogame_created_container">
        

        <div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <div>
                            <label>Name: </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Insert you name"
                                value={profile.name}
                                onChange={(e) => handleChange(e)}
                            />

                        </div>
                        <div>
                            <label>lastname</label>
                            <input
                                type="text"
                                placeholder="Insert you name last name"
                                value={profile.lastname}
                                name="lastname"
                                onChange={(e) => handleChange(e)}
                            />

                        </div>

                        <div>
                            <label>User</label>
                            <input
                                type="text"
                                placeholder="Insert you user name"
                                value={profile.user}
                                name="user"
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>


                            <label>Date of Birth</label>
                            <input
                                name="date_of_birth"
                                type="date"
                                laceholder="DD-MM-YYYY"
                                value={profile.date_of_birth}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <label>Profile Pic</label>
                            <input
                                type="text"
                                placeholder="Profile Image"
                                name="image"
                                id="main_image"
                            />
                            <button
                                className="botonX"
                                onClick={(e) => handleImage(e)}
                                type="reset"
                            >add Image
                            </button>
                            <div>
                                {profile.profile_pic != "" ? (
                                    <div >
                                        <img src={profile.profile_pic} className="image_form" />
                                        <button
                                            className="botonX"
                                            onClick={(e) => handleDeleteImage(e)}
                                            type="reset"
                                        >
                                            X
                                        </button>
                                    </div>
                                ) : ""
                                }

                            </div>
                            <div>
                                <label>phone</label>
                                <input
                                    type="tel"
                                    placeholder="Insert your phone number"
                                    value={profile.phone}
                                    name="phone"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>Adress</label>
                                <input
                                    type="text"
                                    placeholder="Insert you adress"
                                    value={profile.adress}
                                    name="adress"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="botonCrear" type="submit">
                        Confirm changes
                    </button>
                    <Link to={`/profile/${id_user}`}>
            <button>Back to Profile</button>
        </Link>
                </div>
            </form>
        </div>
    </div>
);
}
