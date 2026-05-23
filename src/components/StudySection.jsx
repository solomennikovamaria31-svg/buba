import React, { Component } from 'react';

class StudySection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      isFlipped: false
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.cards !== this.props.cards || 
        prevProps.studyMode !== this.props.studyMode) {
      this.setState({ currentIndex: 0, isFlipped: false });
    }
  }
  getFilteredCards = () => {
    const { cards, studyMode } = this.props;
    return studyMode === 'unlearned' 
      ? cards.filter(card => !card.learned) 
      : cards;
  }
  goToNext = () => {
    const filteredCards = this.getFilteredCards();
    if (this.state.currentIndex < filteredCards.length - 1) {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        isFlipped: false
      });
    }
  }
  goToPrev = () => {
    if (this.state.currentIndex > 0) {
      this.setState({
        currentIndex: this.state.currentIndex - 1,
        isFlipped: false
      });
    }
  }
  flipCard = () => {
    this.setState({ isFlipped: !this.state.isFlipped });
  }
  handleShuffle = () => {
    this.props.onShuffle();
    this.setState({ currentIndex: 0, isFlipped: false });
  }
  render() {
    const { studyMode, onStudyModeChange } = this.props;
    const { currentIndex, isFlipped } = this.state;
    const filteredCards = this.getFilteredCards();
    const currentCard = filteredCards[currentIndex] || null;
    if (filteredCards.length === 0) {
      return (
          <div className="empty-study">
            {studyMode === 'unlearned'
              ? ' Все карточки выучены!'
              : 'Колода пуста. Добавьте карточки для изучения.'
            }
          </div>
      );
    }
    return (
      <div className="study-section">
        <h2>Изучение</h2> 
        <div className="study-controls">
          <div className="mode-selector">
            <label>
              <input
                type="radio"
                value="all"
                checked={studyMode === 'all'}
                onChange={() => onStudyModeChange('all')}
              />
              Все карточки
            </label>
            <label>
              <input
                type="radio"
                value="unlearned"
                checked={studyMode === 'unlearned'}
                onChange={() => onStudyModeChange('unlearned')}
              />
              Невыученные
            </label>
          </div> 
          <button onClick={this.handleShuffle} className="shuffle-btn">
            Перемешать
          </button>
        </div>
        <div className="study-area">
          <div className="card-container">
            <div 
              className={`flashcard ${isFlipped ? 'flipped' : ''}`}
              onClick={this.flipCard}>
              <div className="flashcard-inner">
                <div className="flashcard-front">
                  <p>{currentCard.front}</p>
                </div>
                <div className="flashcard-back">
                  <p>{currentCard.back}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="navigation">
            <button 
              onClick={this.goToPrev} 
              disabled={currentIndex === 0}
              className="nav-btn">
               Назад
            </button>
            <span className="position-indicator">
              {currentIndex + 1} / {filteredCards.length}
            </span>
            <button 
              onClick={this.goToNext} 
              disabled={currentIndex === filteredCards.length - 1}
              className="nav-btn">
              Вперёд 
            </button>
          </div>
          <div className="flip-hint">
            <small>Нажмите на карточку, чтобы перевернуть</small>
          </div>
        </div>
      </div>
    );
  }
}

export default StudySection;