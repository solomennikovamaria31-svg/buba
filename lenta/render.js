class ShowJoke {
    constructor()
    {
        this.jokesCont = document.querySelector('#containerJoke');
        this.jokes = [];
    }
    
    setJokes(jokes) 
    {
        if (!jokes || jokes.length === 0)
        {
            this.showEmpty();
            return;
        }
        this.jokes = [...jokes];
        this.renderJokes();
    }
    
    renderJokes() 
    {
        if (!this.jokes || this.jokes.length === 0) 
        {
            this.showEmpty();
            return;
        }
        
        const jokeHtml = this.jokes.map(joke => `
            <div class="joke-card">
                <div class="joke-text">${this.escapeHtml(joke.value)}</div>
            </div>
        `).join('');
        this.jokesCont.innerHTML = jokeHtml;
    }
    
    showLoading() 
    {  
        this.jokesCont.innerHTML = "Идет загрузка...";
    }
    
    addJokes(newJokes) 
    {
        if (!newJokes || newJokes.length === 0) 
        {
            this.showEndMessage(); 
            return;
        }
        this.jokes.push(...newJokes);
        this.renderJokes();
    }
    
    escapeHtml(str) 
    {
        if (!str) return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    
    showEmpty() 
    {
        this.jokesCont.innerHTML = 'Шутки не были найдены!';
    }
    
    showError(message, retryCallback) 
    {
        this.jokesCont.innerHTML = `
            <div class='error'> Ошибка: ${this.escapeHtml(message)}</div>
            <button class='retry'>Повторить</button>
        `;
        
        if (retryCallback) 
        {
            const retryBtn = this.jokesCont.querySelector('.retry');
            if (retryBtn) 
            {
                retryBtn.addEventListener('click', retryCallback);
            }
        }
    }
    
    showEndMessage() 
    {
        if (this.jokesCont.querySelector('.end-message')) 
        {
            return;
        }
        this.jokesCont.insertAdjacentHTML('beforeend', `
            <div class="end-message">Вы просмотрели все шутки </div>
        `);
    }
    
    clear() 
    {
        this.jokes = [];
        this.jokesCont.innerHTML = '';
    }
}