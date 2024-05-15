import React from 'react';
import { Link } from 'react-router-dom';

const Question = ({ question }) => {
    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " +monthNames[d.getMonth()] + " ," + d.getFullYear() 
        return datestring
    }

    const truncateContent = (content) => {
        const trimmedString = content.substr(0, 73);
        return trimmedString
    }
    const truncatecategory= (category) => {
        const trimmedString = category.substr(0, 69);
        return trimmedString
    }
    
    return (

        <div className="question-card">
            <Link to={`/question/${question.slug}`} className="question-link">

                <img className=" question-image" src={`/questionImages/${question.image}`} alt={question.category} />
                <div className="question-content-wrapper">

                    <h5 className="question-category">
                        
                    {question.category.length > 76 ? truncatecategory(question.category)+"..." : question.category
                    
                    }
                    </h5>


                    <p className="question-text"dangerouslySetInnerHTML={{__html : truncateContent( question.content) +"..."}}>
                        </p>
                    <p className="question-createdAt">{editDate(question.createdAt)} 
                    </p>
                </div>
            </Link>
        </div>

    )
}

export default Question