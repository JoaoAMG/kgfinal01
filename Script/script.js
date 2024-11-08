const menu = document.querySelector('.hamburger');
const NavMenu = document.querySelector('.nav-menu');

menu.addEventListener('click', () => {
    
    menu.classList.toggle('ativo');
    NavMenu.classList.toggle('ativo');
    console.log('Clique no menu');
})



function changeLanguage(element) {
    var selectedValue = element.value;

    // Obtenha o nome da página atual (ex.: "index.html", "engcontact.html")
    var currentPage = window.location.pathname.split("/").pop();

    // Defina o mapeamento das páginas em português para suas equivalentes em inglês
    var pages = {
        'index.html': 'engindex.html',
        'Produtos.html': 'engproducts.html',
        'Contato.html': 'engcontact.html',
        'Sobre.html': 'engaboutus.html'
    };

    // Verifica o idioma selecionado e redireciona para a página correspondente
    if (selectedValue === 'l2') { // Caso Português
        for (const [ptPage, enPage] of Object.entries(pages)) {
            if (currentPage === enPage) {
                // Redireciona para a versão em português na pasta /html/
                window.location.href = `/html/${ptPage}`;
                return;
            }
        }
        // Se já estiver em uma página em português ou sem mapeamento, redireciona para o index em português
        window.location.href = '/index.html';
    } else if (selectedValue === 'l3') { // Caso Inglês
        if (pages[currentPage]) {
            // Redireciona para a versão em inglês na pasta /html/
            window.location.href = `/html/${pages[currentPage]}`;
        } else {
            // Se já estiver em uma página em inglês ou sem mapeamento, redireciona para o index em inglês
            window.location.href = '/html/engindex.html';
        }
    }
}




/* Logica do carrosel */
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-item');
const carouselImages = document.querySelector('.carousel-images');

let startX = 0, isDragging = false, currentTranslate = 0, previousTranslate = 0;

// Alinha o carrossel na imagem mais próxima
function setPositionByIndex() {
    currentTranslate = -currentIndex * 100;
    carouselImages.style.transform = `translateX(${currentTranslate}%)`;
}

// Configura o slide automático e para ao detectar interação do usuário
let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    setPositionByIndex();
}, 3000);

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
}

// Funções de toque e arraste
function touchStart(event) {
    stopAutoSlide(); // Interrompe o slide automático ao tocar
    startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    isDragging = true;
    carouselImages.classList.add('grabbing');
    previousTranslate = currentTranslate;

    // Impede o comportamento padrão apenas se o usuário estiver arrastando
    event.preventDefault(); // Impede o link de ser seguido durante o arrasto
}

function touchMove(event) {
    if (!isDragging) return;
    const currentX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    const deltaX = currentX - startX;
    currentTranslate = previousTranslate + deltaX;
    carouselImages.style.transform = `translateX(${currentTranslate}px)`;
}

function touchEnd(event) {
    if (!isDragging) return;
    isDragging = false;
    carouselImages.classList.remove('grabbing');

    const movedBy = currentTranslate - previousTranslate;

    // Define a direção do movimento para ajustar o índice
    if (movedBy < -50 && currentIndex < slides.length - 1) currentIndex += 1;
    if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

    setPositionByIndex();

    // Verifica se não foi arrastado e, se não, redireciona para o link
    if (Math.abs(movedBy) < 10) {
        const targetLink = event.target.closest('a');
        if (targetLink) {
            window.location.href = targetLink.href; // Redireciona para o link do alvo
        }
    }
}

// Event Listeners para toque e arraste
carouselImages.addEventListener('mousedown', touchStart);
carouselImages.addEventListener('mousemove', touchMove);
carouselImages.addEventListener('mouseup', touchEnd);
carouselImages.addEventListener('mouseleave', touchEnd);

carouselImages.addEventListener('touchstart', touchStart);
carouselImages.addEventListener('touchmove', touchMove);
carouselImages.addEventListener('touchend', touchEnd);

// enviar formulario com node e nodemailer

document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Previne o comportamento padrão de envio do formulário
  
    // Cria um objeto com os dados do formulário
    const formData = {
      firstname: document.getElementById('firstname').value,
      lastname: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      number: document.getElementById('number').value,
      local: document.getElementById('local').value,
      assunto: document.getElementById('assunto').value
    };
  
    // Faz a requisição POST para enviar os dados
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
  
    // Verifica a resposta e exibe um alerta de sucesso ou erro
    if (response.ok) {
      alert('Formulário enviado com sucesso!');
    } else {
      const errorData = await response.json();
      alert(`Erro ao enviar o formulário: ${errorData.message}`);
    }
  });
  