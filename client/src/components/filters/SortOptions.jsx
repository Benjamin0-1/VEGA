const SortOptions = ({ setSortBy, setOrder }) => {
    return (
        <div className="w-full sticky top-0 z-10 bg-white flex justify-end pr-8 pt-8">
            <div className="sort-options">
                <label>Ordenar Por: </label>
                <select className="block appearance-none w-full bg-white border-2 border-gray-200 rounded-md mt-4 py-2 pl-3 pr-10 leading-tight focus:outline-none focus:border-green-500"
                    onChange={ (e) => {
                        const [ sortField, sortOrder ] = e.target.value.split('-');
                        setSortBy(sortField);
                        setOrder(sortOrder);
                    } }>
                    <option value="">Seleccione una opción</option>
                    <option value="name-asc">Nombre (A-Z)</option>
                    <option value="name-desc">Nombre (Z-A)</option>
                    <option value="price-asc">Precio (menor a mayor)</option>
                    <option value="price-desc">Precio (mayor a menor)</option>
                </select>
            </div>
        </div>
    );
};

export default SortOptions;