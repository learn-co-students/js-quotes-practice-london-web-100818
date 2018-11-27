const url = 'http://localhost:3000/quotes'

const fetchQuotes = () => 
  fetch(url)
    .then(resp => resp.json())

const createQuote = quote =>
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(quote)
  })
    .then(resp => resp.json())

const updateQuote = quoteToUpdate =>
  fetch(`${url}/${quoteToUpdate.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(quoteToUpdate)
  })
    .then(resp => resp.json())

const deleteQuote = quoteToDelete =>
  fetch(`${url}/${quoteToDelete.id}`, {
    method: 'DELETE'
  })