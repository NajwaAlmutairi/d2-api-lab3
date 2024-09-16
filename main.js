let input = document.getElementById('input');
let input2 = document.getElementById('input2');
let btn = document.getElementById('btn');
let text = document.getElementById('text');

const url = 'https://66e7e6a0b17821a9d9da6f05.mockapi.io/lab3'


function getAllImages() {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            text.innerText = '';
            data.map((element) => {
                let div = document.createElement('div')

                let imgname = document.createElement('h3')
                imgname.innerText = element.imgname
                div.appendChild(imgname)

                let img = document.createElement('img')
                img.src = element.imgurl
                div.appendChild(img)

                let imgbutton = document.createElement('button')
                imgbutton.innerText = 'Remove'
                div.appendChild(imgbutton)

                imgbutton.addEventListener('click', () => {
                    text.innerText = '';
                    fetch(url + '/' + element.id, {
                        method: 'DELETE',
                    }).then(response => {
                        if (response.ok) {
                            console.log('removing the image');
                            div.remove()
                        }
                    })

                })
                div.classList.add('col');
                container.appendChild(div);

            })
        })

}

getAllImages();


btn.addEventListener("click", () => {
    let imgName = input.value;
    let imageUrl = input2.value;
    if (imgName === '' || imageUrl === '') {
        text.textContent = 'Invalid input!';
        text.style.color = 'red';
    } else {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                imgname: imgName,
                imgurl: imageUrl,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                text.textContent = ` بنجاح ${data.imgname} تم إضافة الصورة  `;
                text.style.color = 'white';
                input.value = '';
                input2.value = '';

                let div = document.createElement('div')

                let imgname = document.createElement('h3')
                imgname.innerText = data.imgname
                div.appendChild(imgname)

                let img = document.createElement('img')
                img.src = data.imgurl
                div.appendChild(img)

                let imgbutton = document.createElement('button')
                imgbutton.innerText = 'Remove'
                div.appendChild(imgbutton)

                imgbutton.addEventListener('click', () => {
                    text.innerText = '';
                    fetch(url + '/' + data.id, {
                        method: 'DELETE',
                    }).then(response => {
                        if (response.ok) {
                            console.log('removing the image');
                            div.remove()
                        }
                    })

                })

                div.classList.add('col');
                container.appendChild(div);

            });
    }
})

