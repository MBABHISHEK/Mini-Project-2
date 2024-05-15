import React from 'react';
import AnswerItem from './AnswerItem';
import '../../css/QuestionAnswers.css'

const questionComments = ({ answerlist, count, activeUser }) => {

    return (
        <>
            {count !== 0 ?
                <div className='questionAnswers'>
                    <h5>MOST RELEVANT</h5>
                    <div className="answer-Wrapper">
                        {
                            answerlist.map((answer) => {
                                return (
                                    <AnswerItem key={answer._id} answer={answer} activeUser={activeUser} />
                                )
                            })
                        }
                    </div>

                </div> :
                <div className='no-response'>There are currently no answer for this question.
                    Be the first to answer. </div>
            }
        </>
    )
}

export default questionComments;
