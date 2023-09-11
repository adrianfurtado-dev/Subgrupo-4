// Se obtiene el producto seleccionado en el localStorage
const productID = localStorage.getItem('productoSeleccionado');
const container = document.querySelector('#product-container')

const showProduct = data => {

    const imgs = data.images.map(element => `<img src="${element}" width="250">`).join('');

    container.innerHTML += `
    <h2 class="my-3">${data.name}</h2>
    <hr/>
    <div class="d-flex flex-column gap-3">
        <div>
            <strong>Precio</strong><br/>
            <span>${data.currency} ${data.cost}</span>
        </div>
        <div>
            <strong>Descripción</strong><br/>
            <span>${data.description}</span>
        </div>
        <div>
            <strong>Categoría</strong><br/>
            <span>${data.category}</span>
        </div>
        <div>
            <strong>Cantidad de vendidos</strong><br/>
            <span>${data.soldCount}</span>
        </div>
        <div>
            <strong>Imágenes ilustrativas</strong><br/>
            <div class="d-flex gap-2">
                ${imgs}
            </div>
        </div>
    </div>
    `;
}

const requestToAPI = URL => {
    fetch(URL)
    .then(response => response.json())
    .then(data => showProduct(data))
    .catch(error => console.error('Error to display product: ', error))
}

const domLoaded = (productID) => {
    const API_URL = `https://japceibal.github.io/emercado-api/products/${productID}.json`;
    requestToAPI(API_URL);
};
//Obtener comentarios y URL de los comentarios, los comentarios se muestran en el div comments-container
const commentsContainer = document.querySelector('#comments-container')
const commentsURL = `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`;
fetch(commentsURL)
.then((response) => response.json())
.then((commentsData) =>{
    commentsContainer.innerHTML = '';
    if(commentsData && commentsData.length > 0){
        commentsData.forEach((comment) =>{
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment')
          const scoreHTML = `<div>Puntuación:</div>`;
          commentElement.innerHTML = `
          <div class="list-group-item list-group-item-action cursor-active">
            <h4><strong>${comment.user}</strong></h4> 
            <p>${scoreHTML}</p>
            <p>${comment.description}</p>
            <p>Fecha y hora: ${comment.dateTime}</p>
            </div>
          `;
          commentsContainer.appendChild(commentElement);
        })
    } else{
        commentsContainer.innerHTML = '<p>No hay comentarios disponibles.</p>';
    }
})
.catch((error) =>{
    console.error('Error:', error)
    commentsContainer.innerHTML = '<p>Error al cargar los comentarios.</p>';
})

document.addEventListener('DOMContentLoaded', domLoaded(productID));

const formComen = document.getElementsByClassName('comentario');

function newComment(event) {
    event.preventDefault();

    const comentarioNuevo = event.target.querySelector('.nuevo-comentario');


    if (comentarioNuevo) {
        const fechaYHora = new Date().toLocaleString('en-CA', {
            hour12: false,
        });


        const nuevoComentario = document.createElement('div');
        nuevoComentario.classList.add('list-group-item', 'list-group-item-action', 'cursor-active');
        nuevoComentario.innerHTML = `
            <h4><strong>${user.textContent}</strong></h4>
            <p>Puntuación: </p>
            <p>${comentarioNuevo.value}</p>
            <p>Fecha y hora: ${fechaYHora.replace(/\//g, '-').replace(',', '')}</p>
        `;
        commentsContainer.appendChild(nuevoComentario);

        comentarioNuevo.value = '';
    }
}

for (let i = 0; i < formComen.length; i++) {
    formComen[i].addEventListener('submit', newComment);
}