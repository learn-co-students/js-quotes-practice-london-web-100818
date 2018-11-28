const quoteList=document.querySelector("#quote-list")
const newQuote=document.querySelector("#new-quote")
const author=document.querySelector("#author")
const form=document.querySelector("#new-quote-form")

check=document.querySelector('#checkbox')

const getQuotes= ()=>{
    fetch('http://localhost:3000/quotes')
    .then(res=> res.json())
    .then(json=>addQuotes(json))

}

const deleteQuotes= ()=>{
  quote_cards=document.querySelectorAll('.quote-card')
  for(el of quote_cards){
    el.remove()
  }
}

const sortFunction = function(a, b) {
  var nameA = a.author.toUpperCase();
  var nameB = b.author.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
document.addEventListener('DOMContentLoaded',getQuotes)

function addQuote(quote) {
  const li= document.createElement('li')
  li.className="quote-card"

  const blockquote = document.createElement('blockquote')
  blockquote.className="blockquote"

  const p= document.createElement('p')
  p.className="mb-0"
  p.innerText=quote.quote
  blockquote.appendChild(p)
  footer=document.createElement('footer')
  footer.className="blockquote-footer"
  footer.innerText=quote.author
  blockquote.appendChild(footer)
  br=document.createElement('br')
  blockquote.appendChild(br)
  const button1 = document.createElement('button')
  button1.className="btn-success"
  // button1.innerHTML=`Likes: <span>${quote.likes}</span>`
  button1.innerText=`Likes:`
  const span=document.createElement('span')
  span.innerText=quote.likes
  button1.appendChild(span)
  button1.addEventListener('click',(event)=>{
    quote.likes+=1
    updateLikes(quote)
    span.innerText=quote.likes
  })
  // button1.addEventListener('click',(e)=>{
  //   button1.innerHTML=`Likes: <span>${quote.likes+=1}</span>`
  // })
  blockquote.appendChild(button1)
  button2=document.createElement('button')
  button2.innerHTML="Delete"
  // button2.addEventListener('click',deleteQuote(li,quote))
  button2.addEventListener('click',()=>{
    li.remove()
    fetch(`http://localhost:3000/quotes/${quote.id}`,{
      method: 'delete'
    })
  }

  )

  blockquote.appendChild(button2)
  li.appendChild(blockquote)
  quoteList.appendChild(li)
}

function addQuotes(quotes){
  for(quote in quotes) {
    addQuote(quotes[quote])
  }
}
// function deleteQuote(li,quote){
//
//   li.remove()
//   fetch(`http://localhost:3000/quotes/${quote.id}`,{
//     method: 'delete'
//   })}

function updateLikes(quote) {
    fetch(`http://localhost:3000/quotes/${quote.id}`,{
      method: "PATCH",
      headers: {
        "content-type": "application/json",
              },
      body: JSON.stringify(quote)

    })
    .then(x=>console.log(x))
}





form.addEventListener('submit',createQuote)

function createQuote(){
  event.preventDefault()
  quote={
    quote: newQuote.value,
    author: author.value,
    likes: 0
    }
    fetch(`http://localhost:3000/quotes`,{
      method: 'POST',
      headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body: JSON.stringify(quote)

  }).then(res => res.json())
  .then(json => addQuote(json))
  form.reset()}


check.addEventListener('change', function(){
if(check.checked){
  deleteQuotes()

  fetch('http://localhost:3000/quotes')
  .then(res=> res.json())
  .then(json=>json.sort(sortFunction))
  .then(x =>addQuotes(x))

  } else {
    deleteQuotes()
    getQuotes()
  }
})
