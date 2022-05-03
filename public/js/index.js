import { errormessage } from './errormessage.js';

window.addEventListener('load', function () {

    this.document.getElementById('personnumber_input').defaultValue = '1'


    const textSlide = document.getElementById('text_slide');
    const mediaSlide = document.getElementById('media_slide');
    const media = document.getElementById('media');

    var textIsLeft = true;


    const images = [
        "img/wolf_header.jpg",
        "img/wolf_header_2.jpg"
    ]

    function generateRandomIndex() {
        return images[Math.floor(Math.random() * images.length)];
    }

    setInterval(() => {
        if (textIsLeft) {
            textSlide.classList.add('home_header_left_animation_first')
            mediaSlide.classList.add('home_header_right_animation_first');
            setTimeout(() => {
                let newImage = generateRandomIndex();
                let currentImage = (media.getAttribute('src').split("/")[media.getAttribute('src').split("/").length - 1]);

                console.log(currentImage);

                while (newImage === 'img/' + currentImage) {
                    newImage = generateRandomIndex();
                }

                media.src = newImage;
            }, 1000);
            setTimeout(() => {
                textSlide.style.transform = 'translateX(100%)';
                mediaSlide.style.transform = 'translateX(-100%)';

                textSlide.classList.remove('home_header_left_animation_first')
                mediaSlide.classList.remove('home_header_right_animation_first');
            }, 2001);
            textIsLeft = false;
        } else {
            textSlide.classList.add('home_header_left_animation_last')
            mediaSlide.classList.add('home_header_right_animation_last');
            setTimeout(() => {
                textSlide.classList.remove('home_header_left_animation_last')
                mediaSlide.classList.remove('home_header_right_animation_last');
                textSlide.style.transform = 'translateX(0)';
                mediaSlide.style.transform = 'translateX(0)';
            }, 2000);
            textIsLeft = true;
        }
    }, 10000);



    const timeinput_1 = document.getElementById('timeinput_1');
    const timeinput_2 = document.getElementById('timeinput_2');
    const back_to_timechoose = document.getElementById('back_to_timechoose');


    timeinput_1.addEventListener('click', (e) => {
        get_tickets_next({
            time: timeinput_1.dataset.ticket_time
        });
    })

    timeinput_2.addEventListener('click', (e) => {
        get_tickets_next({
            time: timeinput_2.dataset.ticket_time
        });
    });

    back_to_timechoose.addEventListener('click', (e) => {
        document.getElementById('home_tickets_choose_time').classList.remove('display-none');
        document.getElementById('home_tickets_user_input').classList.add('display-none');
    });



    function get_tickets_next({
        time
    }) {
        document.getElementById('home_tickets_choose_time').classList.add('display-none');
        document.getElementById('home_tickets_user_input').classList.remove('display-none');

        document.getElementById('sendUserInput').addEventListener('submit', (e) => {
            e.preventDefault();

            if (e.isTrusted) {
                const firstname = document.getElementById('firstname').value;
                const lastname = document.getElementById('lastname').value;
                const email = document.getElementById('email').value;
                const personnumber = document.getElementById('personnumber_input').value;

                const data = {
                    firstName: firstname,
                    lastName: lastname,
                    email: email,
                    personNumber: personnumber,
                    time: time
                }
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                    body: JSON.stringify(data)
                }

                function loader(remove) {
                    if(!remove) {
                        document.getElementById('loading').classList.remove('display-none');
                        document.getElementById('loading_remove').classList.add('display-none');
                    } else {
                        document.getElementById('loading').classList.add('display-none');
                    }


                        const loading_quotes = [
                            "Es lädt... immernoch... mal schauen.. ja, immernoch",
                            "Während dessen Du hier so wartest kannst du ja mal bei unserem Youtube Kanal vorbeischauen.",
                            "Der Server braucht anscheinend noch eine Mittagspause.",
                            "Sollte Du keine E-Mail nach maximal 1h bekommen haben, melde dich bei info@gruenes-feuer.de und gebe die gleichen Daten an, die Du gerade eingeben hast."
                        ];

                        const loading_quote_div = document.getElementById('loading_quote');
                        console.log(loading_quotes[loading_quotes.length - 1])
                        loading_quote_div.innerHTML = loading_quotes[loading_quotes.length - 1];
                        const quote_interval = setInterval(() => {
                            loading_quote_div.classList.add('loading_quote_fade_out');
                            setTimeout(() => {
                                loading_quote_div.style.opacity = '0';
                                loading_quote_div.classList.remove('loading_quote_fade_out');
                                loading_quote_div.innerHTML = loading_quotes[Math.floor(Math.random() * loading_quotes.length)];    
                                loading_quote_div.classList.add('loading_quote_fade_in');
                                setTimeout(() => {
                                    loading_quote_div.style.opacity = '1';
                                    loading_quote_div.classList.remove('loading_quote_fade_in');
                                }, 500);
                            }, 500);
                            
                        }, 15000);

                        if(remove) {
                            clearInterval(quote_interval);
                        }
                    
                }


                fetch('http://192.168.1.210:8080/reserveticket', options)
                    .then(async (res) => {
                        const response = {
                            status: res.status,
                            message: await res.json()
                        }

                        return errormessage({
                            status: response.status,
                            message: response.message
                        })
                    })
                    .catch((err) => {
                        const response = {
                            status: err.status,
                            message: err.message
                        }

                        console.error(err);

                        return errormessage({
                            status: response.status,
                            message: response.message
                        });
                    });
            }
        });
    }

});