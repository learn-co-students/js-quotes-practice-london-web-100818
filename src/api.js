const quotesUrl = 'http://localhost:3000/quotes'

const getQuotes = () =>
  fetch(quotesUrl)
    .then(resp => resp.json())