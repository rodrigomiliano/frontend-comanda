import React, { useCallback, useEffect, useRef, useState } from "react";

const UploadWidget = ({ onImageUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null); // Estado para el nombre del archivo
  const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de la imagen cargada

  const handleImageUpload = useCallback((error, result) => {
    if (!error && result && result.event === "success") {
      const uploadedImageUrl = result.info.secure_url; // Obtiene la URL de la imagen cargada en Cloudinary
      setSelectedFile(result.info.original_filename); // Almacenar el nombre del archivo cargado

      // Llama a la función onImageUpload para pasar la URL de la imagen al componente padre
      onImageUpload(uploadedImageUrl);
      setImageUrl(uploadedImageUrl); // Actualiza el estado de la URL de la imagen cargada
      console.log("Done uploading ....", result.info);
    }
  }, [onImageUpload]);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dgyxvj3xu",
        uploadPreset: "mg3gjkam",
        sources: ["local"], // Esta configuración permite cargar solo archivos locales (desde el ordenador)
        multiple: false, // Esto evita la selección múltiple de archivos
        maxFiles: 1, // Limita la cantidad de archivos seleccionables a uno
        resourceType: "image", // Restringe la carga solo a imágenes
        clientAllowedFormats: ["png", "jpg"], // Restringe la carga solo a formatos .png y .jpg
      },
      handleImageUpload // Pasamos la función de manejo de carga de imagen
    );
  }, [handleImageUpload]);

  const openUploadWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    }
  };

  return (
    <div>
      <button onClick={openUploadWidget}>Cargar imágen</button>
      <p style={{ marginLeft: "10px" }}>Formatos permitidos: .png, .jpg</p>
      <p>
        {selectedFile
          ? `Archivo seleccionado: ${selectedFile}`
          : "No se ha seleccionado archivo"}
      </p>
      {/* Mostrar la imagen si hay una URL cargada */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Imagen cargada"
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      )}
    </div>
  );
};

export default UploadWidget;
