class InformationApi {
  constructor()
  {
    this.link = 'https://api.chucknorris.io/jokes'
  }
  getQuote = async () => {
    try
    {
     const r = await fetch(`${this.link}/random`)
      if (!r.ok) 
      {
       throw new Error(`Ошибка: ${r.status}`);
      }
     const body = await r.json()
     return body
    }
     catch(error)
    {
     throw new Error(`Не удалось загрузить шутку: ${error.message}`)
    }
  }
 async getJokeRand(count)
 {
  if (count <= 0) return []
  const joke = await this.getQuote()
  const rest = await this.getJokeRand(count - 1)
  return [joke, ...rest]
 }
 async searchJokes(query, page = 1 , limit = 5)
 {
  try
  {
   const url = `${this.link}/search?query=${encodeURIComponent(query)}`
   const r = await fetch(url)
   if(!r.ok)
   {
    throw new Error(`Ошибка: ${r.status}`);
   }
   const result = await r.json()
   const startInd = (page - 1) * limit
   const endInd = startInd + limit 
   const pageJokes = result.result.slice(startInd, endInd)
   const hasMore = endInd < result.result.length; 
 return {
            jokes: pageJokes,
            hasMore: hasMore,  
            total: result.result.length
  }
}
  catch(error)
  {
    console.error('Ошибка поиска:', error);
        throw new Error(`Не удалось найти шутки: ${error.message}`);
  }
 }
}