import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./PostForm.css"

const PostForm = ({handleSubmitForm, card, post}) => {

    const [postsForm,setPostsForm] = useState({answer : ''})
    const [isCorrect, setIsCorrect] = useState(false);
    const handleChange = useRef();
    const handleSubmit = useRef();
    const { current: streakRef } = useRef({ curStreak: 0, highestStreak: 0})

    useEffect(() => {
        setPostsForm(prevPostForm => ({
          ...prevPostForm, 
          answer: '',
        }))
        const rightAns = card.answer.toLowerCase()
        const userAns = post?.answer?.toLowerCase().replace(/[.,]/g, "")
        if (!userAns) {
          setIsCorrect(!!userAns)
        } else {
          const checkCorrect = rightAns.includes(userAns)
          setIsCorrect(checkCorrect)
        }
    
      }, [card, post])


      handleChange.current = (e) => {
        const key = e.target.name;
        setPostsForm(prevPostForm => ({
          ...prevPostForm, 
          [key]: e.target.value,
        }))
      }


      handleSubmit.current = (e) => {
        e.preventDefault();
        handleSubmitForm(postsForm);
        //   const rightAns = card.answer.toLowerCase()
        //   const userAns = postsForm?.answer?.toLowerCase().replace(/[.,]/g, "")
        //   const isCorrect = rightAns.includes(userAns)

        // if (isCorrect) {
        //   streakRef.curStreak += 1;
        //   streakRef.highestStreak += streakRef.curStreak > streakRef.highestStreak ? 1 : 0;
        //   } else {
        //     streakRef.curStreak = 0;
        //   }
      }
    
    
    return (
    <>
    <form className="answer-form" onSubmit={handleSubmit.current}>
        <label htmlFor="answer">Your Answer </label>
        <input 
            name='answer'
            type="text"  
            value ={postsForm.answer}
            id='answer' 
            className='answer-input' 
            placeholder='Type your answer here' 
            onChange={handleChange.current}
        />
        <input type="submit" value="Submit" className= "submit-btn" />
        <div className="streak-container">
            <div className="cur-streak">{`Your current streak ${streakRef.curStreak}`}</div>
            <div className="highest-streak">{`Your highest streak ${streakRef.highestStreak}`}</div>

        </div>

    </form>
    <div className={`ans-checker ${post ? isCorrect : 'init' }`} >{`Your answer is ${isCorrect ? 'correct!' : 'incorect, please try again!'}`}</div>
       </>
    );
};

export default PostForm;