import React, { useState, /* useEffect */ } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, /* useSelector */ } from "react-redux";
import swal from 'sweetalert'
import { editProfile } from "../../redux/actions";
import styles from "./EditProfile.module.css"


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
        console.log("profile", profile);
    }

    /* const handleImage = (e) => {
        let image = document.getElementById("main_image").value
        if (image != "") {
            {
                setProfile({
                    ...profile,
                    profile_pic: image,
                });
            }
        }
    }; */
    
    async function handleImage(e) {
        const preview = document.querySelector("img");
        const fileInput = document.getElementById("image");
        const file = fileInput.files[0];
        const reader = await new FileReader();
        reader.addEventListener(
            "load",
            async function () {
                preview.src = await reader.result;
                setProfile({
                    ...profile,
                    profile_pic: preview.src,
                });;
            },
            false
        );
        if (file) {
            reader.readAsDataURL(file);
        }

    }

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
                    dispatch(editProfile(id_user, profile));
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
            <div className={styles.container}>
                {!profile.profile_pic ? (
                    <img
                        className={styles.avatar}
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqh5pmaPkqtRlk67znEF2s4NADR2URCfOlOQ&usqp=CAU"
                        alt="avatar"
                    />
                ) : (
                    <img
                        className={styles.avatar}
                        src={profile.profile_pic}
                        alt="tu foto"

                    />
                )}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <div>
                            <div>
                                <label className={styles.label}>Name: </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="name"
                                    placeholder="Insert you name"
                                    value={profile.name}
                                    onChange={(e) => handleChange(e)}
                                />
                                {/* {profile.profile_pic != "" ? (
                                    <div >
                                        <img src={profile.profile_pic} className="image_form" alt='' />
                                        <button
                                            className="botonX"
                                            onClick={(e) => handleDeleteImage(e)}
                                            type="reset"
                                        >
                                            X
                                        </button>
                                    </div>
                                ) : ""
                                } */}

                            </div>
                            <div>
                                <label className={styles.label}>lastname</label>
                                <input
                                    className={styles.input}
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
                                    className={styles.input}
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
                                    className={styles.input}
                                    name="date_of_birth"
                                    type="date"
                                    laceholder="DD-MM-YYYY"
                                    value={profile.date_of_birth}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>Profile Pic</label>
                                <div /* style={{ height: "180px" }} */>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: ".8rem",
                                            flexDirection: "column",
                                            justifyContent: "space-around",
                                            height: "100%",
                                        }}
                                    >
                                        <div /* className={styles.inputFileContainer} */>
                                            <label htmlFor="image" /* className={styles.formLabel} */>
                                                <input
                                                    className={styles.input}
                                                    type="file"
                                                    name="photo"
                                                    id="image"
                                                    /* className={styles.inputFile} */
                                                    onChange={(e) => handleImage(e)}
                                                />

                                            </label>
                                        </div>
                                    </div>
                                    {/* {error.photo && <p className={styles.parrafo}>{error.photo}</p>} */}
                                </div>
                                <div>
                                    <div>
                                        {profile.profile_pic != "" ? (
                                            <div >

                                                <button
                                                    className="botonX"
                                                    onClick={(e) => handleDeleteImage(e)}
                                                    type="reset"
                                                >
                                                    Delete pic
                                                </button>
                                            </div>
                                        ) : ""
                                        }

                                    </div>
                                </div>
                                <div>
                                    <label>phone</label>
                                    <input
                                        className={styles.input}
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
                                        className={styles.input}
                                        type="text"
                                        placeholder="Insert you adress"
                                        value={profile.adress}
                                        name="adress"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className={styles.submit} type="submit">
                            Confirm changes
                        </button>
                        <Link to={`/profile/${id_user}`}>
                            <button className={styles.btn}>Back to Profile</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
