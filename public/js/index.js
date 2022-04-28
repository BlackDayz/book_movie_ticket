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

                while (newImage === 'img/'+currentImage) {
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
        } 
        
        else {
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



    function get_tickets_next({time}) {
        document.getElementById('home_tickets_choose_time').classList.add('display-none');
        document.getElementById('home_tickets_user_input').classList.remove('display-none');

        document.getElementById('sendUserInput').addEventListener('submit', (e) => {
            e.preventDefault();
           
            let data = []
            if(e.isTrusted) {
                console.log(e)
                for(let i in e.target) {
                    console.log(target[i]);
                }
            }
        });
    }

});