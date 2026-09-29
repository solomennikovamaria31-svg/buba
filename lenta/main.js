const api = new InformationApi()
const renderer = new ShowJoke()
const app = new App(api, renderer)
app.run();