const input = document.querySelector('#input');
const searchBtn = document.querySelector('#search');
const apiKey = '710ab338-73c2-4575-b47f-a8ed94daa35e';
const notFound = document.querySelector('.not_found');
const def = document.querySelector('.def');
const loading = document.querySelector('.loading');


searchBtn.addEventListener('click', function(e){
    e.preventDefault();

    // clearing data after searched
    notFound.innerText = '';
    def.innerText = '';

    // Getting the value of input data
    const word = input.value;
    
    // Checking if the input data is empty or not
    if (word === ''){
        alert('Word is required')
        return;
    }

    getData(word);
});

async function getData(word){

    loading.style.display = 'block';

    // Ajax call

    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    

    // if the result is empty
    if (!data.length){
        loading.style.display = 'none';
        notFound.innerHTML = 'No result found'
        return;
    }


    // checking if result is suggestions or not
    if (typeof data[0] === 'string'){
        loading.style.display = 'none';
        const heading = document.createElement('h3');
        heading.innerText = 'Did you mean?';
        notFound.appendChild(heading);

        data.forEach(element => {
            const suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });
        return;
    }

    // result found
    loading.style.display = 'none';

    const defination = data[0].shortdef[0];
    def.innerText = defination;
}