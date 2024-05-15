import React, { useRef, useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineUpload } from 'react-icons/ai'
import { FiArrowLeft } from 'react-icons/fi'
import '../../css/AddQuestion.css'

const AddQuestion = () => {
    const { config } = useContext(AuthContext)
    const imageEl = useRef(null)
    const editorEl = useRef(null)
    const [image, setImage] = useState('')
    const [category, setcategory] = useState('')
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')

    const clearInputs = () => {
        setcategory('')
        setContent('')
        setImage('')
        editorEl.current.editor.setData('')
        imageEl.current.value = ""
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("category", category)
        formdata.append("image", image)
        formdata.append("content", content)

        try {
            const { data } = await axios.post("/question/addquestion", formdata, config)
            setSuccess('Add question successfully ')

            clearInputs()
            setTimeout(() => {
                setSuccess('')
            }, 7000)

        }
        catch (error) {
            setTimeout(() => {
                setError('')

            }, 7000)
            setError(error.response.data.error)

        }
    }
    return (
        <div className="Inclusive-addQuestion-page ">
        <Link to={'/'} >
            <FiArrowLeft />
        </Link>
        <form onSubmit={handleSubmit} className="addQuestion-form">

            {error && <div className="error_msg">{error}</div>}
            {success && <div className="success_msg">
                <span>
                    {success}
                </span>
                <Link to="/">Go home</Link>
            </div>}

            <input
                type="text"
                required
                id="category"
                placeholder="category"
                onChange={(e) => setcategory(e.target.value)}
                value={category}
            />

            <CKEditor
                editor={ClassicEditor}
                onChange={(e, editor) => {
                    const data = editor.getData();
                    setContent(data)
                }}
                ref={editorEl}
            />
            <div className="QuestionImageField">
                <AiOutlineUpload />
                <div className="txt">
                    {image ? image.name :
                        " Include a high-quality image in your question to make it more inviting to users."
                    }
                </div>
                <input
                    name="image"
                    type="file"
                    ref={imageEl}
                    onChange={(e) => {
                        setImage(e.target.files[0])
                    }}
                />
            </div>
            <button type='submit' disabled={image ? false : true} className={image ? 'addQuestion-btn' : 'dis-btn'}
            >Publish </button>
        </form>

    </div>
    )
}

export default AddQuestion