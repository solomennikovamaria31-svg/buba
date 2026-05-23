import React, { Component } from 'react';
import CardForm from './CardForm';

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingId: null
    };
  }
  handleEditClick = (card) => {
    this.setState({ editingId: card.id });
  }
  handleEditSubmit = (front, back) => {
    if (this.state.editingId !== null) {
      this.props.onEdit(this.state.editingId, front, back);
      this.setState({ editingId: null });
    }
  }
  handleCancelEdit = () => {
    this.setState({ editingId: null });
  }
  render() {
    const { cards, onDelete, onToggleLearned } = this.props;
    const { editingId } = this.state;   
    const editingCard = editingId !== null 
      ? cards.find(c => c.id === editingId) 
      : null;
    return (
      <div className="card-list">
        <h2> Все карточки ({cards.length})</h2>      
        {editingId !== null && (
          <div className="edit-form-container">
            <h3>Редактирование карточки</h3>
            <CardForm
              onAddCard={this.handleEditSubmit}
              initialFront={editingCard?.front || ''}
              initialBack={editingCard?.back || ''}/>
            <button onClick={this.handleCancelEdit} className="cancel-btn">Отменить</button>
          </div>
        )}
        {cards.length === 0 ? (
          <p className="empty-message">Колода пуста. Создайте карточку!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Вопрос</th>
                <th>Ответ</th>
                <th>Выуч./ Не выуч.</th>
                <th>Редакт./ Удалить</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card.id} className={card.learned ? 'learned' : ''}>
                  <td>{card.front}</td>
                  <td>{card.back}</td>
                  <td>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={card.learned}
                        onChange={() => onToggleLearned(card.id)}/>
                      {card.learned ? 'Выуч.' : 'Не выуч.'}
                    </label>
                  </td>
                  <td className="actions">
                    <button onClick={() => this.handleEditClick(card)} className="edit-btn">
                      Редакт.
                    </button>
                    <button onClick={() => onDelete(card.id)} className="delete-btn">
                      Удалить 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default CardList;