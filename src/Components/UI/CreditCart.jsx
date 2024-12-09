import React from 'react';

const CreditCart = ({ cardData = {}, onCardDataChange, onSubmit, onPrevious, error, setError}) => {

    console.log('onCardDataChange prop:', onCardDataChange);

    
    // Función para formatear el número de tarjeta
    const formatCardNumber = (value) => {
        const numbers = value.replace(/\D/g, ''); // Elimina caracteres no numéricos
        return numbers.replace(/(.{4})/g, '$1 ').trim(); // Inserta espacios cada 4 dígitos
    };

    // Función para formatear la fecha de expiración (MM/YY)
    const formatExpiryDate = (value) => {
        const numbers = value.replace(/\D/g, ''); // Elimina caracteres no numéricos
        if (numbers.length <= 2) {
            return numbers; // Solo devuelve los primeros dos caracteres si es menos de 2
        }
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`; // Formato MM/YY
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
    
        let formattedValue = value;
    
        if (name === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (name === 'expiryDate') {
            formattedValue = formatExpiryDate(value);
        }
    
        // Verificar si onCardDataChange es una función antes de llamarla
        if (typeof onCardDataChange === 'function') {
            onCardDataChange({ ...cardData, [name]: formattedValue });
        } else {
            console.error('onCardDataChange no es una función', onCardDataChange);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Eliminar espacios antes de enviar los datos
        const cleanedCardNumber = cardData.cardNumber.replace(/\s/g, '');

        // Validaciones de los campos
        if (!/^\d{13,19}$/.test(cleanedCardNumber)) {
            alert('Por favor ingrese un número de tarjeta válido.');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
            alert('Por favor ingrese una fecha de expiración válida (MM/YY).');
            return;
        }

        if (!/^\d{3}$/.test(cardData.cvv)) {
            alert('Por favor ingrese un CVV válido (3 dígitos).');
            return;
        }

        // Si pasa todas las validaciones, enviamos los datos al componente padre
        if (onSubmit && typeof onSubmit === 'function') {
            onSubmit(cardData); // Pasamos el objeto `cardData` ya validado y formateado
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#01283A] to-black py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h3 className="mt-6 text-center text-5xl font-extrabold text-[#F3F3F1] mb-8">Tarjeta de Crédito</h3>
                    <p className="text-center text-sm text-gray-500 mb-6">
                        Ingresa tu tarjeta de crédito para completar el registro
                    </p>

                    {error && (
                        <div className="text-red-500 text-sm text-center mb-4">
                            {error}
                        </div>
                    )}
                    
                    <div className=" bg-[#4E4E4E] p-[1px]"></div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="cardNumber" className="text-white">Número de Tarjeta</label>
                                <input
                                    type="text"
                                    id="cardNumber"
                                    name="cardNumber"
                                    value={cardData.cardNumber || ''}
                                    onChange={handleChange}
                                    required
                                    placeholder="1234 5678 9111 3456"
                                    maxLength="19"
                                    inputMode="numeric"
                                    className="appearance-none rounded-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="expiryDate" className="text-white">Fecha de Expiración</label>
                                <input
                                    type="text"
                                    id="expiryDate"
                                    name="expiryDate"
                                    value={cardData.expiryDate}
                                    onChange={handleChange}
                                    required
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    inputMode="numeric"
                                    className="appearance-none rounded-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                />
                            </div>
                            <div>
                                <label htmlFor="cvv" className="text-white">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    value={cardData.cvv}
                                    onChange={handleChange}
                                    required
                                    placeholder="123"
                                    maxLength="3"
                                    inputMode="numeric"
                                    className="appearance-none rounded-md bg-[#1A1A1A] relative block w-full px-2 py-2 border border-[#808080] placeholder-gray-500 text-white focus:outline-none focus:ring-indigo-500 focus:border-[#9BC9B4] sm:text-sm"
                                />
                            </div>
                        </div>
                        <button
                            type="button" // Changed to type="button" to prevent form submission
                            onClick={onPrevious} // Add the onPrevious prop handler
                            className="group relative w-full flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                            >
                            Anterior
                        </button>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-[#91AEAD] text-sm font-medium rounded-full text-white bg-[#1A1A1A] hover:bg-[#91AEAD] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#9BC9B4]"
                        >
                            Finalizar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreditCart;