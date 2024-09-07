import { useState } from "react";



const Contenedor1 = ({ nombreCompleto, profesion }) => {
    const [preview, setPreview] = useState(null);

    // Manejador para seleccionar la imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Manejador para enviar el formulario
    // const handleSubmit = (e) => {
    //    e.preventDefault();

    //    console.log("Imagen seleccionada:", selectedImage);
    //    alert("Formulario enviado exitosamente");
    // };
    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-[#2D3748] rounded-r-lg shadow-[0_20px_40px_rgba(252,122,0,0.3)] ">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-[24px] font-semibold mb-2 text-center">MI PERFIL</h1>
                <label className="cursor-pointer">
                    {preview ? (
                        <img
                            src={preview}
                            alt="Vista previa"
                            className="rounded-full w-20 h-20 object-cover border-white border-[1px] hover:border-blue-500"
                        />
                    ) : (
                        <img
                            className="rounded-full w-20 h-20 object-cover border-white border-[1px] hover:border-blue-500"
                            src="https://cdn-icons-png.flaticon.com/512/6378/6378141.png"
                            alt="Nada"
                        />
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                        className="hidden"
                    />
                </label>
            </div>
            <h2 className="text-white text-[20px] font-semibold mb-2">{nombreCompleto || "Nombre completo"}</h2>
            <p className="text-white text-[20px] font-semibold mb-2">{profesion ||"Cargo / profesión"}</p>
            <p className="text-white text-[20px] font-semibold mb-2">Descripción</p>
        </div>
    )
}

export default Contenedor1;