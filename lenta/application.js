class App {
    constructor(api, renderer) 
    {
        this.api = api;
        this.renderer = renderer
        this.currentQuery = ''
        this.currentPage = 1
        this.isLoading = false
        this.hasMore = true
        this.searchInput = document.querySelector('#seek')
        this.loadMoreBtn = document.querySelector('#thicken-more')
        this.sentinel = document.querySelector('#sentinel');
    }

    async run()
    {
        this.setupObs();
        let timer
        this.searchInput?.addEventListener('input', (e) => {
            clearTimeout(timer);
            timer = setTimeout(() => this.searchJokes(e.target.value.trim()), 300);
        });
        this.loadMoreBtn?.addEventListener('click', () => this.loadMore())
        await this.loadRandomJokes()
    }

    setupObs() {
    if (!this.sentinel) return;
    new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.isLoading && this.hasMore) {
            this.loadMore();
        }
    }).observe(this.sentinel);
}

    async loadRandomJokes() 
    {
        if (this.isLoading) return
        this.isLoading = true
        this.renderer.showLoading()

        try 
        {
            const jokes = await this.api.getJokeRand(5)
            this.currentQuery = ''
            this.hasMore = true
            this.renderer.setJokes(jokes)
        } 
        catch (error) 
        {
            this.renderer.showError(error.message, () => this.loadRandomJokes())
        }
         finally
        {
            this.isLoading = false
        }
    }

    async searchJokes(query) 
    {
        if (this.isLoading) return;
        if (!query) return this.loadRandomJokes()
        this.isLoading = true
        this.currentQuery = query
        this.currentPage = 1
        this.hasMore = true
        this.renderer.showLoading()

        try 
        {
            const result = await this.api.searchJokes(query, 1, 5)
            this.hasMore = result.hasMore
            this.renderer.setJokes(result.jokes)
            if (result.jokes.length === 0) this.renderer.showEmpty()
        }
        catch (error) 
        {
            this.renderer.showError(error.message, () => this.searchJokes(query))
        } 
        finally
        {
            this.isLoading = false
        }
    }

    async loadMore()
     {
        if (this.isLoading || !this.hasMore) return

        this.isLoading = true
        this.currentPage++

        try 
        {
            const result = this.currentQuery 
                ? await this.api.searchJokes(this.currentQuery, this.currentPage, 5)
                : { jokes: await this.api.getJokeRand(5), hasMore: true }

            this.hasMore = result.hasMore
            this.renderer.addJokes(result.jokes)
            if (!this.hasMore) this.renderer.showEndMessage()
        }
        catch (error)
        {
            this.currentPage--
            this.renderer.showError(error.message, () => this.loadMore())
        }
        finally 
        {
            this.isLoading = false
        }
    }
}