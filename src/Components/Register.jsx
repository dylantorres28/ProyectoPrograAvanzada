import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "../Components/SignUp";
import CreditCart from "../Components/UI/CreditCart";
import { registrarUsuario } from "../Apis/Prueba.js"; // Asegúrate de que la ruta sea correcta para importar la función


const Register = () => {
    const [error, setError] = useState(null);
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

    const handlePreviousStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleNextStep = () => {
        // Avanza al siguiente paso
        setStep(prevStep => prevStep + 1);
    };

    const handleSubmit = async () => {
        try {
            // Limpiar el número de tarjeta
            const cleanedCardNumber = cardData.cardNumber.replace(/\s/g, '');
    
            // Crear el objeto payload
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
    
            // Llamar a la función registrarUsuario
            const response = await registrarUsuario(payload);
    
            // Mostrar mensaje del servidor o mensaje genérico
            alert(response?.message || 'Usuario registrado con éxito');
    
            navigate('/'); // Redirige a la página principal
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error al registrar usuario';
            setError(errorMessage);
            setTimeout(() => setError(null), 5000);
        }
    };

    return (
        <div>
            {step === 1 && (
                <SignUp 
                    formData={userData} 
                    onFormDataChange={handleUserDataChange} 
                    onNext={handleNextStep} 
                />
            )}
            {step === 2 && (
                <CreditCart 
                    cardData={cardData} 
                    onCardDataChange={handleCardDataChange} 
                    onSubmit={handleSubmit}
                    onPrevious={handlePreviousStep} 
                    error={error}  // Pass error state
                    setError={setError}  // Pass error setter
                />
            )}
        </div>
    );
};

export default Register;