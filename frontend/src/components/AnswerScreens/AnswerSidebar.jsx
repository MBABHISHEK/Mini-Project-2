import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import QuestionAnswers from "./QuestionAnswers"
import AddAnswer from "./AddAnswer"

const AnswerSidebar = ({slug, sidebarShowStatus, setSidebarShowStatus, activeUser}) => {

    const [count, setCount] = useState(0)
    const [answerlist, setAnswerList] = useState([])
    const sidebarRef = useRef(null);

    useEffect(() => {
        getQuestionAnswers()
    }, [setAnswerList])
    const getQuestionAnswers = async () => {
        try {
          const { data } = await axios.get(`http://localhost:5001/answer/${slug}/getAllAnswer`)
          setAnswerList(data.data)
          setCount(data.count)
        }
        catch (error) {
          console.log(error.response.data.error);
        }
      }
      useEffect(() => {
        const checkIfClickedOutside = e => {
    
          if (sidebarShowStatus && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setSidebarShowStatus(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [sidebarShowStatus])

      return (

        <div ref={sidebarRef} className={sidebarShowStatus ? "Inclusive-comment-sidebar visible" : "Inclusive-comment-sidebar hidden "}  >
    
          <div className='sidebar-wrapper'>
    
            <AddAnswer setSidebarShowStatus={setSidebarShowStatus} slug={slug} getQuestionAnswers={getQuestionAnswers} activeUser={activeUser} count={count} />
    
            <QuestionAnswers answerlist={answerlist} activeUser={activeUser} count={count} />
          </div>
    
        </div>
    
      )
}

export default AnswerSidebar