import * as pdfjsLib from
'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.149/build/pdf.mjs';

// Configuramos el worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdn.jsdelivr.net/npm/pdfjs-dist@5.4.149/build/pdf.worker.mjs';

// Ruta del PDF
const url = '../IMG/Carta Candie.pdf';

// Contenedor HTML
const contenedor = document.getElementById('pdf-container');

// Función para cargar el documento
async function cargarPDF() {

    try {

        // Cargamos el documento
        const pdf = await pdfjsLib.getDocument(url).promise;

        // Recorremos todas las páginas
        for (let numero = 1; numero <= pdf.numPages; numero++) {

            const viewportOriginal = pagina.getViewport({ scale: 1 });

            // Ancho máximo del documento
            const ancho = Math.min(contenedor.clientWidth, 900);

            // Escala visual
            const escala = ancho / viewportOriginal.height;

            const viewport = pagina.getViewport({ scale: escala });

            // Resolución real de pantalla
            const resolucion = window.devicePixelRatio || 1.5;

            // Creamos el canvas
            const canvas = document.createElement('canvas');
            const contexto = canvas.getContext('2d');

            // Resolución interna del canvas
            canvas.width = Math.floor(viewport.width * resolucion);
            canvas.height = Math.floor(viewport.height * resolucion);

            // Tamaño visual del canvas
            canvas.style.width = `${viewport.width}px`;
            canvas.style.height = `${viewport.height}px`;

            // Añadimos la página
            contenedor.appendChild(canvas);

            // Renderizamos
            await pagina.render({
                canvasContext: contexto,
                viewport: viewport,
                transform: [resolucion, 0, 0, resolucion, 0, 0]
            }).promise;

        }

    } catch (error) {

        console.error('Error al cargar el PDF:', error);

    }

}

// Ejecutamos la función
cargarPDF();