const messageBtn = document.querySelector('.show-message');
const messageForm = document.querySelector('.message-form');

messageBtn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    messageForm.hidden = false;
    messageBtn.hidden = true;
})