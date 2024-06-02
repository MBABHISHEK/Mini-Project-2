import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import "../../css/DetailQuestion.css"
import Loader from '../GeneralScreens/Loader';
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit, FiArrowLeft } from 'react-icons/fi'
import { FaRegComment } from 'react-icons/fa'
import { BsBookmarkPlus, BsThreeDots, BsBookmarkFill } from 'react-icons/bs'
import AnswerSidebar from '../AnswerScreens/AnswerSidebar';

const DetailQuestion = () => {
    const [likeStatus, setLikeStatus] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [activeUser, setActiveUser] = useState({})
    const [question, setQuestion] = useState({})
    const [sidebarShowStatus, setSidebarShowStatus] = useState(false)
    const [loading, setLoading] = useState(true)
    const slug = useParams().slug
    const navigate = useNavigate()
    const [questionLikeUser, setQuestionLikeUser] = useState([])

    useEffect(() => {
        const getDetailQuestion = async () => {
            setLoading(true)
            var activeUser = {}
            try{
                const { data } = await axios.get("http://localhost:5001/auth/private", {
                    headers: {
                      "Content-Type": "application/json",
                      authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                  });
                  activeUser = data.user
          
                  setActiveUser(activeUser)
            }
            catch(error){
                setActiveUser({})
            }
            try{
                const { data } = await axios.post(`http://localhost:5001/question/${slug}`, { activeUser })
                setQuestion(data.data)
                setLikeStatus(data.likeStatus)
                setLikeCount(data.data.likeCount)
                setQuestionLikeUser(data.data.likes)
                setLoading(false)
            }
            catch(error){
                setQuestion({})
                navigate("/not-found")
            }
        }
        getDetailQuestion()
    }, [slug, setLoading])

    const handleLike = async () => {
        setTimeout(() => {
          setLikeStatus(!likeStatus)
        }, 1500)
    
        try {
          const { data } = await axios.post(`http://localhost:5001/question/${slug}/like`, { activeUser }, {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          })
    
          setLikeCount(data.data.likeCount)
          setQuestionLikeUser(data.data.likes)
    
        }
        catch (error) {
          setQuestion({})
          localStorage.removeItem("authToken")
          navigate("/")
        }
    
      }

      const handleDelete = async () => {

        if (window.confirm("Do you want to delete this post")) {
    
          try {
    
            await axios.delete(`http://localhost:5001/question/${slug}/delete`, {
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            })
            navigate("/")
    
          }
          catch (error) {
            console.log(error)
          }
    
        }
    
      }
      const editDate = (createdAt) => {

        const d = new Date(createdAt)
          ;
        var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + " " + d.getDate()
        return datestring
      }

      return (
        <>
      {
        loading ? <Loader /> :
          <>

            <div className='Inclusive-detailQuestion-page'>

              <div className="top_detail_wrapper">
                <Link to={'/'} >
                  <FiArrowLeft />
                </Link>
                <h5>{question.category}</h5>

                <div className='question-general-info'>

                  <ul>
                    {question.user &&
                      <li className='question-user-info'>
                        <img src={`http://localhost:5001/userPhotos/${question.user.photo}`} alt={question.user.username} />
                        <span className='question-author-username'>{question.user.username}  </span>
                      </li>
                    }
                    <li className='question-createdAt'>
                      {
                        editDate(question.createdAt)
                      }
                    </li>
                    <b>-</b>

                    {/* <li className='question-readtime'>
                      {question.readtime} min read

                    </li> */}

                  </ul>

                  {
                    !activeUser.username &&
                    <div className='answer-info-wrap'>

                      <i onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus)
                      }}>
                        <FaRegComment />
                      </i>


                      <b className='commentCount'>{question.AnswerCount}</b>

                    </div>
                  }

                  {activeUser && question.user &&
                    question.user._id === activeUser._id ?
                    <div className="top_question_transactions">
                      <Link className='editquestionLink' to={`http://localhost:5001/question/${question.slug}/edit`}>
                        <FiEdit />
                      </Link>
                      <span className='deleteQuestionLink' onClick={handleDelete}>
                        <RiDeleteBin6Line />
                      </span>
                    </div> : null
                  }
                </div>
                <div className='question-content' >

                  <div className="question-banner-img">
                    <img src={`http://localhost:5001/questionImages/${question.image}`} alt={question.title} />

                  </div>

                  <div className='content' dangerouslySetInnerHTML={{ __html: (question.content) }}>
                  </div>

                </div>
              </div>

              <div className="AnswerFieldEmp">

                <AnswerSidebar slug={slug} sidebarShowStatus={sidebarShowStatus} setSidebarShowStatus={setSidebarShowStatus}
                  activeUser={activeUser}
                />

              </div>

              

              {activeUser.username &&
                <div className='fixed-question-options'>

                  <ul>
                    <li>

                      <i onClick={handleLike} >

                        {likeStatus ? <FaHeart color="#0063a5" /> :
                          <FaRegHeart />
                        }
                      </i>

                      <b className='likecount'
                        style={likeStatus ? { color: "#0063a5" } : { color: "rgb(99, 99, 99)" }}
                      >  {likeCount}
                      </b>

                    </li>


                    <li>
                      <i onClick={(prev) => {
                        setSidebarShowStatus(!sidebarShowStatus)
                      }}>
                        <FaRegComment />
                      </i>

                      <b className='commentCount'>{question.AnswerCount}</b>

                    </li>

                  </ul>

                  <ul>
                    {/* <li>
                      <i onClick={addquestionToReadList}>

                        {questionReadListStatus ? <BsBookmarkFill color='#0205b1' /> :
                          <BsBookmarkPlus />
                        }
                      </i>
                    </li> */}

                    <li className='BsThreeDots_opt'>
                      <i  >
                        <BsThreeDots />
                      </i>

                      {activeUser &&
                        question.user._id === activeUser._id ?
                        <div className="delete_or_edit_question  ">
                          <Link className='editquestionLink' to={`/question/${question.slug}/edit`}>
                            <p>Edit question</p>
                          </Link>
                          <div className='deletequestionLink' onClick={handleDelete}>
                            <p>Delete question</p>
                          </div>
                        </div> : null
                      }

                    </li>

                  </ul>

                </div>
              }

            </div>
          </>
      }
    </>
    )
}

export default DetailQuestion