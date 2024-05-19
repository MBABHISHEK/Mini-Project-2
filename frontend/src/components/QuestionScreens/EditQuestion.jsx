import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Loader from '../GeneralScreens/Loader';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineUpload } from 'react-icons/ai'
import '../../css/EditQuestion.css'

const EditQuestion = () => {
    const { config } = useContext(AuthContext)
    const slug = useParams().slug
    const imageEl = useRef(null)
    const [loading, setLoading] = useState(true)
    const [question, setQuestion] = useState({})
    const [image, setImage] = useState('')
    const [previousImage, setPreviousImage] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const getQuestionInfo = async () => {
            setLoading(true)
            try{
                const { data } = await axios.get(`http://localhost:5001/question/editQuestion/${slug}`, config)
                setQuestion(data.data)
                setCategory(data.data.category)
                setImage(data.data.image)
                setPreviousImage(data.data.image)
                setLoading(false)
            }
            catch(error){
                navigate("/")
            }
        }
        getQuestionInfo()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formdata = new FormData()
        formdata.append("category", category)
        formdata.append("content", content)
        formdata.append("image", image)
        formdata.append("previousImage", previousImage)

        try {
            const { data } = await axios.put(`http://localhost:5001/question/${slug}/edit`, formdata, config)

            setSuccess('Question edited successfully ')

            setTimeout(() => {
                navigate('/')
            }, 2500)

        }
        catch (error) {
            setTimeout(() => {
                setError('')
            }, 4500)
            setError(error.response.data.error)
        }
    }


    return (
        <>
        {
            loading ? <Loader /> : (
                <div className="Inclusive-editQuestion-page ">
                    <form onSubmit={handleSubmit} className="editQuestion-form">

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
                            placeholder="Category"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                        />

                        <CKEditor
                            editor={ClassicEditor}
                            onChange={(e, editor) => {
                                const data = editor.getData();
                                setContent(data)
                            }}
                            data={content}

                        />

                        <div className="currentlyImage">
                            <div className="absolute">
                                Currently Image
                            </div>
                            <img src={`http://localhost:5001/questionImages/${previousImage}`} alt="storyImage" />
                        </div>
                        <div className="QuestionImageField">
                            <AiOutlineUpload />
                            <div className="txt">

                                {image === previousImage ? "    Change the image in your story " :
                                    image.name}

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

                        <button type='submit' className='editQuestion-btn'
                        >Edit Story </button>
                    </form>

                </div>
            )
        }
    </>
    )
}

export default EditQuestion