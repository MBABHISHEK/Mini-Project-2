import React, { useState, useRef } from 'react'
import axios from 'axios';
import { BsShieldCheck, BsCheckAll } from 'react-icons/bs'
import { IoAdd } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import "../../css/AddAnswer.css"

const AddAnswer = ({ setSidebarShowStatus, slug, getQuestionAnswers, activeUser, count }) => {
    const navigate = useNavigate();
    const textareaRef = useRef(null)
    const [content, setContent] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [showStatus, setShowStatus] = useState(true)    

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.post(`http://localhost:5001/answer/${slug}/addAnswer`, { content }, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })

            setSuccess('Answer added successfully ')
            setTimeout(() => {
                setSuccess('')
            }, 2700)

            setTimeout(() => {
                document.querySelector(".answerCount").textContent = count + 1
            }, 650);

            clearInputs()

            getQuestionAnswers()

        }
        catch (error) {

            if (error.response.data.error === 'Jwt expired') {
                console.log("token expired ...")
                navigate('/')
            }
            setError(error.response.data.error)
            setTimeout(() => {
                setError('')
            }, 4500)
        }
    }
    const clearInputs = () => {

        setContent('')
        textareaRef.current.textContent = ''

    }
    return (
        <>
            <div className="sidebar-top-block">

                <h3>Responses ( <span className='sidebar-answerCount'>{count}
                </span> )   </h3>

                <div>

                    < BsShieldCheck />
                    <IoAdd onClick={() => setSidebarShowStatus(false)} className='ıoAddIcon' />
                </div>
            </div>

            {error && <div className="alert-error-message">{error}</div>}


            {activeUser.username &&

                <form className='addAnswer-form' onSubmit={handleSubmit}>


                    {success && <div className="alert-success-message">
                        <BsCheckAll />
                        {success}</div>}


                    <div className={showStatus ? 'activeuser-info ' : 'activeuser-info hidden '}>
                        <img src={`http://localhost:5001/userPhotos/${activeUser.photo}`} alt={activeUser.username} />
                        <span className='username'>{activeUser.username}  </span>
                    </div>

                    <div className="textarea-wrapper">
                        <div ref={textareaRef}
                            contentEditable
                            placeholder='What are your thoughts ?' id="answer"
                            name="content"
                            onKeyUp={(e) => {
                                setContent(e.target.innerHTML)
                                console.log(e.target.innerHTML)
                            }
                            }

                            onFocus={() => setShowStatus(true)}
                        ></div>
                    </div>

                    <div className={showStatus ? 'form-bottom-block' : 'form-bottom-block hidden'} >


                        <div className="formBtn-wrapper">
                            <button type='button'
                                className='cancel-Btn'
                                onClick={() => setShowStatus(!showStatus)}
                            >Cancel </button>
                            <button type='submit' className={content === '' ? 'respond-Btn disable' : 'respond-Btn'}
                                disabled={content === '' ? true : false}
                            >Respond </button>

                        </div>
                    </div>

                </form>


            }
        </>
    )
}

export default AddAnswer