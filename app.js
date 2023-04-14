//code

const inputFieldEl=document.getElementById('input-field')
const addButtonEl=document.getElementById('add-button')

addButtonEl.addEventListener('click',(e)=>{
    e.preventDefault()
    let inputValue=inputFieldEl.value
    
    console.log(inputValue)
})