export function errormessage({status, message}) {
    
    let isError = false;

    const err_div = document.querySelector('.errormessage');
    const err_span = document.getElementById('err_msg');

    if(err_div.style.marginTop === '0px') {
        hideErrorMessage();
        setTimeout(() => {
            return addErrorMessage();
        }, 500);
    }else {
        return addErrorMessage();
    }

    function addErrorMessage() {
        console.log(status);
        if(status === 200 || status === 201 || status === 204) {
            err_div.classList.add('green')
        }else {
            isError = true;
            err_div.classList.add('red')
        }

        err_span.innerHTML = message;

        showErrorMessage();

        setTimeout(() => {
            return hideErrorMessage()
        }, 10000);

    }

    function showErrorMessage() {
        err_div.style.marginTop = '0';
    }
    function hideErrorMessage() {
        err_div.style.marginTop = '';
        setTimeout(() => {
            (isError) ? err_div.classList.remove('red') : err_div.classList.remove('green');
        }, 500);
    }

}