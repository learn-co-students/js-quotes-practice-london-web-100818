// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const quoteList = document.querySelector('#quote-list')
const newQuoteForm = document.querySelector('.btn-primary')
const newQuoteInput = document.querySelector('#new-quote')
const newQuoteAuthorInput = document.querySelector('#author')

const fetchQuotes = () =>
  fetch('http://localhost:3000/quotes')
    .then(resp => resp.json())
    .then(renderQuotes)


const renderQuote = (quote) => {
  let quoteLi = document.createElement('li')
      quoteLi.className = 'quote-card'
      quoteLi.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button id="likes${quote.id}"class='btn-success'>Likes: <span>${quote.likes}</span></button>
        <button id="quote${quote.id}" class='btn-danger'>Delete</button>
      </blockquote>
      `
      quoteList.appendChild(quoteLi)

      const deleteQ = document.querySelector(`#quote${quote.id}`)
      const likeQuote = document.querySelector(`#likes${quote.id}`)


      likeQuote.addEventListener('click', () =>{
        console.log(quote.likes)
        quote.likes ++;
        updateQuote(quote)
        likeQuote.innerText = `Likes ${quote.likes}`
      })


      deleteQ.addEventListener('click', () => {
        console.log('sada')
        deleteQuote(quote)
        quoteLi.remove()
      })

}

const renderQuotes = (quotes) => {
  quotes.forEach(quote => renderQuote(quote))
}

newQuoteForm.addEventListener('click', (event) => {
  event.preventDefault()

  const newQuote = {
    quote: newQuoteInput.value,
    likes: 0,
    author: newQuoteAuthorInput.value
  }
  addQuoteToServer(newQuote)
})


const addQuoteToServer = (newQuote) => {
  fetch('http://localhost:3000/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuote)
  }).then(resp => resp.json())
    .then(renderQuote)
}


const deleteQuote = (quote) => {
  fetch(`http://localhost:3000/quotes/${quote.id}`, {
    method: 'DELETE'
  }).then(resp => resp.json())
}

const updateQuote = (quote) => {
  fetch(`http://localhost:3000/quotes/${quote.id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(quote)
  }).then(resp => resp.json())
}

// fetch(`${toyURL}/${toy.id}`, {
//     method: 'PATCH',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(toy)
//   }).then(resp => resp.json())

fetchQuotes()


// * Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. (Whether you choose to optimistically render or not is up to you).
// * Clicking the delete button should delete the respective quote from the database and remove it from the page without having to refresh.
// * Clicking the like button will increase the number of likes for this particular comment in the database and on the page without having to refresh.
