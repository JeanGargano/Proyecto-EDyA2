import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

// Diseño del tema para el ChatBot
const DiseñoChat = {
    background: '#f5f8fb',
    fontFamily: 'Arial, sans-serif',
    headerBgColor: '#182637',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#182637',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};

export default class MainChatBot extends Component {
    render() {
        return (
            <div>
                <ThemeProvider theme={DiseñoChat}>
                    <ChatBot
                        steps={[
                            // Paso de introducción
                            { id: "intro", message: "¡Hola! Soy tu asistente técnico. ¿En qué puedo ayudarte hoy?", trigger: "tipoProblema" },

                            // Selección del tipo de problema
                            {
                                id: "tipoProblema", options: [
                                    { value: "registro", label: "Problemas de registro", trigger: "problemasRegistro" },
                                    { value: "navegacion", label: "Problemas de navegación", trigger: "problemasNavegacion" },
                                    { value: "errores", label: "Errores en la página", trigger: "problemasErrores" },
                                    { value: "otros", label: "Otros problemas", trigger: "problemasOtros" }
                                ]
                            },

                            // Problemas de registro
                            { id: "problemasRegistro", message: "¿Qué tipo de problema de registro estás experimentando?", trigger: "tipoRegistro" },
                            {
                                id: "tipoRegistro", options: [
                                    { value: "no_puedo_registrarme", label: "No puedo registrarme", trigger: "noPuedoRegistrarme" },
                                    { value: "olvidar_contrasena", label: "Olvidé mi contraseña", trigger: "olvidarContrasena" },
                                ]
                            },
                            { id: "noPuedoRegistrarme", message: "Asegúrate de que todos los campos están llenos correctamente y que tu email no está ya registrado. Si el problema persiste, intenta reiniciar la página.", trigger: "preguntaVuelta" },
                            { id: "olvidarContrasena", message: "Por favor, utiliza la opción 'Olvidé mi contraseña' en la página de inicio de sesión para restablecerla.", trigger: "preguntaVuelta" },

                            // Problemas de navegación
                            { id: "problemasNavegacion", message: "¿Cuál es el problema específico de navegación?", trigger: "tipoNavegacion" },
                            {
                                id: "tipoNavegacion", options: [
                                    { value: "pagina_no_carga", label: "La página no carga", trigger: "paginaNoCarga" },
                                    { value: "enlace_roto", label: "Enlace roto", trigger: "enlaceRoto" },
                                ]
                            },
                            { id: "paginaNoCarga", message: "Intenta actualizar la página o verifica tu conexión a internet. Si el problema persiste, contáctanos.", trigger: "preguntaVuelta" },
                            { id: "enlaceRoto", message: "Gracias por informarnos. Por favor, envía el enlace roto para que podamos investigarlo.", trigger: "preguntaVuelta" },

                            // Problemas con errores
                            { id: "problemasErrores", message: "¿Qué tipo de error estás experimentando?", trigger: "tipoErrores" },
                            {
                                id: "tipoErrores", options: [
                                    { value: "error_404", label: "Error 404", trigger: "error404" },
                                    { value: "error_500", label: "Error 500", trigger: "error500" },
                                ]
                            },
                            { id: "error404", message: "El error 404 indica que la página no se encontró. Verifica el enlace o intenta regresar a la página anterior.", trigger: "preguntaVuelta" },
                            { id: "error500", message: "El error 500 indica un problema del servidor. Intenta nuevamente más tarde.", trigger: "preguntaVuelta" },

                            // Otros problemas
                            { id: "problemasOtros", message: "Por favor, describe tu problema con más detalle.", trigger: "descripcionOtros" },
                            { id: "descripcionOtros", user: true, trigger: "respuestaOtros" },
                            { id: "respuestaOtros", message: "Gracias por tu descripción. Estamos trabajando para resolver cualquier problema técnico. Contáctanos para más ayuda.", trigger: "preguntaVuelta" },

                            // Pregunta si necesita más ayuda
                            { id: "preguntaVuelta", message: "¿Necesitas algo más?", trigger: "masAyuda" },

                            // Opciones de continuar o finalizar
                            {
                                id: "masAyuda",
                                options: [
                                    { value: "si", label: "Sí, necesito más ayuda", trigger: "tipoProblema" },
                                    { value: "no", label: "No, gracias", trigger: "finChat" }
                                ]
                            },

                            // Final del chat
                            { id: "finChat", message: "Gracias por usar nuestro asistente. ¡Ten un gran día!", end: true }
                        ]}
                    />
                </ThemeProvider>
            </div>
        );
    }
}