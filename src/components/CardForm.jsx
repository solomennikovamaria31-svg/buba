import React, { Component } from 'react';

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: props.initialFront || '',
      back: props.initialBack || '',
      error: ''
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.initialFront !== this.props.initialFront ||
        prevProps.initialBack !== this.props.initialBack) {
      this.setState({
        front: this.props.initialFront || '',
        back: this.props.initialBack || ''
      });
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { front, back } = this.state;
    
    if (!front.trim() || !back.trim()) {
      this.setState({ error: 'Пожалуйста, заполните оба поля' });
      return;
    } 
    this.props.onAddCard(front, back);
    this.setState({ front: '', back: '', error: '' });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="card-form">
        <h2>Добавить карточку</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Вопрос</label>
            <input
              type="text"
              name="front"
              value={this.state.front}
              onChange={this.handleChange}
              placeholder="Введите вопрос"/>
          </div>
          <div className="form-group">
            <label>Ответ</label>
            <input
              type="text"
              name="back"
              value={this.state.back}
              onChange={this.handleChange}
              placeholder="Введите ответ или определение"/>
          </div>
          <button type="submit">Создать карточку</button>
          {this.state.error && <div className="error">{this.state.error}</div>}
        </form>
      </div>
    );
  }
}

export default CardForm;