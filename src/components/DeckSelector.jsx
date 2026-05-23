import React, { Component } from 'react';

class DeckSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newDeckName: ''
    };
  }

  handleAddDeck = (e) => {
    e.preventDefault();
    const name = this.state.newDeckName.trim();
    if (name) {
      this.props.onAddDeck(name);
      this.setState({ newDeckName: '' });
    }
  }

  render() {
    const { decks, currentDeckName, onDeleteDeck, onSwitchDeck } = this.props;
    const deckNames = Object.keys(decks);

    return (
      <div className="deck-selector">
        <div className="deck-list">
          {deckNames.map(name => (
            <div key={name} className="deck-item">
              <button
                className={name === currentDeckName ? 'active' : ''}
                onClick={() => onSwitchDeck(name)}
              >
                {name} ({decks[name].length} карточек)
              </button>
              {deckNames.length > 1 && (
                <button
                  onClick={() => onDeleteDeck(name)}
                  className="delete-deck-btn"
                  title="Удалить колоду"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <form onSubmit={this.handleAddDeck} className="add-deck-form">
          <input
            type="text"
            value={this.state.newDeckName}
            onChange={(e) => this.setState({ newDeckName: e.target.value })}
            placeholder="Название новой колоды"
          />
          <button type="submit">Создать колоду</button>
        </form>
      </div>
    );
  }
}

export default DeckSelector;