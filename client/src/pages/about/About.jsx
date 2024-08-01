import React from 'react';
import vegaImage from '../../assets/images/VEGA.svg';

function About() {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-900">
          Soluciones de diseño web a la medida de tus necesidades
        </h2>
        <div className="flex flex-col md:flex-row mb-12">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <p className="text-lg leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
              ¿Estás buscando un diseño web que cautive a tu público objetivo y se adapte perfectamente a tu servicio o producto? En VEGA, te ofrecemos la solución ideal para llevar tu presencia en línea al siguiente nivel.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Nuestros templates personalizados están diseñados para adaptarse a cualquier tipo de página web, desde portales informativos hasta tiendas en línea. Nos aseguramos de que cada elemento gráfico esté cuidadosamente seleccionado para reflejar la esencia de tu marca y atraer a tu audiencia específica.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Pero eso no es todo, también te brindamos un completo soporte técnico para garantizar que tu sitio web funcione sin problemas. Desde la configuración del hosting hasta la creación de formularios para administrar información, nuestro equipo de expertos está aquí para guiarte en cada parte del proceso.
            </p>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <img src={vegaImage} alt="Web Design" className="rounded-lg shadow-lg mb-6 md:mb-0"/>
          </div>
        </div>
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-center mb-6 text-gray-900">¿Por qué elegirnos?</h3>
          <ul className="list-disc pl-6 text-lg leading-relaxed space-y-3">
            <li>Templates personalizados que se adaptan a tus necesidades</li>
            <li>Diseños gráficos atractivos y profesionales</li>
            <li>Soporte técnico integral para una experiencia sin problemas</li>
            <li>Soluciones a medida para tu servicio o producto</li>
          </ul>
        </div>
        <div className="text-center">
          <p className="text-lg leading-relaxed mb-6">
            No dejes que un diseño web deficiente se interponga entre tu marca y el éxito. En VEGA estamos para dar una presencia en línea a nuevos niveles. Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus objetivos en línea.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
