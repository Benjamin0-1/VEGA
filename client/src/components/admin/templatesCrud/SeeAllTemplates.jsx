import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTemplates, deleteTemplate } from '../../../redux/actions/adminTemplatesAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SeeAllTemplates = () => {
  const dispatch = useDispatch();
  const templates = useSelector(state => state.adminTemplates.templatesAdmin);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllTemplates());
  }, [dispatch]);

  const handleDeleteTemplate = (id) => {
    setTemplateToDelete(id);
    openModal();
  };

  const confirmDeleteTemplate = () => {
    if (templateToDelete) {
      dispatch(deleteTemplate(templateToDelete))
        .then(() => {
          toast.success('Plantilla eliminada exitosamente');
          closeModal();
          dispatch(getAllTemplates());
        })
        .catch(error => {
          console.error('Error al eliminar plantilla:', error);
          toast.error('Error al eliminar plantilla');
        });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setTemplateToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mt-8 mb-12">Lista de Plantillas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map(template => (
          <div key={template.id} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
            <p className="text-gray-600 mb-2">{template.description}</p>
            <p className="text-gray-700">Precio: ${template.price}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded focus:outline-none"
                onClick={() => handleDeleteTemplate(template.id)}
              >
                Eliminar
              </button>
            </div>)
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
            <p className="text-lg mb-4">¿Estás seguro de eliminar esta plantilla?</p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded mr-2 focus:outline-none"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none"
                onClick={confirmDeleteTemplate}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeeAllTemplates;
