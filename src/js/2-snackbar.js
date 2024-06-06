import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrl from '../img/icon.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);
function createPromise(e) {
    e.preventDefault();

    const delay = e.target.elements.delay.value;
    const state = e.target.elements.state.value;

    new Promise(function (resolve, reject) {
        setTimeout(() => {
            state === 'fulfilled' ? resolve(delay) : reject(delay);
        }, delay);
    })
        
    .then(function(result) {
    console.log(`✅ Fulfilled promise in ${result}ms`);
    })
        
    .catch(function(error) {
    console.log(`❌ Rejected promise in ${error}ms`);
    });
};
    
