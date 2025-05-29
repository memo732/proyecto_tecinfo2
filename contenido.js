document.addEventListener('DOMContentLoaded', () => {
    const videoGrid = document.getElementById('video-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const videoModal = document.getElementById('video-modal');
    const closeButton = document.querySelector('.video-modal .close-button');
    const modalVideoIframe = document.getElementById('modal-video-iframe');

    // --- Smooth Scrolling for CTA Button ---
    window.scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- Dynamic Navigation Scroll ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // --- Video Filtering ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;

            // Remove active class from all and add to clicked
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter videos
            const videoCards = document.querySelectorAll('.video-card');
            videoCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex'; // Show card
                } else {
                    card.style.display = 'none'; // Hide card
                }
            });
        });
    });

    // --- Load More Videos (Simulated) ---
    let videosLoaded = 4; // Initial number of videos
    const allVideos = [
        // These are the initial videos from HTML
        { title: 'Reporte del Clima: 29 de Mayo', description: 'Un análisis detallado de las temperaturas, precipitaciones y condiciones generales de hoy.', category: 'clima', thumbnail: 'https://via.placeholder.com/320x180/B0BEC5/FFFFFF?text=Clima+Hoy', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },
        { title: 'Alerta Meteorológica: Tormenta en el Pacífico', description: 'Información crucial sobre una tormenta en desarrollo y sus posibles impactos.', category: 'alertas', thumbnail: 'https://via.placeholder.com/320x180/90A4AE/FFFFFF?text=Alerta+Tormenta', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },
        { title: 'El Impacto del Calentamiento Global', description: 'Explorando las consecuencias del cambio climático en nuestra región y el mundo.', category: 'ambiente', thumbnail: 'https://via.placeholder.com/320x180/78909C/FFFFFF?text=Calentamiento', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },
        { title: 'Pronóstico Semanal: Qué Esperar', description: 'Un adelanto de las condiciones climáticas para los próximos siete días.', category: 'clima', thumbnail: 'https://via.placeholder.com/320x180/CFD8DC/FFFFFF?text=Pronóstico+Semana', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },

        // Add more simulated videos here
        { title: 'Análisis de la Calidad del Aire', description: 'Un vistazo a los índices de calidad del aire en las principales ciudades.', category: 'ambiente', thumbnail: 'https://via.placeholder.com/320x180/616161/FFFFFF?text=Aire+Limpio', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },
        { title: 'Temporada de Huracanes: Preparación', description: 'Consejos esenciales para prepararse ante la temporada de huracanes.', category: 'alertas', thumbnail: 'https://via.placeholder.com/320x180/455A64/FFFFFF?text=Huracanes', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },
        { title: 'Monitoreo de Nieve y Glaciares', description: 'Cómo el derretimiento de glaciares afecta el nivel del mar.', category: 'ambiente', thumbnail: 'https://via.placeholder.com/320x180/B2DFDB/FFFFFF?text=Glaciares', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' },
        { title: 'Entrevista con Meteorólogo Experto', description: 'Un experto nos habla sobre el futuro del clima.', category: 'clima', thumbnail: 'https://via.placeholder.com/320x180/795548/FFFFFF?text=Expertos', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ?si=bJ9Mh9eP6J1G5F1p' }
    ];

    loadMoreBtn.addEventListener('click', () => {
        const currentDisplayedVideos = document.querySelectorAll('.video-card').length;
        const videosToAdd = allVideos.slice(currentDisplayedVideos, currentDisplayedVideos + 4); // Load 4 more videos

        videosToAdd.forEach(video => {
            const videoCard = document.createElement('div');
            videoCard.classList.add('video-card');
            videoCard.dataset.category = video.category;
            videoCard.innerHTML = `
                <div class="video-thumbnail" style="background-image: url('${video.thumbnail}')"></div>
                <h3>${video.title}</h3>
                <p>${video.description}</p>
                <button class="watch-button" data-video-src="${video.src}">Ver Video</button>
            `;
            videoGrid.appendChild(videoCard);
        });

        videosLoaded += videosToAdd.length;

        // Hide "Load More" button if all videos are loaded
        if (videosLoaded >= allVideos.length) {
            loadMoreBtn.style.display = 'none';
        }

        // Re-attach event listeners to new watch buttons
        attachWatchButtonListeners();
    });

    // --- Video Modal Logic ---
    function attachWatchButtonListeners() {
        document.querySelectorAll('.watch-button, .video-thumbnail').forEach(element => {
            element.removeEventListener('click', openVideoModal); // Prevent duplicate listeners
            element.addEventListener('click', openVideoModal);
        });
    }

    function openVideoModal(event) {
        let videoSrc;
        if (event.target.classList.contains('watch-button')) {
            videoSrc = event.target.dataset.videoSrc;
        } else if (event.target.classList.contains('video-thumbnail') || event.target.parentElement.classList.contains('video-thumbnail')) {
            // If the thumbnail is clicked, find the parent video-card and then its watch-button
            const card = event.target.closest('.video-card');
            if (card) {
                videoSrc = card.querySelector('.watch-button').dataset.video-src;
            }
        }
        
        if (videoSrc) {
            modalVideoIframe.src = videoSrc;
            videoModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling background
        }
    }

    closeButton.addEventListener('click', () => {
        videoModal.classList.remove('show');
        modalVideoIframe.src = ''; // Stop video playback
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close modal if clicking outside the content
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.classList.remove('show');
            modalVideoIframe.src = '';
            document.body.style.overflow = '';
        }
    });

    // Initial attachment of listeners
    attachWatchButtonListeners();
});
