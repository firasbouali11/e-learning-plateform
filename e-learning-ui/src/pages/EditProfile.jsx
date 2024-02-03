import React from 'react'
import Swal from 'sweetalert2'
import { motion } from "framer-motion";



export const handleclickUser = () => {

    Swal.fire({
        title: 'Edit user profile',
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Username">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Email">' +
            "<p style='color:red' >PS: Leave the password fields empty if you don't want to change it</p>" +
            '<input id="swal-input3" class="swal2-input" placeholder="Password" type="password">' +
            '<input id="swal-input4" class="swal2-input" placeholder="Repeat password" type="password">',
        inputAttributes: {
            autocapitalize: 'off'
        },
        confirmButtonText: 'Send',
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
            ]
        }
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: `${JSON.stringify(result.value)}`,

            })
        }
    })
}

export const handleclicTeacher = () => {

    Swal.mixin({
        showLoaderOnConfirm: true,
        progressSteps: ['1', '2'],
        allowOutsideClick: () => !Swal.isLoading(),
    }).queue([
        {
            title: 'Edit teacher profile',
            html:
                // '<div style="position:relative"><img src="https://dm.henkel-dam.com/is/image/henkel/men_perfect_de_thumbnails_home_pack_400x400-wcms-fr?scl=1&fmt=jpg" style="border-radius:50%" width=300 height=300/><i style="position:absolute; bottom:20px;right:25%;font-size:30px" class="fas fa-camera"></i></div>'+
                // '<input type="file" class="swal2-input" />'+
                '<input id="swal-input1" class="swal2-input" placeholder="Current Occupation">' +
                '<input id="swal-input2" class="swal2-input" placeholder="Skills">' +
                '<textarea id="swal-input3" class="swal2-input" style="height:100px" placeholder="Small Profile Description"></textarea>',
            // background:"red",
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: 'Next &rarr;',
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value,
                ]
            }
        },
        {
            title: "change you photo",
            // html:
            //     '<div style="position:relative"><img src="https://dm.henkel-dam.com/is/image/henkel/men_perfect_de_thumbnails_home_pack_400x400-wcms-fr?scl=1&fmt=jpg" style="border-radius:50%" width=300 height=300/></div>' +
            //     // '<input type="file" class="swal2-input" id="swal2-input4"/>' +
            //     '<small style="color:red">leave it blank if you don\'t want to change your photo</small>',
            input: "file",
            preConfirm: () => {
                // document.getElementById('swal2-input4').files[0],


            }

        }
    ])
        .then((result) => {
            if (result && result[1]) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    Swal.fire({
                        title: 'Your uploaded picture',
                        imageUrl: e.target.result,
                        imageAlt: 'The uploaded picture'
                    })
                }
                reader.readAsDataURL(result[1])
                // Swal.fire({
                //     title: `${JSON.stringify(result)}`,

                // })
            } else {
                Swal.fire("aaaaaaa", "error","error")
            }
        })
}

function EditProfile() {
    return (
        <div>
            <button onClick={handleclickUser}>Edit user profile</button>
            <button onClick={handleclicTeacher}>Edit Teacher profile</button>

        </div>
    )
}

export default EditProfile
