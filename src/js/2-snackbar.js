import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import imageUrlError from '../img/icon-error.svg';
import imageUrlSuccess from '../img/icon-success.svg';
import imageUrlAttention from '../img/icon-attention.svg';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
    event.preventDefault();

    const delay = event.target.elements.delay.value;
    const state = event.target.elements.state.value;

    if (!delay || !state) {
        iziToast.warning({
            title: 'Attention!',
            titleSize: '16',
            titleColor: 'red',
            message: 'You need to set Delay or State!',
            messageSize: '16',
            messageColor: 'red',
            backgroundColor: 'yellow',
            position: 'topRight',
            iconUrl: imageUrlAttention,
        });
        console.log('⚠️ Attention: Field delay or state is empty!');
        return;
    }

    new Promise(function (resolve, reject) {
        setTimeout(() => {
            state === 'fulfilled' ? resolve(delay) : reject(delay);
        }, delay);
    })        
    .then((result) => {
        iziToast.success({
                title: 'OK',
                titleSize: '16',
                titleColor: '#fff', 
                message: `Fulfilled promise in ${result}ms`,
                messageSize: '16',
                messageColor: '#fff',        
                backgroundColor: '#59a10d',
                position: 'topRight',
                theme: 'dark',
                close: true,
                closeOnEscape: true,
                closeOnClick: true,
                progressBar: true,
                progressBarColor: '#326101',
                iconUrl: imageUrlSuccess,
                iconColor: '#fff',
        });
        console.log(`✅ Fulfilled promise in ${result}ms`);
    })
        
    .catch((error) => {
        iziToast.error({
                title: 'Error!',
                titleSize: '16',
                titleColor: '#fff', 
                message: `Rejected promise in ${error}ms`,
                messageSize: '16',
                messageColor: '#fff',        
                backgroundColor: '#ef4040',
                position: 'topRight',
                theme: 'dark',
                close: true,
                closeOnEscape: true,
                closeOnClick: true,
                progressBar: true,
                progressBarColor: '#ffbebe',
                iconUrl: imageUrlError,
                iconColor: '#fff',
        });
        console.log(`❌ Rejected promise in ${error}ms`);
    });
};