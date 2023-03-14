import React, { useCallback, useState } from 'react';
import "./CardView.css"
import cards from '../../../server/card';
import Button from '../button/Button';
import PostForm from '../form/PostForm';

const CardView = () => {
    const [card, setCard] = useState(cards[0] ?? ''); 
    const [isFront, setFront] = useState(true);
    const [post, setPost] = useState();

    
    const handleSubmitForm = useCallback((data) =>  {
      setPost(data) 
      
    }, [])

    const handleFlipCard = useCallback(() => {
      setFront(isFront => !isFront)
    }, [])
    
    const handleSwitchCard = (dir) => {
        switch (dir) {
        case 'PREVIOUS':
          const prevCard = cards.find(c => c.id === (card.id > 1 ? card.id - 1 : 1))
          
          setCard(prevCard)
          setFront(true)
          setPost('')
          break;
        
        case 'NEXT':
          const nextCard = cards.find(c => c.id === (card.id < cards.length ? card.id + 1 : cards.length))
          // const nextCard = cards[Math.floor(Math.random() * cards.length)]
          setCard(nextCard)
          setFront(true)
          setPost('')
          break;

        case "SHUFFLE":
          const shufflecard = cards[Math.floor(Math.random() * cards.length)]
          setCard(shufflecard)
          setFront(true)
          setPost('')
          break;
        
        default:
          return
      }
    }
  
    // const handlePrevCard = useCallback(() => handleSwitchCard('PREVIOUS'), [])
    // const handleNextCard = useCallback(() => handleSwitchCard('NEXT'), [])
      
    return (
      <div>
        <div className={`flip-card ${card.level ?? ''}`} onClick={handleFlipCard}>
          <div className={`flip-card-inner ${isFront ? 'front' : ''}`} >
            <div className="flip-card-front"><p>{(card.question ?? '')}</p></div>
            <div className="flip-card-back">
              <p>{(card.answer ?? '')}</p>
            </div>
            {/* {
              (() => {
                switch (isFront) {
                  case true:
                    return <div className="flip-card-front"><p>{(card.question ?? '')}</p></div>
                  case false:
                    return <div className="flip-card-back"><p>{(card.answer ?? '')}</p></div>
                  default:
                    return null
                }
              })()
            } */}
          
          </div>
        </div>



        <PostForm 
          post={post}
          handleSubmitForm={handleSubmitForm} 
          card={card}
        ></PostForm>


<div className='dir-btn'>
          <div className="btn-prev">
            <Button  onHandleCard={() => handleSwitchCard('PREVIOUS')}>Previous</Button>
          </div>

          <div className="btn-next">
            <Button onHandleCard={() => handleSwitchCard('NEXT')}>Next</Button>
          </div>

          <div className="btn-shuffle">
            <Button  onHandleCard={() => handleSwitchCard('SHUFFLE')}>Shuffle</Button>
          </div>
          
          {/* <Button onHandleCard={handlePrevCard}>Previous</Button>
          <Button onHandleCard={handleNextCard}>Next</Button> */}
        </div>

      </div>
    );
  };

  export default CardView