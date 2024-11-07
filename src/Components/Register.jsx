import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../Components/SignUp";
import CreditCart from "../Components/UI/CreditCart";
import { registrarUsuario } from "../Apis/Prueba.js"; // Asegúrate de que la ruta sea correcta para importar la función

const Register = () => {
    const [step, setStep] = useState(1); // Paso actual del flujo
    const [userData, setUserData] = useState({
        cedula: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        password: '',
        genero: '',
    });
    
    const [cardData, setCardData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const navigate = useNavigate();

    const handleUserDataChange = (newData) => {
        setUserData(newData);
    };

    const handleCardDataChange = (newData) => {
        setCardData(newData); // El componente hijo pasará los datos ya formateados
    };

    const handleNextStep = () => {
        // Avanza al siguiente paso
        setStep(prevStep => prevStep + 1);
    };

    const handleSubmit = async () => {
        try {
            // Limpiar el número de tarjeta (si es necesario)
            const cleanedCardNumber = cardData.cardNumber.replace(/\s/g, ''); // Eliminar los espacios del número de tarjeta

            // Crear el objeto payload con los datos del formulario
            const payload = {
                Numero_Identificacion: userData.cedula,
                Nombre_Usuario: userData.nombre,
                Apellido_1: userData.apellido1,
                Apellido_2: userData.apellido2,
                Genero: userData.genero,
                Contrasenna: userData.password,
                Correo: userData.email,
                Numero_Tarjeta: cleanedCardNumber,
                Codigo_Tarjeta: cardData.cvv,
                Fecha_Vencimiento: cardData.expiryDate,
            };

            // Llamar a la función registrarUsuario para hacer la petición POST
            const data = await registrarUsuario(payload);  // Espera la respuesta de la API

            console.log('Usuario registrado con éxito:', data);
            navigate('/'); // Redirige a la página principal tras el registro
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            {step === 1 && (
                <SignUp formData={userData} onFormDataChange={handleUserDataChange} onNext={handleNextStep} />
            )}
            {step === 2 && (
                <CreditCart cardData={cardData} onCardDataChange={handleCardDataChange} onSubmit={handleSubmit} />
            )}
        </div>
    );
};

export default Register;