import React from 'react';
import { useGlobalContext } from '../../../../context/context';
import SingleQuizzCreateNew from './SingleQuizzCreateNew/SingleQuizzCreateNew';
import SingleQuizzEdit from './SingleQuizzEdit/SingleQuizzEdit';
import axios from 'axios';

const SingleQuizz = ({ quizz }) => {
  const { baseUrl, quizzCreateNew, questionEdit, setQuestionEdit, setSelectedQuestion } = useGlobalContext();

  const handleEditQuestion = (index) => {
    setSelectedQuestion({ ...quizz.questions[index], index });
    setQuestionEdit(true);
  };

  const handleDeleteQuestion = async (index) => {
    try {
      const response = await axios.delete(`${baseUrl}/Quizzes/${quizz.id}`);
      if (response.status === 200) {
        const updatedQuestions = quizz.questions.filter((_, idx) => idx !== index);
        quizz.questions = updatedQuestions;
        setSelectedQuestion({ ...quizz }); // Force re-render
      }
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  if (!quizz) return null;

  return (
    <div className="singleQuizzContainer">
      {quizzCreateNew ? (
        <SingleQuizzCreateNew />
      ) : questionEdit ? (
        <SingleQuizzEdit quizz={quizz} />
      ) : (
        <div className='singleQuizzWrapper'>
          <h3 className="quizTitle">Quiz: {quizz.title}</h3>
          <div data-label="Bundle">
            {(() => {
              switch (quizz.difficulty) {
                case 0:
                  return 'Easy';
                case 1:
                  return 'Medium';
                case 2:
                  return 'Hard';
                default:
                  return 'Unknown';
              }
            })()}
          </div>

          {quizz.questions.map((quest, index) => (
            <div key={index} className='questionContainer'>
              <div className='questionHeader'>
                <div className='questionNumber'>No. {index + 1}</div>
                <div className='questionText'>
                  {quest.type === 0 && quest.text} {/* Display text for type 0 */}
                  {quest.type === 1 && quest.text} {/* Display text for type 1 */}
                  {quest.type === 2 && quest.statement1} {/* Display statement1 for type 2 */}
                  {quest.type === 3 && quest.text} {/* Display text for type 3 */}
                </div>
              </div>

              {/* Options handling */}
              {quest.type === 0 && (
                <div className='questionDetails'>
                  <div className='options'>
                    <strong>Options:</strong>
                    {quest.answers.map((q, idx) => (
                      <p key={idx} style={{ backgroundColor: q.isCorrect ? 'green' : 'transparent', borderRadius: '10px', padding: '.25rem' }}>{q.text}</p>
                    ))}
                  </div>
                </div>
              )}

              {quest.type === 1 && (
                <div className='questionDetails'>
                  <div className='options'>
                    <strong>Options:</strong>
                    {quest.answers.map((q, idx) => (
                      <p key={idx} style={{ backgroundColor: q.isCorrect ? 'green' : 'transparent', borderRadius: '10px', padding: '.25rem' }}>{q.text}</p>
                    ))}
                  </div>
                </div>
              )}

              {quest.type === 2 && (
                <div className='questionDetails'>
                  <div className='options'>
                    <strong>Options:</strong>
                    {quest.answers.map((q, idx) => (
                      <p key={idx} style={{ backgroundColor: q.isCorrect ? 'green' : 'transparent', borderRadius: '10px', padding: '.25rem' }}>{q.text}</p>
                    ))}
                  </div>
                </div>
              )}

              {quest.type === 3 && (
                <div className='questionDetails'>
                  <div className='options'>
                    <strong>Options:</strong>
                    {quest.answers.map((q, idx) => (
                      <p key={idx} style={{ backgroundColor: q.isCorrect ? 'green' : 'transparent', borderRadius: '10px', padding: '.25rem' }}>{q.text}</p>
                    ))}
                  </div>
                  <div className='correctAnswer'>
                    <strong>Correct Answer:</strong>
                    {quest.answers.filter(q => q.isCorrect).map((correctAnswer, idx) => (
                      <p key={idx}>{correctAnswer.text}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className='settingsData'>
                <button className="edit-btn" onClick={() => handleEditQuestion(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteQuestion(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleQuizz;
