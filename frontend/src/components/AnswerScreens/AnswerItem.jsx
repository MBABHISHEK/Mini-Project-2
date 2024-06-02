import React, { useState, useEffect } from 'react';
import {
    MdOutlineWavingHand,
    MdWavingHand
} from 'react-icons/md'
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AnswerItem = ({ answer, activeUser }) => {
    const navigate = useNavigate()
    const [likeCount, setLikeCount] = useState(answer.likeCount)
    const [likeStatus, setLikeStatus] = useState(false)

    useEffect(() => {

        const getanswerLikeStatus = async () => {

            const answer_id = answer._id
            try {
                const { data } = await axios.post(`http://localhost:5001/answer/${answer_id}/getAnswerLikeStatus`, { activeUser }, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                })
                //console.log(activeUser)
                setLikeStatus(data.likeStatus)
            }
            catch (error) {

                localStorage.removeItem("authToken")
                navigate("/")
            }
        }

        getanswerLikeStatus()

    }, [])
    const editDate = (createdAt) => {
        const d = new Date(createdAt);
        var datestring = d.toLocaleString('eng', { month: 'long' }).substring(0, 3) + " " + d.getDate()
        return datestring
    }


    const handleanswerLike = async () => {
        console.log("like answer")

        const answer_id = answer._id
        
        try {
            const { data } = await axios.post(`http://localhost:5001/answer/${answer_id}/like`, { activeUser }, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            console.log(activeUser)
            setLikeCount(data.data.likeCount)
            setLikeStatus(data.likeStatus)

        }
        catch (error) {
            localStorage.removeItem("authToken")
            navigate("/")
        }
    }

    return (

        <div className='answer-item'>
            <div className="answer-top-block">

                <section>
                    <img src={`http://localhost:5001/userPhotos/${answer.user.photo}`} alt={answer.user.username} width="35" />

                    <div>
                        <span className='answer-author-username' >{answer.user.username}</span>
                        <span className='answer-createdAt'>{editDate(answer.createdAt)}</span>
                    </div>
                </section>

                <section>
                    <BsThreeDots />
                </section>
            </div>


            <div className="answer-content">

                <span dangerouslySetInnerHTML={{ __html: answer.content }}></span>

            </div>


            <div className="answer-bottom-block">

                <div className="answerLike-wrapper">


                    <i className='biLike' onClick={() => handleanswerLike()}>
                        {
                            likeStatus ? <MdWavingHand /> : <MdOutlineWavingHand />

                        }
                    </i>
                    <span className='answerlikeCount'>
                        {likeCount}

                    </span>
                </div>

                {/* <div className="answer-star">
                    {
                        [...Array(5)].map((_, index) => {
                            return (
                                <FaStar
                                    key={index}
                                    className="star"
                                    size={15}
                                    color={answer.star > index ? "#0205b1" : "grey"}
                                />
                            )
                        })
                    }

                </div> */}

            </div>

        </div>

    )
}

export default AnswerItem;
