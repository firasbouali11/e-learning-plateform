import React,{useState} from 'react'

function Test() {

    const [data ,setData] = useState([])
    const [image ,setImage] = useState(null)
    const [text ,setText] = useState("")


    const upload = async () => {
        const formData = new FormData()
        formData.append("image",image,image.name)
        // formData.append("title",text)
        await fetch("http://127.0.0.1:8000/upload/",{
            headers:{
                "Content-Type":"application/json"
            },
            method:"post",
            body:formData

        }).then(data=>{
            console.log(data)
        })
    }

    return (
        <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
            <input type="file" onChange={e => setImage(e.target.files[0])} />
            <button onClick={upload}>Submit</button>
        </div>
    )
}

export default Test
rf