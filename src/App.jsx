import React, { Component } from 'react';
import './App.css';
import CardForm from './components/CardForm';
import CardList from './components/CardList';
import StudySection from './components/StudySection';
import DeckSelector from './components/DeckSelector';

class App extends Component {
  constructor(props) {
    super(props);
    const savedDecks = localStorage.getItem('flashcardDecks');
    const savedDeckName = localStorage.getItem('currentDeckName'); 
    this.state = {
      decks: savedDecks ? JSON.parse(savedDecks) : { 'Основная колода': [] },
      currentDeckName: savedDeckName || 'Основная колода',
      studyMode: 'all'
    };
    this.saveTimer = null;
  }
  componentDidMount() {
    this.saveTimer = setInterval(() => {
      localStorage.setItem('flashcardDecks', JSON.stringify(this.state.decks));
      localStorage.setItem('currentDeckName', this.state.currentDeckName);
    }, 5000);
  }
  componentWillUnmount() {
    if (this.saveTimer) {
      clearInterval(this.saveTimer);
    }
  }
 getCurrentDeck = () => {
    return this.state.decks[this.state.currentDeckName] || [];
  }
 updateDeck = (newDeck) => {
    this.setState((prevState) => ({
      decks: {
        ...prevState.decks,
        [prevState.currentDeckName]: newDeck
      }
    }));
  }
 addCard = (front, back) => {
    if (!front.trim() || !back.trim()) return;   
    const newCard = {
      id: Date.now(),
      front: front.trim(),
      back: back.trim(),
      learned: false
    };   
    const currentDeck = this.getCurrentDeck();
    this.updateDeck([...currentDeck, newCard]);
  }
  deleteCard = (id) => {
    const currentDeck = this.getCurrentDeck();
    this.updateDeck(currentDeck.filter(card => card.id !== id));
  }
  editCard = (id, front, back) => {
    const currentDeck = this.getCurrentDeck();
    this.updateDeck(currentDeck.map(card => 
      card.id === id ? { ...card, front, back } : card
    ));
  }
  toggleLearned = (id) => {
    const currentDeck = this.getCurrentDeck();
    this.updateDeck(currentDeck.map(card => 
      card.id === id ? { ...card, learned: !card.learned } : card
    ));
  }
  shuffleDeck = () => {
    const currentDeck = this.getCurrentDeck();
    const shuffled = [...currentDeck];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.updateDeck(shuffled);
  }
  addDeck = (name) => {
    if (!name.trim()) return;
    if (this.state.decks[name]) return;  
    this.setState((prevState) => ({
      decks: {
        ...prevState.decks,
        [name]: []
      }
    }));
  }
  deleteDeck = (name) => {
    const deckNames = Object.keys(this.state.decks);
    if (deckNames.length <= 1) return; 
    const newDecks = { ...this.state.decks };
    delete newDecks[name];  
    this.setState((prevState) => ({
      decks: newDecks,
      currentDeckName: prevState.currentDeckName === name ? deckNames[0] : prevState.currentDeckName
    }));
  }
  switchDeck = (name) => {
    this.setState({ currentDeckName: name });
  }
  setStudyMode = (mode) => {
    this.setState({ studyMode: mode });
  }
  render() {
    const currentDeck = this.getCurrentDeck(); 
    return (
      <div className="app">
        <h1>Карточки для изучения</h1>
        <DeckSelector
          decks={this.state.decks}
          currentDeckName={this.state.currentDeckName}
          onAddDeck={this.addDeck}
          onDeleteDeck={this.deleteDeck}
          onSwitchDeck={this.switchDeck}/>
        <div className="main-content">
          <div className="left-panel">
            <CardForm onAddCard={this.addCard} />
            <CardList
              cards={currentDeck}
              onDelete={this.deleteCard}
              onEdit={this.editCard}
              onToggleLearned={this.toggleLearned}/>
          </div>
          <div className="right-panel">
            <StudySection
              cards={currentDeck}
              studyMode={this.state.studyMode}
              onStudyModeChange={this.setStudyMode}
              onShuffle={this.shuffleDeck}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;