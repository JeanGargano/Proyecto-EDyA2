import React from "react";
import { useForm } from "react-hook-form";
import { addUserInfo } from "./service/UserInfService.js"; 
import { useNavigate } from "react-router-dom";

const Form = ({ onActualizarNombre, onActualizarProfesion, userInfo }) => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {
            fullname: userInfo?.fullname || "",
            email: userInfo?.email || "",
            phone: userInfo?.phone || "",
            location: userInfo?.location || "",
            profession: userInfo?.profession || ""
        }
    });
    const navigate = useNavigate();

    // Establecer valores iniciales para los campos
    React.useEffect(() => {
        setValue("fullname", userInfo?.fullname || "");
        setValue("email", userInfo?.email || "");
        setValue("phone", userInfo?.phone || "");
        setValue("location", userInfo?.location || "");
        setValue("profession", userInfo?.profession || "");
    }, [userInfo, setValue]);

    // Función que se ejecuta cuando se envía el formulario
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('fullname', data.fullname);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('location', data.location);
        formData.append('profession', data.profession);
        formData.append('profileImage', data.profileImage[0]);

        onActualizarNombre(data.fullname);
        onActualizarProfesion(data.profession);

        try {
            await addUserInfo(formData); // Enviar el FormData al backend
            navigate('/home');
        } catch (error) {
            console.error('Error al enviar la información:', error);
        }
    };

    return (
        <div className="flex-1 bg-[#182637] shadow-[0_20px_40px_rgba(255,255,255,0.3)] p-6 rounded-lg">
            <h2 className="text-white text-2xl font-bold mb-4">Actualiza tu Información</h2>
            <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                {/* Campo para Nombre Completo */}
                <div className="col-span-2">
                    <label className="text-white">Nombre Completo</label>
                    <input 
                        type="text" 
                        className="w-full p-2 mt-1 rounded-lg" 
                        {...register("fullname", { required: true })}
                    />
                    {errors.fullname && <span className="text-red-500">El nombre completo es requerido</span>}
                </div>

                {/* Campo para Correo Electrónico */}
                <div className="col-span-2">
                    <label className="text-white">Correo Electrónico</label>
                    <input 
                        type="email" 
                        className="w-full p-2 mt-1 rounded-lg"
                        {...register("email", { required: true })}
                    />
                    {errors.email && <span className="text-red-500">El correo electrónico es requerido</span>}
                </div>

                {/* Campo para Número de Teléfono */}
                <div className="col-span-2">
                    <label className="text-white">Número de Teléfono</label>
                    <input 
                        type="text" 
                        className="w-full p-2 mt-1 rounded-lg"
                        {...register("phone", { required: true })}
                    />
                    {errors.phone && <span className="text-red-500">El número de teléfono es requerido</span>}
                </div>

                {/* Campo para Ubicación */}
                <div className="col-span-2">
                    <label className="text-white">Ubicación</label>
                    <input 
                        type="text" 
                        className="w-full p-2 mt-1 rounded-lg"
                        {...register("location", { required: true })}
                    />
                    {errors.location && <span className="text-red-500">La ubicación es requerida</span>}
                </div>

                {/* Campo para Profesión */}
                <div className="col-span-2">
                    <label className="text-white">Profesión</label>
                    <input 
                        type="text" 
                        className="w-full p-2 mt-1 rounded-lg"
                        {...register("profession", { required: true })}
                    />
                    {errors.profession && <span className="text-red-500">La profesión es requerida</span>}
                </div>

                {/* Campo para subir Foto de Perfil */}
                <div className="col-span-2">
                    <label className="text-white">Subir Foto de Perfil</label>
                    <input 
                        type="file" 
                        className="w-full p-2 mt-1 rounded-lg"
                        {...register("profileImage", { required: true })}
                    />
                    {errors.profileImage && <span className="text-red-500">La foto de perfil es requerida</span>}
                </div>

                {/* Botón para actualizar información */}
                <div className="col-span-2">
                    <input 
                        type="submit" 
                        value='Actualizar Información' 
                        className="bg-[#ff914d] text-white font-bold py-2 px-4 rounded cursor-pointer w-full"
                    />
                </div>
            </form>
        </div>
    );
}

export default Form;
